/**
 * sightingsStore.js — Community Sighting Layer
 *
 * Stores geo-tagged aurora sighting reports submitted by users.
 * Each sighting: { id, lat, lon, description, photoBase64?, kp, ts, score }
 *
 * Persisted to data/sightings.json. Broadcasts new sightings via SSE
 * so all connected clients see pins appear in real time.
 *
 * Limits: 500 sightings max (FIFO eviction), photos capped at 500KB base64.
 */

const fs   = require('fs');
const path = require('path');

const STORE_FILE  = path.join(__dirname, '../data/sightings.json');
const MAX_SIGHTINGS  = 500;
const MAX_PHOTO_BYTES = 500 * 1024; // 500 KB base64

const sightings = [];
let broadcastFn = null;

function persist() {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // Don't persist photos to disk — keep file small
    const light = sightings.map(({ photoBase64, ...rest }) => rest);
    fs.writeFileSync(STORE_FILE, JSON.stringify(light, null, 2));
  } catch (e) {
    console.warn('[sightingsStore] persist failed:', e.message);
  }
}

function load() {
  try {
    if (!fs.existsSync(STORE_FILE)) return;
    const rows = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
    sightings.push(...rows.slice(-MAX_SIGHTINGS));
    console.log(`[sightingsStore] loaded ${sightings.length} sightings`);
  } catch (e) {
    console.warn('[sightingsStore] load failed:', e.message);
  }
}

function addSighting({ lat, lon, description, photoBase64, kp, score, username }) {
  if (typeof lat !== 'number' || typeof lon !== 'number') throw new Error('lat/lon required');
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) throw new Error('Invalid coordinates');
  if (description && description.length > 500) throw new Error('Description too long (max 500 chars)');
  if (photoBase64 && photoBase64.length > MAX_PHOTO_BYTES) throw new Error('Photo too large (max 500KB)');

  const sighting = {
    id: `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    lat: parseFloat(lat.toFixed(4)),
    lon: parseFloat(lon.toFixed(4)),
    description: description || '',
    photoBase64: photoBase64 || null,
    kp:  kp  || null,
    score: score || null,
    username: username || 'Anonymous',
    ts: new Date().toISOString(),
  };

  sightings.push(sighting);
  if (sightings.length > MAX_SIGHTINGS) sightings.shift(); // FIFO eviction

  persist();

  // Broadcast to all SSE clients (strip photo from SSE payload — too large)
  const { photoBase64: _, ...sightingNoPhoto } = sighting;
  broadcastFn?.('new_sighting', sightingNoPhoto);

  console.log(`[sightingsStore] new sighting at ${lat.toFixed(2)},${lon.toFixed(2)} by ${sighting.username}`);
  return sighting;
}

function getSightings({ limit = 100, since } = {}) {
  let results = sightings;
  if (since) results = results.filter(s => s.ts > since);
  // Return without photo for listing (photos fetched individually)
  return results.slice(-limit).map(({ photoBase64, ...rest }) => rest);
}

function getSighting(id) {
  return sightings.find(s => s.id === id) || null;
}

function initSightingsStore(broadcast) {
  broadcastFn = broadcast;
  load();
}

module.exports = { initSightingsStore, addSighting, getSightings, getSighting };