/**
 * AlertSettings.jsx — D4 Alert System
 *
 * Lets users save locations with a visibility score threshold.
 * When the backend scores that location above the threshold, an SSE
 * visibility_alert event fires and appears as a banner in the UI.
 */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../services/api';

async function fetchLocations()       { return (await axios.get(`${API_BASE}/alerts/locations`)).data.locations; }
async function saveLocation(body)     { return (await axios.post(`${API_BASE}/alerts/locations`, body)).data.location; }
async function deleteLocation(id)     { await axios.delete(`${API_BASE}/alerts/locations/${id}`); }
async function patchThreshold(id, t)  { return (await axios.patch(`${API_BASE}/alerts/locations/${id}`, { threshold: t })).data.location; }

export default function AlertSettings({ position, currentScore, visibilityAlert, onDismissAlert }) {
  const [locations, setLocations] = useState([]);
  const [name,      setName]      = useState('');
  const [threshold, setThreshold] = useState(60);
  const [saving,    setSaving]    = useState(false);

  useEffect(() => {
    fetchLocations().then(setLocations).catch(() => {});
  }, []);

  async function handleSave() {
    if (!position) return;
    setSaving(true);
    try {
      const loc = await saveLocation({ name: name || undefined, lat: position.lat, lon: position.lon, threshold });
      setLocations(prev => [...prev, loc]);
      setName('');
    } catch (e) {
      console.warn('save location failed', e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    await deleteLocation(id).catch(() => {});
    setLocations(prev => prev.filter(l => l.id !== id));
  }

  async function handleThresholdChange(id, t) {
    const updated = await patchThreshold(id, t).catch(() => null);
    if (updated) setLocations(prev => prev.map(l => l.id === id ? { ...l, threshold: t } : l));
  }

  return (
    <div className="panel">
      <div className="panel-title">Alert system</div>

      {/* Active alert banner */}
      {visibilityAlert && (
        <div style={{ marginBottom: 10, padding: '8px 12px', borderLeft: '3px solid var(--success)',
          background: 'rgba(0,230,118,0.08)', borderRadius: '0 4px 4px 0', animation: 'alertSlideIn 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--success)', marginBottom: 2 }}>
                VISIBILITY THRESHOLD MET
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                {visibilityAlert.locationName} — score {visibilityAlert.score} ≥ {visibilityAlert.threshold}
              </div>
            </div>
            <button onClick={onDismissAlert} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 16 }}>×</button>
          </div>
        </div>
      )}

      {/* Add location form */}
      <div style={{ background: 'var(--bg-panel)', borderRadius: 6, padding: '10px 12px', marginBottom: 10 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginBottom: 8, letterSpacing: '0.06em' }}>
          SAVE CURRENT LOCATION
        </div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={position ? `${position.lat.toFixed(2)}°, ${position.lon.toFixed(2)}°` : 'Location name…'}
          style={{ width: '100%', marginBottom: 8, background: 'var(--bg-hover)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '5px 8px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 11 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            Alert when score ≥
          </label>
          <input type="range" min={10} max={95} step={5} value={threshold}
            onChange={e => setThreshold(+e.target.value)}
            style={{ flex: 1, accentColor: 'var(--aurora-green)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            color: threshold >= 70 ? 'var(--success)' : threshold >= 40 ? 'var(--warning)' : 'var(--text-secondary)',
            width: 28, textAlign: 'right' }}>
            {threshold}
          </span>
        </div>
        {currentScore != null && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginBottom: 8 }}>
            Current score here: {Math.round(currentScore)} — alert will fire when ≥ {threshold}
          </div>
        )}
        <button onClick={handleSave} disabled={saving || !position} style={{
          width: '100%', padding: '7px', background: 'rgba(0,230,118,0.1)',
          border: '1px solid var(--aurora-green)', borderRadius: 5,
          color: 'var(--aurora-green)', fontFamily: 'var(--font-mono)', fontSize: 10,
          fontWeight: 700, letterSpacing: '0.06em', cursor: saving || !position ? 'not-allowed' : 'pointer',
        }}>
          {saving ? 'Saving…' : '+ Save Location'}
        </button>
      </div>

      {/* Saved locations */}
      {locations.length === 0 ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
          No saved locations. Add one above.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {locations.map(loc => (
            <div key={loc.id} style={{ background: 'var(--bg-panel)', borderRadius: 6, padding: '8px 10px',
              border: loc.lastScore >= loc.threshold ? '1px solid rgba(0,230,118,0.3)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)' }}>{loc.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>
                    {loc.lat.toFixed(2)}°, {loc.lon.toFixed(2)}°
                    {loc.lastScore != null && ` · last score: ${Math.round(loc.lastScore)}`}
                  </div>
                </div>
                <button onClick={() => handleDelete(loc.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 14 }}>×</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>Alert ≥</span>
                <input type="range" min={10} max={95} step={5} value={loc.threshold}
                  onChange={e => handleThresholdChange(loc.id, +e.target.value)}
                  style={{ flex: 1, accentColor: 'var(--aurora-green)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                  color: loc.threshold >= 70 ? 'var(--success)' : 'var(--warning)', width: 22, textAlign: 'right' }}>
                  {loc.threshold}
                </span>
              </div>
              {loc.lastAlert && (
                <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--success)' }}>
                  Last alert: {new Date(loc.lastAlert).toLocaleTimeString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}