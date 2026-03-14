/**
 * SightingLayer.jsx — Community Sighting Layer
 *
 * Two parts:
 *   1. SightingForm  — modal that appears when user right-clicks the map
 *   2. SightingPins  — renders live sighting markers on the Leaflet map
 *
 * Sightings are fetched on mount and updated via SSE (new_sighting events).
 */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// ── Sighting form modal ───────────────────────────────────────────────────────
export function SightingForm({ position, kp, score, onSubmit, onClose }) {
  const [description, setDescription] = useState('');
  const [username,    setUsername]    = useState('');
  const [photo,       setPhoto]       = useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 400 * 1024) { alert('Photo must be under 400KB'); return; }
    const reader = new FileReader();
    reader.onload = ev => setPhoto(ev.target.result.split(',')[1]); // strip data: prefix
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await axios.post('/api/sightings', {
        lat: position.lat, lon: position.lon,
        description, username: username || 'Anonymous',
        photoBase64: photo, kp, score,
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

// ── Sighting pins on map (uses Leaflet imperatively) ──────────────────────────
export function useSightingPins(mapInstance, sightings) {
  const markersRef = useRef(new Map()); // id → L.marker

  useEffect(() => {
    if (!mapInstance || !window.L) return;
    const L = window.L;

    // Add new pins
    sightings.forEach(s => {
      if (markersRef.current.has(s.id)) return;

      const icon = L.divIcon({
        html: `<div style="
          width:12px;height:12px;border-radius:50%;
          background:#00bcd4;border:2px solid #fff;
          box-shadow:0 0 6px #00bcd4;
          cursor:pointer;
        "></div>`,
        className: '', iconSize: [12, 12], iconAnchor: [6, 6],
      });

      const timeStr  = new Date(s.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const kpStr    = s.kp != null ? `Kp ${s.kp.toFixed(1)} · ` : '';
      const photoStr = ''; // photos loaded on demand

      const marker = L.marker([s.lat, s.lon], { icon, zIndexOffset: 500 })
        .addTo(mapInstance)
        .bindPopup(`
          <div style="font-family:monospace;font-size:11px;min-width:160px">
            <div style="color:#00bcd4;font-weight:700;margin-bottom:4px">${s.username}</div>
            <div style="color:#8fa3bf;margin-bottom:4px">${kpStr}${timeStr}</div>
            ${s.description ? `<div style="color:#e8eaf6">${s.description.slice(0, 200)}</div>` : ''}
          </div>
        `);

      markersRef.current.set(s.id, marker);
    });

    // Remove stale pins (not in current sightings list)
    const currentIds = new Set(sightings.map(s => s.id));
    for (const [id, marker] of markersRef.current) {
      if (!currentIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    }
  }, [mapInstance, sightings]);

  // Cleanup on unmount
  useEffect(() => {
    return () => markersRef.current.forEach(m => m.remove());
  }, []);
}

// ── Hook: fetch + SSE-subscribe sightings ─────────────────────────────────────
export function useSightings(eventSource) {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios.get('/api/sightings?limit=100')
      .then(r => setSightings(r.data.sightings))
      .catch(() => {});
  }, []);

  // Add new sightings from SSE stream
  useEffect(() => {
    if (!eventSource) return;
    const handler = (e) => {
      try {
        const s = JSON.parse(e.data);
        setSightings(prev => {
          if (prev.find(x => x.id === s.id)) return prev;
          return [...prev.slice(-499), s];
        });
      } catch {}
    };
    eventSource.addEventListener('new_sighting', handler);
    return () => eventSource.removeEventListener('new_sighting', handler);
  }, [eventSource]);

  const addSighting = (s) => setSightings(prev => [...prev.slice(-499), s]);

  return { sightings, addSighting };
}