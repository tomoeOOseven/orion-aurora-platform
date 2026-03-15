/**
 * noaaPoller.js
 * Continuously polls NOAA SWPC endpoints and maintains an in-memory cache.
 * Handles DSCOVR → ACE failover, schema validation, and data-gap flagging.
 */
const axios = require('axios');

const BASE = 'https://services.swpc.noaa.gov';

const ENDPOINTS = {
  solar_wind_mag:    `${BASE}/products/solar-wind/mag-1-day.json`,
  solar_wind_plasma: `${BASE}/products/solar-wind/plasma-1-day.json`,
  ovation:           `${BASE}/json/ovation_aurora_latest.json`,
  kp:                `${BASE}/products/noaa-planetary-k-index.json`,
  kp_forecast:       `${BASE}/products/noaa-planetary-k-index-forecast.json`,
  alerts:            `${BASE}/products/alerts.json`,
};

// ACE fallback endpoints (legacy — NOAA may deprecate)
const ACE_ENDPOINTS = {
  solar_wind_mag:    `${BASE}/products/solar-wind/mag-7-day.json`,
  solar_wind_plasma: `${BASE}/products/solar-wind/plasma-7-day.json`,
};

// In-memory data store
const cache = {
  solar_wind: null,
  ovation: null,
  kp: null,
  kp_forecast: null,
  alerts: [],
  lastUpdated: {},
  dataGaps: {},
  source: 'DSCOVR', // or 'ACE'
};

const MAX_STALENESS_MS = {
  solar_wind: 5 * 60 * 1000,   // 5 min
  ovation:    40 * 60 * 1000,  // 40 min
  kp:         4 * 60 * 60 * 1000, // 4 hrs
};

/**
 * Parse solar-wind mag JSON from NOAA.
 * New schema (post-March 31 2026): array of arrays
 * [time_tag, bx, by, bz, lon, lat, bt, source]
 */
function parseMag(rawArray) {
  if (!Array.isArray(rawArray) || rawArray.length < 2) return null;
  // Skip header row (index 0)
  const rows = rawArray.slice(1).filter(r => Array.isArray(r));
  const latest = rows[rows.length - 1];
  if (!latest) return null;

  // Support both old (object) and new (array) schema
  if (typeof latest === 'object' && !Array.isArray(latest)) {
    return { bz: parseFloat(latest.bz_gsm), bt: parseFloat(latest.bt), ts: latest.time_tag, source: latest.source || 'DSCOVR' };
  }
  return {
    ts: latest[0],
    bx: parseFloat(latest[1]),
    by: parseFloat(latest[2]),
    bz: parseFloat(latest[3]),
    bt: parseFloat(latest[6]),
    source: latest[7] || 'DSCOVR',
  };
}

/**
 * Parse plasma JSON (solar wind speed, density, temp)
 * [time_tag, density, speed, temperature, source]
 */
function parsePlasma(rawArray) {
  if (!Array.isArray(rawArray) || rawArray.length < 2) return null;
  const rows = rawArray.slice(1).filter(r => Array.isArray(r));
  const latest = rows[rows.length - 1];
  if (!latest) return null;

  if (typeof latest === 'object' && !Array.isArray(latest)) {
    return { speed: parseFloat(latest.speed), density: parseFloat(latest.density), temp: parseFloat(latest.temperature), ts: latest.time_tag };
  }
  return {
    ts: latest[0],
    density: parseFloat(latest[1]),
    speed: parseFloat(latest[2]),
    temp: parseFloat(latest[3]),
  };
}

/**
 * Parse OVATION aurora probability grid.
 * Returns array of { lon, lat, aurora } objects (aurora in 0-100%).
 */
function parseOvation(raw) {
  if (!raw || !raw.coordinates) return null;
  const coords = raw.coordinates;
  return {
    forecastTime: raw['Forecast Time'] || raw.forecastTime || null,
    observations: raw['Observation Time'] || null,
    points: coords.map(([lon, lat, aurora]) => ({ lon, lat, aurora })),
  };
}

/**
 * Parse Kp index array
 * [time_tag, kp, a_running, station_count]
 */
