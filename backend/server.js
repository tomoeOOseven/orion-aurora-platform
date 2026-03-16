require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const cron    = require('node-cron');
const path    = require('path');

const { startPolling }         = require('./services/noaaPoller');
const { startSubstormMonitor } = require('./services/substormDetector');
const { startAlertEngine }     = require('./services/alertEngine');
const { initSightingsStore }   = require('./services/sightingsStore');

const spaceweatherRoutes = require('./routes/spaceweather');
const visibilityRoutes   = require('./routes/visibility');
const routingRoutes      = require('./routes/routing');
const alertRoutes        = require('./routes/alerts');
const sightingsRoutes    = require('./routes/sightings');

const app  = express();
const FRONTEND_PORT = process.env.FRONTEND_PORT || 7000;
const PORT = process.env.PORT || process.env.BACKEND_PORT || 7001;
let servicesStarted = false;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: "https://your-vercel-app.vercel.app"
}));
app.use(express.json({ limit: '2mb' })); // allow base64 photo uploads
app.use('/uploads', express.static(path.join(__dirname, 'data', 'sightings_photos')));
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── SSE clients ───────────────────────────────────────────────────────────────
const sseClients = new Set();

app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.flushHeaders();
  const client = { res, id: Date.now() };
  sseClients.add(client);
  req.on('close', () => sseClients.delete(client));
});

function broadcast(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(c => {
    try { c.res.write(payload); } catch { sseClients.delete(c); }
  });
}
module.exports.broadcast = broadcast;

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/spaceweather', spaceweatherRoutes);
app.use('/api/visibility',   visibilityRoutes);
app.use('/api/routing',      routingRoutes);
app.use('/api/alerts',       alertRoutes);
app.use('/api/sightings',    sightingsRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

function startBackgroundServices() {
  if (servicesStarted) return;
  servicesStarted = true;

  // ── Polling schedule ────────────────────────────────────────────────────────
  cron.schedule('* * * * *',    () => startPolling('solar_wind'));
  cron.schedule('*/30 * * * *', () => startPolling('ovation'));
  cron.schedule('*/15 * * * *', () => startPolling('kp'));
  cron.schedule('* * * * *',    () => startPolling('alerts'));

  startPolling('solar_wind');
  startPolling('ovation');
  startPolling('kp');
  startPolling('alerts');
  startSubstormMonitor(broadcast);
  startAlertEngine(broadcast);
  initSightingsStore(broadcast);
}

const server = app.listen(PORT, () => {
  console.log(`Aurora backend running on http://localhost:${PORT}`);
  startBackgroundServices();
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`[startup] Port ${PORT} is already in use. Another backend process is already running.`);
    console.error('[startup] Stop the existing process or run with a different BACKEND_PORT.');
    process.exit(1);
  }

  console.error('[startup] Server failed to start:', err);
  process.exit(1);
});