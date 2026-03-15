/**
 * bortleDetector.js
 *
 * Nominatim-only Bortle detection with retry.
 * Retries up to 3 times with 2s delay before giving up.
 * Cache: 24 hr per 0.1° cell.
 */

const axios = require('axios');
const https = require('https');

const agent = new https.Agent({ keepAlive: false });

const PLACE_BORTLE = {
  city: 8, city_block: 8, commercial: 8, industrial: 8,
  town: 6, suburb: 7, neighbourhood: 7, residential: 6, retail: 7,
  village: 4, allotments: 5, quarter: 6,
  hamlet: 3, isolated_dwelling: 2, farm: 2,
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Circuit breaker for provider instability.
const NOMINATIM_FAILURE_THRESHOLD = 3;
const NOMINATIM_COOLDOWN_MS = 5 * 60 * 1000;
let consecutiveFailures = 0;
let nominatimCooldownUntil = 0;

function isRetriableNetworkError(err) {
  const code = err?.code;
  return code === 'ECONNRESET' || code === 'ETIMEDOUT' || code === 'ECONNABORTED' || code === 'EAI_AGAIN';
}

function estimateBortleFallback(lat, lon) {
  const absLat = Math.abs(lat);

  // Conservative fallback heuristic: avoid claiming excellent darkness without data.
  // Polar/high-lat regions are often darker away from settlements, but still default safely.
  let bortle = 5;
  if (absLat >= 65) bortle = 4;

  return {
    bortle,
    source: 'fallback',
    placeType: 'unknown',
    reason: 'nominatim_unavailable',
    radiance: null,
  };
}

async function bortleFromNominatim(lat, lon, attempt = 1) {
  try {
    const url = 'https://nominatim.openstreetmap.org/reverse';
    const res = await axios.get(url, {
      params: {
        lat,
        lon,
        zoom: 10,
        format: 'json',
        addressdetails: 1,
      },
      timeout: 15000,
      httpsAgent: agent,
      headers: {
        'User-Agent': 'aurora-platform/1.0 (hackathon research)',
        Accept: 'application/json',
      },
    });
    const { type, address = {} } = res.data;

    // No country = ocean / international waters / uninhabited polar cap.
    if (!address.country && !address.country_code) {
      return { bortle: 5, source: 'nominatim', isOcean: true, placeType: type || 'unknown' };
    }

    let bortle;
    if      (address.city || address.city_district) bortle = 8;
    else if (address.town)                           bortle = 6;
    else if (address.suburb)                         bortle = 7;
    else if (address.village)                        bortle = 4;
    else if (address.hamlet || address.isolated_dwelling) bortle = 3;
    else bortle = PLACE_BORTLE[type] || 5;

    if (Math.abs(lat) > 65 && bortle > 3) bortle = Math.max(3, bortle - 1);

    console.log(`[bortleDetector] Nominatim (attempt ${attempt}) lat=${lat.toFixed(2)} lon=${lon.toFixed(2)} type=${type} → Bortle ${bortle}`);
    return { bortle, source: 'nominatim', placeType: type };
  } catch (e) {
    const status = e?.response?.status;
    const retriableHttp = status === 429 || (status >= 500 && status <= 599);
    const retriable = isRetriableNetworkError(e) || retriableHttp;

    if (attempt < 3 && retriable) {
      const delayMs = 1000 * Math.pow(2, attempt - 1);
      console.warn(`[bortleDetector] Nominatim attempt ${attempt} failed (${e.message}), retrying in ${delayMs}ms...`);
      await sleep(delayMs);
      return bortleFromNominatim(lat, lon, attempt + 1);
    }
    throw e;
  }
}

// ── Cache ─────────────────────────────────────────────────────────────────────
const bortleCache = new Map();
const CACHE_TTL   = 24 * 60 * 60 * 1000;

function cacheKey(lat, lon) {
  return `${Math.round(lat * 10) / 10},${Math.round(lon * 10) / 10}`;
}

async function getBortleForLocation(lat, lon) {
  const key = cacheKey(lat, lon);
  const hit = bortleCache.get(key);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return { ...hit.data, cached: true };

  // During cooldown, skip external call and serve fallback immediately.
  if (Date.now() < nominatimCooldownUntil) {
    const fallback = {
      ...estimateBortleFallback(lat, lon),
      source: 'fallback-cooldown',
      cooldownUntil: new Date(nominatimCooldownUntil).toISOString(),
    };
    bortleCache.set(key, { data: fallback, ts: Date.now() - (CACHE_TTL - 15 * 60 * 1000) });
    return fallback;
  }

  try {
    const result = await bortleFromNominatim(lat, lon);
    consecutiveFailures = 0;
    bortleCache.set(key, { data: result, ts: Date.now() });
    return result;
  } catch (err) {
    consecutiveFailures += 1;
    if (consecutiveFailures >= NOMINATIM_FAILURE_THRESHOLD) {
      nominatimCooldownUntil = Date.now() + NOMINATIM_COOLDOWN_MS;
      console.warn(`[bortleDetector] Nominatim unstable; entering cooldown for ${Math.round(NOMINATIM_COOLDOWN_MS / 1000)}s`);
      consecutiveFailures = 0;
    }

    const fallback = estimateBortleFallback(lat, lon);
    // Cache fallback for a shorter window so we recover quickly when provider returns.
    bortleCache.set(key, { data: fallback, ts: Date.now() - (CACHE_TTL - 30 * 60 * 1000) });
    console.warn(`[bortleDetector] Falling back for lat=${lat.toFixed(2)} lon=${lon.toFixed(2)} (${err.message})`);
    return fallback;
  }
}

module.exports = { getBortleForLocation };