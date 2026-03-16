/**
 * SightingLayer.jsx — Community Sighting Layer
 *
 * Two parts:
 *   1. SightingForm  — modal that appears when user right-clicks the map
 *   2. SightingPins  — renders live sighting entities on the Cesium globe
 *
 * Sightings are fetched on mount and updated via SSE (new_sighting events).
 */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as Cesium from 'cesium';
import { API_BASE } from '../services/api';

// ── Sighting form modal ───────────────────────────────────────────────────────
export function SightingForm({ position, kp, score, onSubmit, onClose }) {
  const [description, setDescription] = useState('');
  const [username,    setUsername]    = useState('');
  const [photo,       setPhoto]       = useState(null);
  const [photoMime,   setPhotoMime]   = useState(null);
  const [photoPreview,setPhotoPreview]= useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 400 * 1024) { alert('Photo must be under 400KB'); return; }
    setPhotoMime(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target.result;
      setPhoto(dataUrl.split(',')[1]); // strip data: prefix
      setPhotoPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/sightings`, {
        lat: position.lat, lon: position.lon,
        description, username: username || 'Anonymous',
        photoBase64: photo, photoMime, kp, score,
      });
      setSubmitted(true);
      setTimeout(onClose, 1200);
      onSubmit?.();
    } catch (e) {
      alert('Submit failed: ' + e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', width: 320, maxWidth: '90vw' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
            <div style={{ color: 'var(--success)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Sighting submitted!</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--aurora-green)', letterSpacing: '0.08em' }}>
                REPORT SIGHTING
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginBottom: 12 }}>
              {position.lat.toFixed(3)}°, {position.lon.toFixed(3)}°
              {kp != null && ` · Kp ${kp.toFixed(1)}`}
            </div>

            <input value={username} onChange={e => setUsername(e.target.value)}
              placeholder="Your name (optional)"
              style={{ width: '100%', marginBottom: 8, background: 'var(--bg-hover)', border: '1px solid var(--border)',
                borderRadius: 4, padding: '6px 8px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 11 }} />

            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="What did you see? Colours, intensity, movement…"
              rows={3} style={{ width: '100%', marginBottom: 8, background: 'var(--bg-hover)', border: '1px solid var(--border)',
                borderRadius: 4, padding: '6px 8px', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: 11,
                resize: 'vertical' }} />

            <label style={{ display: 'block', marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
              {photo ? '✓ Photo attached' : '+ Attach photo (optional, max 400KB)'}
            </label>

            {photoPreview && (
              <img
                src={photoPreview}
                alt="Sighting preview"
                style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)', marginBottom: 10 }}
              />
            )}

            <button onClick={handleSubmit} disabled={submitting} style={{
              width: '100%', padding: '8px', background: 'rgba(0,230,118,0.12)',
              border: '1px solid var(--aurora-green)', borderRadius: 6,
              color: 'var(--aurora-green)', fontFamily: 'var(--font-mono)', fontSize: 11,
              fontWeight: 700, letterSpacing: '0.06em', cursor: submitting ? 'not-allowed' : 'pointer',
            }}>
              {submitting ? 'Submitting…' : 'Submit Sighting'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Sighting entities on globe (uses Cesium imperatively) ─────────────────────
export function useSightingPins(viewer, sightings, visible = true) {
  const entitiesRef = useRef(new Map()); // id → Cesium Entity

  const getEntitiesSafe = (candidateViewer) => {
    try {
      if (!candidateViewer || typeof candidateViewer !== 'object') return null;
      return candidateViewer.entities || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const entities = getEntitiesSafe(viewer);
    if (!entities || typeof entities.add !== 'function' || typeof entities.remove !== 'function') return;
    if (!Array.isArray(sightings)) return;

    if (!visible) {
      for (const [, entity] of entitiesRef.current) {
        try {
          entities.remove(entity);
        } catch {}
      }
      entitiesRef.current.clear();
      return;
    }

    try {
      // Add new entities
      sightings.forEach(s => {
        // Validate sighting has required properties
        if (!s || !s.id || s.lon === undefined || s.lat === undefined || !s.ts) return;
        if (entitiesRef.current.has(s.id)) return;

        const timeStr  = new Date(s.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const kpStr    = s.kp != null ? `Kp ${s.kp.toFixed(1)} · ` : '';

        const entity = entities.add({
          id: `sighting-${s.id}`,
          position: Cesium.Cartesian3.fromDegrees(s.lon, s.lat),
          point: {
            pixelSize: 10,
            color: Cesium.Color.CYAN.withAlpha(0.92),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1.5,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          },
          label: {
            text: `${s.username || 'Anonymous'}\n${kpStr}${timeStr}`,
            font: '11px monospace',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            fillColor: Cesium.Color.fromCssColorString('#dff9ff'),
            outlineColor: Cesium.Color.fromCssColorString('#06222c'),
            outlineWidth: 2,
            showBackground: true,
            backgroundColor: Cesium.Color.fromCssColorString('rgba(6, 20, 28, 0.75)'),
            backgroundPadding: new Cesium.Cartesian2(6, 4),
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(10, -6),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          },
          description: s.description || '',
        });

        entitiesRef.current.set(s.id, entity);
      });

      // Remove stale entities (not in current sightings list)
      const currentIds = new Set(sightings.map(s => s?.id).filter(Boolean));
      for (const [id, entity] of entitiesRef.current) {
        if (!currentIds.has(id)) {
          try {
            entities.remove(entity);
          } catch {}
          entitiesRef.current.delete(id);
        }
      }
    } catch (err) {
      console.warn('[useSightingPins]', err);
    }
  }, [viewer, sightings, visible]);

  // Cleanup on unmount
  useEffect(() => {
    const entities = getEntitiesSafe(viewer);

    return () => {
      // Cleanup entities if this viewer still exposes an entity collection.
      if (entities && typeof entities.remove === 'function') {
        entitiesRef.current.forEach(entity => {
          try {
            entities.remove(entity);
          } catch {}
        });
      }
      entitiesRef.current.clear();
    };
  }, [viewer]);
}

// ── Hook: fetch + SSE-subscribe sightings ─────────────────────────────────────
export function useSightings(eventSource) {
  const [sightings, setSightings] = useState([]);
  const CACHE_KEY = 'aurora:last-sightings';

  function writeCache(items) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(items)); } catch {}
  }

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  useEffect(() => {
    axios.get(`${API_BASE}/sightings?limit=100`)
      .then(r => {
        setSightings(r.data.sightings);
        writeCache(r.data.sightings || []);
      })
      .catch(() => {
        const cached = readCache();
        if (cached.length) setSightings(cached);
      });
  }, []);

  // Add new sightings from SSE stream
  useEffect(() => {
    if (!eventSource) return;
    const handler = (e) => {
      try {
        const s = JSON.parse(e.data);
        setSightings(prev => {
          if (prev.find(x => x.id === s.id)) return prev;
          const next = [...prev.slice(-499), s];
          writeCache(next);
          return next;
        });
      } catch {}
    };
    eventSource.addEventListener('new_sighting', handler);
    return () => eventSource.removeEventListener('new_sighting', handler);
  }, [eventSource]);

  const addSighting = (s) => setSightings(prev => [...prev.slice(-499), s]);

  return { sightings, addSighting };
}