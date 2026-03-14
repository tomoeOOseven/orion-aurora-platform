const express = require('express');
const { getCache, isDataStale } = require('../services/noaaPoller');
const { getBzHistory } = require('../services/substormDetector');

const router = express.Router();

// GET /api/spaceweather — current solar wind + Kp + OVATION summary
router.get('/', (req, res) => {
  const cache = getCache();
  res.json({
    solar_wind: cache.solar_wind,
    kp: cache.kp,
    ovation: cache.ovation ? {
      forecastTime: cache.ovation.forecastTime,
      fetchedAt: cache.ovation.fetchedAt,
      pointCount: cache.ovation.points?.length,
      // Don't send all 65k points here — use /ovation endpoint
    } : null,
    alerts: cache.alerts,
    source: cache.source,
    dataGaps: cache.dataGaps,
    stale: {
      solar_wind: isDataStale('solar_wind'),
      ovation: isDataStale('ovation'),
      kp: isDataStale('kp'),
    },
    ts: new Date().toISOString(),
  });
});

// GET /api/spaceweather/ovation — full OVATION grid (for map rendering)
router.get('/ovation', (req, res) => {
  const cache = getCache();
  if (!cache.ovation) {
    return res.status(503).json({ error: 'OVATION data not yet available', stale: true });
  }
  res.json(cache.ovation);
});

// GET /api/spaceweather/bz-history — Bz time series for substorm detector
router.get('/bz-history', (req, res) => {
  res.json({ history: getBzHistory() });
});

// GET /api/spaceweather/kp-forecast
router.get('/kp-forecast', (req, res) => {
  const cache = getCache();
  res.json({ forecast: cache.kp_forecast });
});

module.exports = router;
