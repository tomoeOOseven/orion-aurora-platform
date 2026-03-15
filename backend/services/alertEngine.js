/**
 * alertEngine.js — D4 Alert System
 *
 * Allows users to save locations with a visibility score threshold.
 * Checks periodically, scores each saved location, and fires an SSE alert
 * + in-app notification when the score exceeds the threshold.
 *
 * Storage: in-memory Map (persisted to alerts.json on change for demo)
 * In production: swap for a database.
 */

const fs   = require('fs');
const path = require('path');
const { computeVisibilityScore } = require('./visibilityEngine');
const { getCache } = require('./noaaPoller');

const STORE_FILE    = path.join(__dirname, '../data/saved-locations.json');
const CHECK_INTERVAL_MS = Math.max(15000, Number(process.env.ALERT_CHECK_INTERVAL_MS) || 60 * 1000); // default 60s

// In-memory store: id → { id, name, lat, lon, threshold, lastScore, lastAlert, createdAt }
const savedLocations = new Map();
let broadcastFn = null;

// ── Persistence ───────────────────────────────────────────────────────────────
function persist() {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STORE_FILE, JSON.stringify([...savedLocations.values()], null, 2));
  } catch (e) {
    console.warn('[alertEngine] persist failed:', e.message);
  }
}

function load() {
  try {
    if (!fs.existsSync(STORE_FILE)) return;
    const rows = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
    rows.forEach(r => savedLocations.set(r.id, r));
    console.log(`[alertEngine] loaded ${savedLocations.size} saved locations`);
  } catch (e) {
    console.warn('[alertEngine] load failed:', e.message);
  }
}

// ── CRUD ──────────────────────────────────────────────────────────────────────
function addLocation({ name, lat, lon, threshold = 60 }) {
  const id = `loc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const loc = { id, name: name || `${lat.toFixed(2)}, ${lon.toFixed(2)}`, lat, lon, threshold, lastScore: null, lastAlert: null, createdAt: new Date().toISOString() };
  savedLocations.set(id, loc);
  persist();
  return loc;
}

function removeLocation(id) {
  const existed = savedLocations.delete(id);
  if (existed) persist();
  return existed;
}

function updateThreshold(id, threshold) {
  const loc = savedLocations.get(id);
  if (!loc) return null;
  loc.threshold = threshold;
  persist();
  return loc;
}

function listLocations() {
  return [...savedLocations.values()];
}

// ── Alert check loop ──────────────────────────────────────────────────────────
const ALERT_COOLDOWN_MS = 30 * 60 * 1000; // don't re-alert same location within 30 min

async function checkAllLocations() {
  if (savedLocations.size === 0) return;
  const cache = getCache();
  const ovationPoints = cache.ovation?.points || [];
  if (ovationPoints.length === 0) return;
  let dirty = false;

  for (const loc of savedLocations.values()) {
    try {
      const previousScore = typeof loc.lastScore === 'number' ? loc.lastScore : null;
      const result = await computeVisibilityScore(loc.lat, loc.lon, ovationPoints);
      loc.lastScore = result.score;
      dirty = true;

      const cooldownOk = !loc.lastAlert || (Date.now() - new Date(loc.lastAlert).getTime()) > ALERT_COOLDOWN_MS;
      const crossedThreshold = previousScore == null
        ? result.score >= loc.threshold
        : previousScore < loc.threshold && result.score >= loc.threshold;

      if (crossedThreshold && cooldownOk) {
        loc.lastAlert = new Date().toISOString();
        dirty = true;

        const payload = {
          type: 'visibility_alert',
          locationId: loc.id,
          locationName: loc.name,
          lat: loc.lat,
          lon: loc.lon,
          score: result.score,
          threshold: loc.threshold,
          components: result.components,
          ts: new Date().toISOString(),
        };

        console.log(`[alertEngine] ALERT fired: ${loc.name} score=${result.score} >= threshold=${loc.threshold}`);
        broadcastFn?.('visibility_alert', payload);
      }
    } catch (e) {
      console.warn(`[alertEngine] check failed for ${loc.id}:`, e.message);
    }
  }

  if (dirty) persist();
}

function startAlertEngine(broadcast) {
  broadcastFn = broadcast;
  load();
  setInterval(checkAllLocations, CHECK_INTERVAL_MS);
  // Initial check shortly after startup.
  setTimeout(checkAllLocations, 10000);
  console.log(`[alertEngine] started — checking every ${Math.round(CHECK_INTERVAL_MS / 1000)}s`);
}

module.exports = { startAlertEngine, addLocation, removeLocation, updateThreshold, listLocations };