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
  const [detectedPosition, setDetectedPosition] = useState(null);
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

  const detectAndApply = useCallback((applyAsSelected = true) => new Promise((resolve) => {
    const fallback = { lat: 64.13, lon: -21.9 };

    if (!navigator.geolocation) {
      setGeoError('Geolocation unavailable');
      if (applyAsSelected) {
        posRef.current = fallback;
        setPositionState(fallback);
        doFetch(fallback.lat, fallback.lon);
      }
      resolve(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) => {
        const detected = { lat: p.coords.latitude, lon: p.coords.longitude };
        setDetectedPosition(detected);
        setGeoError(null);
        if (applyAsSelected) {
          posRef.current = detected;
          setPositionState(detected);
          doFetch(detected.lat, detected.lon);
        }
        resolve(detected);
      },
      (e) => {
        setGeoError(e.message);
        if (!posRef.current && applyAsSelected) {
          posRef.current = fallback;
          setPositionState(fallback);
          doFetch(fallback.lat, fallback.lon);
        }
        resolve(posRef.current || fallback);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }), [doFetch]);

  useEffect(() => {
    detectAndApply(true);
  }, [detectAndApply]);

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

  const useDetectedLocation = useCallback(async () => {
    await detectAndApply(true);
  }, [detectAndApply]);

  return { position, detectedPosition, setPosition, useDetectedLocation, visibility, geoError, loadingScore, refetch };
}