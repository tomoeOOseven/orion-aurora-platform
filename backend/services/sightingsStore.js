/**
 * sightingsStore.js — SQLite-backed Community Sighting Layer
 *
 * Persists sightings to SQLite so data survives restarts and deployments.
 * Photos are stored on disk and referenced by path in DB rows.
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'sightings.db');
const LEGACY_JSON_FILE = path.join(DATA_DIR, 'sightings.json');
const PHOTO_DIR = path.join(DATA_DIR, 'sightings_photos');

const MAX_SIGHTINGS = 5000;
const MAX_PHOTO_BYTES = 1024 * 1024;

let db;
let initPromise = null;
let broadcastFn = null;

function ensureDirs() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(PHOTO_DIR, { recursive: true });
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

function toPhotoUrl(photoPath) {
  if (!photoPath) return null;
  return `/uploads/${path.basename(photoPath)}`;
}

function extForMime(photoMime) {
  const mime = String(photoMime || '').toLowerCase();
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'jpg';
}

function normalizeRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    lat: row.lat,
    lon: row.lon,
    description: row.description || '',
    kp: row.kp,
    score: row.score,
    username: row.username || 'Anonymous',
    ts: row.ts,
    photoUrl: toPhotoUrl(row.photo_path),
    hasPhoto: !!row.photo_path,
  };
}

async function maybeMigrateLegacyJson() {
  const countRow = await get('SELECT COUNT(*) AS count FROM sightings');
  if (!countRow || countRow.count > 0) return;
  if (!fs.existsSync(LEGACY_JSON_FILE)) return;

  try {
    const rows = JSON.parse(fs.readFileSync(LEGACY_JSON_FILE, 'utf8'));
    for (const row of rows.slice(-MAX_SIGHTINGS)) {
      await run(
        `INSERT OR IGNORE INTO sightings (id, lat, lon, description, photo_path, kp, score, username, ts)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.id || `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          row.lat,
          row.lon,
          row.description || '',
          null,
          row.kp ?? null,
          row.score ?? null,
          row.username || 'Anonymous',
          row.ts || new Date().toISOString(),
        ]
      );
    }
    console.log(`[sightingsStore] migrated ${rows.length} legacy JSON sightings to SQLite`);
  } catch (e) {
    console.warn('[sightingsStore] legacy migration failed:', e.message);
  }
}

async function trimRows() {
  await run(
    `DELETE FROM sightings
     WHERE id IN (
       SELECT id FROM sightings
       ORDER BY ts DESC
       LIMIT -1 OFFSET ?
     )`,
    [MAX_SIGHTINGS]
  );
}

async function ensureInit() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    ensureDirs();
    db = new sqlite3.Database(DB_FILE);

    await run(
      `CREATE TABLE IF NOT EXISTS sightings (
         id TEXT PRIMARY KEY,
         lat REAL NOT NULL,
         lon REAL NOT NULL,
         description TEXT,
         photo_path TEXT,
         kp REAL,
         score REAL,
         username TEXT,
         ts TEXT NOT NULL
       )`
    );
    await run('CREATE INDEX IF NOT EXISTS idx_sightings_ts ON sightings(ts DESC)');
    await maybeMigrateLegacyJson();
    await trimRows();
  })();
  return initPromise;
}

async function addSighting({ lat, lon, description, photoBase64, photoMime, kp, score, username }) {
  await ensureInit();

  if (typeof lat !== 'number' || typeof lon !== 'number') throw new Error('lat/lon required');
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) throw new Error('Invalid coordinates');
  if (description && description.length > 500) throw new Error('Description too long (max 500 chars)');

  const id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const ts = new Date().toISOString();
  const cleanLat = parseFloat(lat.toFixed(4));
  const cleanLon = parseFloat(lon.toFixed(4));

  let photoPath = null;
  if (photoBase64) {
    const photoBuffer = Buffer.from(photoBase64, 'base64');
    if (photoBuffer.length > MAX_PHOTO_BYTES) throw new Error('Photo too large (max 1MB)');
    const ext = extForMime(photoMime);
    const fileName = `${id}.${ext}`;
    photoPath = path.join(PHOTO_DIR, fileName);
    fs.writeFileSync(photoPath, photoBuffer);
  }

  await run(
    `INSERT INTO sightings (id, lat, lon, description, photo_path, kp, score, username, ts)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, cleanLat, cleanLon, description || '', photoPath, kp ?? null, score ?? null, username || 'Anonymous', ts]
  );
  await trimRows();

  const sighting = normalizeRow({
    id,
    lat: cleanLat,
    lon: cleanLon,
    description: description || '',
    photo_path: photoPath,
    kp: kp ?? null,
    score: score ?? null,
    username: username || 'Anonymous',
    ts,
  });

  broadcastFn?.('new_sighting', sighting);
  console.log(`[sightingsStore] new sighting at ${cleanLat.toFixed(2)},${cleanLon.toFixed(2)} by ${sighting.username}`);
  return sighting;
}

async function getSightings({ limit = 100, since } = {}) {
  await ensureInit();

  const safeLimit = Math.min(Number(limit) || 100, 500);
  let rows;
  if (since) {
    rows = await all(
      `SELECT * FROM sightings WHERE ts > ? ORDER BY ts DESC LIMIT ?`,
      [since, safeLimit]
    );
  } else {
    rows = await all(`SELECT * FROM sightings ORDER BY ts DESC LIMIT ?`, [safeLimit]);
  }
  return rows.reverse().map(normalizeRow);
}

async function getSighting(id) {
  await ensureInit();
  const row = await get(`SELECT * FROM sightings WHERE id = ?`, [id]);
  return normalizeRow(row);
}

function initSightingsStore(broadcast) {
  broadcastFn = broadcast;
  ensureInit()
    .then(() => console.log('[sightingsStore] SQLite store ready'))
    .catch((e) => console.warn('[sightingsStore] init failed:', e.message));
}

module.exports = { initSightingsStore, addSighting, getSightings, getSighting };