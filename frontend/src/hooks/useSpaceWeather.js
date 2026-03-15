import { useState, useEffect, useCallback, useRef } from 'react';
import { getSpaceWeather, getOvation, getLatestSubstorm, openEventStream } from '../services/api';

const WEATHER_POLL_MS  = 60  * 1000;   // 60s — matches backend cron
const OVATION_POLL_MS  = 30  * 60 * 1000; // 30 min — matches NOAA cadence
const WEATHER_CACHE_KEY = 'aurora:last-spaceweather';
const OVATION_CACHE_KEY = 'aurora:last-ovation';

function safeReadCache(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeWriteCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function useSpaceWeather() {
  const [solarWind,    setSolarWind]    = useState(null);
  const [kp,           setKp]           = useState(null);
  const [ovation,      setOvation]      = useState(null);
  const [alerts,       setAlerts]       = useState([]);
  const [substormAlert,setSubstormAlert]= useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [isStale,      setIsStale]      = useState(false);
  const [dataSource,   setDataSource]   = useState('DSCOVR');
  const lastOvationFetch = useRef(0);

  const fetchWeather = useCallback(async () => {
    try {
      const data = await getSpaceWeather();
      setSolarWind(data.solar_wind);
      setKp(data.kp);
      setAlerts(data.alerts || []);
      if (data.substorm_latest) {
        setSubstormAlert({ ...data.substorm_latest, receivedAt: Date.now() });
      } else {
        const substormRes = await getLatestSubstorm().catch(() => null);
        if (substormRes?.substorm) setSubstormAlert({ ...substormRes.substorm, receivedAt: Date.now() });
      }
      setDataSource(data.source || 'DSCOVR');
      setIsStale(data.stale?.solar_wind || false);
      safeWriteCache(WEATHER_CACHE_KEY, data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsStale(true);

      const cached = safeReadCache(WEATHER_CACHE_KEY);
      if (cached) {
        setSolarWind(cached.solar_wind || null);
        setKp(cached.kp || null);
        setAlerts(cached.alerts || []);
        if (cached.substorm_latest) {
          setSubstormAlert(prev => prev || { ...cached.substorm_latest, receivedAt: Date.now() });
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOvation = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastOvationFetch.current < OVATION_POLL_MS) return;
    lastOvationFetch.current = now;
    try {
      const data = await getOvation();
      setOvation(data);
      safeWriteCache(OVATION_CACHE_KEY, data);
    } catch (err) {
      console.warn('[useSpaceWeather] OVATION fetch failed:', err.message);
      const cached = safeReadCache(OVATION_CACHE_KEY);
      if (cached?.points?.length) setOvation(cached);
    }
  }, []);

  useEffect(() => {
    // Kick off immediately
    fetchWeather();
    fetchOvation(true);

    const weatherTimer = setInterval(fetchWeather, WEATHER_POLL_MS);
    const ovationTimer = setInterval(() => fetchOvation(true), OVATION_POLL_MS);

    // SSE: real-time solar wind + substorm alerts
    const cleanup = openEventStream({
      solar_wind_update: (data) => {
        setSolarWind(prev => prev ? { ...prev, ...data, fetchedAt: data.ts } : data);
        setIsStale(false);
      },
      substorm_alert: (data) => {
        setSubstormAlert({ ...data, receivedAt: Date.now() });
        if (data.level === 'WATCH') setTimeout(() => setSubstormAlert(null), 10 * 60 * 1000);
      },
      onError: () => setIsStale(true),
    });

    return () => {
      clearInterval(weatherTimer);
      clearInterval(ovationTimer);
      cleanup();
    };
  }, [fetchWeather, fetchOvation]);

  // Expose manual OVATION refresh (called from App when needed)
  const refreshOvation = useCallback(() => fetchOvation(true), [fetchOvation]);

  return { solarWind, kp, ovation, alerts, substormAlert, loading, error, isStale, dataSource, refreshOvation };
}