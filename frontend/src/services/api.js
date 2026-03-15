import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: BASE, timeout: 15000 });

export const getSpaceWeather = () => api.get('/spaceweather').then(r => r.data);
export const getOvation = () => api.get('/spaceweather/ovation').then(r => r.data);
export const getKpForecast = () => api.get('/spaceweather/kp-forecast').then(r => r.data);
export const getBzHistory = () => api.get('/spaceweather/bz-history').then(r => r.data);
export const getLatestSubstorm = () => api.get('/spaceweather/substorm/latest').then(r => r.data);

export const getVisibility = (lat, lon, bortle = 5) =>
  api.get('/visibility', { params: { lat, lon, bortle } }).then(r => r.data);

export const getBestSpot = (lat, lon, radius = 200, mode = 'strict') =>
  api.get('/routing/best-spot', { params: { lat, lon, radius, mode } }).then(r => r.data);

/**
 * Open an SSE stream to /api/stream.
 * Returns a cleanup function.
 */
export function openEventStream(handlers) {
  const es = new EventSource(`${BASE}/stream`);

  if (handlers.solar_wind_update) es.addEventListener('solar_wind_update', e => handlers.solar_wind_update(JSON.parse(e.data)));
  if (handlers.substorm_alert)    es.addEventListener('substorm_alert',    e => handlers.substorm_alert(JSON.parse(e.data)));

  es.onerror = () => handlers.onError?.();

  return () => es.close();
}

export default api;
