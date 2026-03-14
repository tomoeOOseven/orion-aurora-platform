const express = require('express');
const axios = require('axios');
const { findBestNearbyPoint } = require('../services/visibilityEngine');
const { getCache } = require('../services/noaaPoller');

const router = express.Router();
const OSRM_BASE = 'https://router.project-osrm.org/route/v1/driving';

router.get('/best-spot', async (req, res) => {
  const lat    = parseFloat(req.query.lat);
  const lon    = parseFloat(req.query.lon);
  const radius = Math.min(parseInt(req.query.radius) || 9999, 20000);

  if (isNaN(lat) || isNaN(lon)) return res.status(400).json({ error: 'lat and lon required' });

  const cache = getCache();
  const ovationPoints = cache.ovation?.points || [];

  if (ovationPoints.length === 0) {
    return res.status(503).json({ found: false, reason: 'OVATION data not yet available — retry in 30s' });
  }

  try {
    const result = await findBestNearbyPoint(lat, lon, ovationPoints, radius);

    if (!result.found) {
      return res.json({ found: false, reason: result.reason });
    }

    const { destination } = result;
    let route = null;

    try {
      const osrmUrl = `${OSRM_BASE}/${lon},${lat};${destination.lon},${destination.lat}?overview=full&geometries=geojson&steps=true`;
      const r = (await axios.get(osrmUrl, { timeout: 10000 })).data.routes?.[0];
      if (r) {
        route = {
          distanceKm: (r.distance / 1000).toFixed(1),
          durationMin: Math.round(r.duration / 60),
          geometry: r.geometry,
          steps: r.legs?.[0]?.steps?.slice(0, 8).map(s => ({
            instruction: s.maneuver?.instruction || s.name || '',
            distanceM: Math.round(s.distance),
          })),
        };
      }
    } catch (e) {
      console.warn('[routing] OSRM failed:', e.message);
    }

    res.json({ found: true, destination, route, searchedRadiusKm: radius });
  } catch (err) {
    console.error('[routing]', err);
    res.status(500).json({ found: false, reason: err.message });
  }
});

module.exports = router;