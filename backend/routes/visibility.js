const express = require('express');
const { computeVisibilityScore } = require('../services/visibilityEngine');
const { getCache } = require('../services/noaaPoller');

const router = express.Router();

// GET /api/visibility?lat=&lon=
// Bortle is now auto-detected from VIIRS DNB — no manual param
router.get('/', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (isNaN(lat) || isNaN(lon)) return res.status(400).json({ error: 'lat and lon required' });
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return res.status(400).json({ error: 'Invalid coordinates' });

  const cache = getCache();
  const ovationPoints = cache.ovation?.points || [];

  try {
    const result = await computeVisibilityScore(lat, lon, ovationPoints);
    res.json({ lat, lon, ...result });
  } catch (err) {
    console.error('[visibility]', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/batch', async (req, res) => {
  const locations = req.body.locations;
  if (!Array.isArray(locations) || locations.length === 0) return res.status(400).json({ error: 'body.locations required' });
  if (locations.length > 50) return res.status(400).json({ error: 'Max 50 locations per batch' });

  const cache = getCache();
  const ovationPoints = cache.ovation?.points || [];

  const results = await Promise.all(locations.map(async ({ lat, lon }) => {
    try {
      const score = await computeVisibilityScore(lat, lon, ovationPoints);
      return { lat, lon, ...score };
    } catch (err) {
      return { lat, lon, error: err.message };
    }
  }));
  res.json({ results });
});

module.exports = router;