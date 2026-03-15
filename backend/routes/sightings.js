const express = require('express');
const { addSighting, getSightings, getSighting } = require('../services/sightingsStore');
const { getCache } = require('../services/noaaPoller');

const router = express.Router();

// GET /api/sightings?limit=50&since=ISO_DATE
router.get('/', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 200);
  const since = req.query.since || null;
  try {
    const sightings = await getSightings({ limit, since });
    res.json({ sightings });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/sightings/:id — get single sighting including photo
router.get('/:id', async (req, res) => {
  try {
    const s = await getSighting(req.params.id);
    if (!s) return res.status(404).json({ error: 'Not found' });
    res.json({ sighting: s });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/sightings — submit a new sighting
// Body: { lat, lon, description, photoBase64?, username? }
router.post('/', async (req, res) => {
  const cache = getCache();
  const kp    = cache.kp?.kp ?? null;

  try {
    const sighting = await addSighting({
      lat:         req.body.lat,
      lon:         req.body.lon,
      description: req.body.description,
      photoBase64: req.body.photoBase64,
      photoMime:   req.body.photoMime,
      username:    req.body.username,
      kp,
    });
    res.status(201).json({ sighting });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;