const express = require('express');
const { addLocation, removeLocation, updateThreshold, listLocations } = require('../services/alertEngine');

const router = express.Router();

// GET /api/alerts/locations — list all saved locations
router.get('/locations', (req, res) => {
  res.json({ locations: listLocations() });
});

// POST /api/alerts/locations — save a new location
// Body: { name, lat, lon, threshold }
router.post('/locations', (req, res) => {
  const { name, lat, lon, threshold } = req.body;
  if (typeof lat !== 'number' || typeof lon !== 'number') {
    return res.status(400).json({ error: 'lat and lon (numbers) required' });
  }
  if (threshold != null && (threshold < 0 || threshold > 100)) {
    return res.status(400).json({ error: 'threshold must be 0–100' });
  }
  const loc = addLocation({ name, lat, lon, threshold });
  res.status(201).json({ location: loc });
});

// PATCH /api/alerts/locations/:id — update threshold
router.patch('/locations/:id', (req, res) => {
  const { threshold } = req.body;
  if (typeof threshold !== 'number' || threshold < 0 || threshold > 100) {
    return res.status(400).json({ error: 'threshold must be a number 0–100' });
  }
  const loc = updateThreshold(req.params.id, threshold);
  if (!loc) return res.status(404).json({ error: 'Location not found' });
  res.json({ location: loc });
});

// DELETE /api/alerts/locations/:id
router.delete('/locations/:id', (req, res) => {
  const ok = removeLocation(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Location not found' });
  res.json({ deleted: true });
});

module.exports = router;