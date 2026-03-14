import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const AUTO_REFRESH_MS = 5 * 60 * 1000;

async function fetchScore(lat, lon) {
  // No bortle param — backend auto-detects from VIIRS DNB
  const res = await axios.get('/api/visibility', { params: { lat, lon }, timeout: 15000 });
  return res.data;
}

export function useVisibility() {
  const [position,     setPositionState] = useState(null);
  const [visibility,   setVisibility]    = useState(null);
  const [geoError,     setGeoError]      = useState(null);
  const [loadingScore, setLoadingScore]  = useState(false);
  const pendingRef = useRef(false);
  const posRef     = useRef(null);

  const doFetch = useCallback(async (lat, lon) => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setLoadingScore(true);
    try {
      const data = await fetchScore(lat, lon);
      setVisibility(data);
    } catch (err) {
      console.warn('[useVisibility]', err.message);
    } finally {
      setLoadingScore(false);
      pendingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const go = (lat, lon) => {
      posRef.current = { lat, lon };
      setPositionState({ lat, lon });
      doFetch(lat, lon);
    };

    if (!navigator.geolocation) {
      setGeoError('Geolocation unavailable');
      go(64.13, -21.90);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      p => go(p.coords.latitude, p.coords.longitude),
      e => { setGeoError(e.message); go(64.13, -21.90); },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [doFetch]);

  useEffect(() => {
    const t = setInterval(() => {
      if (posRef.current) doFetch(posRef.current.lat, posRef.current.lon);
    }, AUTO_REFRESH_MS);
    return () => clearInterval(t);
  }, [doFetch]);

  const setPosition = useCallback((pos) => {
    posRef.current = pos;
    setPositionState(pos);
    doFetch(pos.lat, pos.lon);
  }, [doFetch]);

  const refetch = useCallback(() => {
    if (posRef.current) doFetch(posRef.current.lat, posRef.current.lon);
  }, [doFetch]);

  return { position, setPosition, visibility, geoError, loadingScore, refetch };
}