function parseKp(rawArray) {
  if (!Array.isArray(rawArray) || rawArray.length < 2) return null;
  const rows = rawArray.slice(1).filter(r => Array.isArray(r));
  const latest = rows[rows.length - 1];
  if (!latest) return null;

  const kpRaw = Array.isArray(latest) ? latest[1] : (latest.kp_index || latest.Kp);
  return {
    ts: Array.isArray(latest) ? latest[0] : latest.time_tag,
    kp: parseFloat(kpRaw),
    history: rows.slice(-8).map(r => ({
      ts: r[0],
      kp: parseFloat(r[1]),
    })),
  };
}

async function fetchWithFallback(primary, fallback, parser, label) {
  try {
    const res = await axios.get(primary, { timeout: 10000 });
    cache.source = 'DSCOVR';
    return parser(res.data);
  } catch (err) {
    console.warn(`[noaaPoller] ${label} primary failed: ${err.message}`);
    if (fallback) {
      try {
        const res2 = await axios.get(fallback, { timeout: 10000 });
        cache.source = 'ACE';
        return parser(res2.data);
      } catch (err2) {
        console.error(`[noaaPoller] ${label} fallback also failed: ${err2.message}`);
      }
    }
    return null;
  }
}

async function pollSolarWind() {
  const [mag, plasma] = await Promise.all([
    fetchWithFallback(ENDPOINTS.solar_wind_mag, ACE_ENDPOINTS.solar_wind_mag, parseMag, 'mag'),
    fetchWithFallback(ENDPOINTS.solar_wind_plasma, ACE_ENDPOINTS.solar_wind_plasma, parsePlasma, 'plasma'),
  ]);

  if (!mag || !plasma) {
    cache.dataGaps.solar_wind = new Date().toISOString();
    console.warn('[noaaPoller] solar wind data gap flagged');
    return;
  }

  delete cache.dataGaps.solar_wind;
  cache.solar_wind = { ...mag, ...plasma, fetchedAt: new Date().toISOString() };
  cache.lastUpdated.solar_wind = Date.now();
  console.log(`[noaaPoller] solar wind updated | Bz=${mag.bz} speed=${plasma.speed}`);
}

async function pollOvation() {
  try {
    const res = await axios.get(ENDPOINTS.ovation, { timeout: 15000 });
    const parsed = parseOvation(res.data);
    if (!parsed) { cache.dataGaps.ovation = new Date().toISOString(); return; }
    delete cache.dataGaps.ovation;
    cache.ovation = { ...parsed, fetchedAt: new Date().toISOString() };
    cache.lastUpdated.ovation = Date.now();
    console.log(`[noaaPoller] OVATION updated | ${parsed.points.length} grid points`);
  } catch (err) {
    cache.dataGaps.ovation = new Date().toISOString();
    console.error(`[noaaPoller] OVATION fetch failed: ${err.message}`);
  }
}

async function pollKp() {
  try {
    const [kpRes, forecastRes] = await Promise.all([
      axios.get(ENDPOINTS.kp, { timeout: 10000 }),
      axios.get(ENDPOINTS.kp_forecast, { timeout: 10000 }),
    ]);
    const kp = parseKp(kpRes.data);
    if (kp) { cache.kp = kp; cache.lastUpdated.kp = Date.now(); }
    cache.kp_forecast = forecastRes.data;
    console.log(`[noaaPoller] Kp updated | Kp=${kp?.kp}`);
  } catch (err) {
    console.error(`[noaaPoller] Kp fetch failed: ${err.message}`);
  }
}

async function pollAlerts() {
  try {
    const alertsRes = await axios.get(ENDPOINTS.alerts, { timeout: 10000 });
    cache.alerts = Array.isArray(alertsRes.data) ? alertsRes.data.slice(0, 20) : [];
    cache.lastUpdated.alerts = Date.now();
    console.log(`[noaaPoller] Alerts updated | count=${cache.alerts.length}`);
  } catch (err) {
    console.error(`[noaaPoller] Alerts fetch failed: ${err.message}`);
  }
}

function isStale(key) {
  const last = cache.lastUpdated[key];
  if (!last) return true;
  return (Date.now() - last) > (MAX_STALENESS_MS[key] || 60000);
}

async function startPolling(type) {
  switch (type) {
    case 'solar_wind': return pollSolarWind();
    case 'ovation':    return pollOvation();
    case 'kp':         return pollKp();
    case 'alerts':     return pollAlerts();
  }
}

function getCache() { return cache; }
function isDataStale(key) { return isStale(key); }

module.exports = { startPolling, getCache, isDataStale };
