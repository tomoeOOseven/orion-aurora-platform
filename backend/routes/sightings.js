const express = require('express');
const { addSighting, getSightings, getSighting } = require('../services/sightingsStore');
const { getCache } = require('../services/noaaPoller');

const router = express.Router();

// GET /api/sightings?limit=50&since=ISO_DATE
router.get('/', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 200);
  const since = req.query.since || null;
  res.json({ sightings: getSightings({ limit, since }) });
});

// GET /api/sightings/:id — get single sighting including photo
router.get('/:id', (req, res) => {
  const s = getSighting(req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json({ sighting: s });
});

// POST /api/sightings — submit a new sighting
// Body: { lat, lon, description, photoBase64?, username? }
router.post('/', (req, res) => {
  const cache = getCache();
  const kp    = cache.kp?.kp ?? null;

  try {
    const sighting = addSighting({
      lat:         req.body.lat,
      lon:         req.body.lon,
      description: req.body.description,
      photoBase64: req.body.photoBase64,
      username:    req.body.username,
      kp,
    });
    res.status(201).json({ sighting });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;