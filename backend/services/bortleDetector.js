/**
 * bortleDetector.js
 *
 * Nominatim-only Bortle detection with retry.
 * Retries up to 3 times with 2s delay before giving up.
 * Cache: 24 hr per 0.1° cell.
 */

const axios = require('axios');

const PLACE_BORTLE = {
  city: 8, city_block: 8, commercial: 8, industrial: 8,
  town: 6, suburb: 7, neighbourhood: 7, residential: 6, retail: 7,
  village: 4, allotments: 5, quarter: 6,
  hamlet: 3, isolated_dwelling: 2, farm: 2,
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function bortleFromNominatim(lat, lon, attempt = 1) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&zoom=10&format=json&addressdetails=1`;
    const res = await axios.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'aurora-platform/1.0 (hackathon research)' },
    });
    const { type, address = {} } = res.data;

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
    if (attempt < 3) {
      console.warn(`[bortleDetector] Nominatim attempt ${attempt} failed (${e.message}), retrying in 2s…`);
      await sleep(2000);
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

  const result = await bortleFromNominatim(lat, lon);
  bortleCache.set(key, { data: result, ts: Date.now() });
  return result;
}

module.exports = { getBortleForLocation };