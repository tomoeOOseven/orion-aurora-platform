import { useState } from 'react';
import { getBestSpot } from '../services/api';

export default function RoutingPanel({ position, onRouteFound }) {
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);
  const [mode,    setMode]    = useState('test');
  const [radiusKm, setRadiusKm] = useState(20000);

  async function handleSearch() {
    if (!position) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const data = await getBestSpot(position.lat, position.lon, radiusKm, mode);
      setResult(data);
      if (data.found) {
        onRouteFound?.({
          geometry: data.route?.geometry || null,
          destination: data.destination
            ? { lat: data.destination.lat, lon: data.destination.lon }
            : null,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <div className="panel-title">GPS dark sky routing</div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.06em' }}>ROUTING MODE</span>
        <button
          onClick={() => setMode(m => (m === 'test' ? 'strict' : 'test'))}
          disabled={loading}
          style={{
            padding: '4px 10px',
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: mode === 'test' ? 'rgba(0,188,212,0.12)' : 'rgba(0,230,118,0.12)',
            color: mode === 'test' ? 'var(--info)' : 'var(--aurora-green)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.05em',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          title="Toggle between easy test routing and strict production routing"
        >
          {mode === 'test' ? 'TEST (EASY)' : 'STRICT'}
        </button>
      </div>

      <div style={{ background: 'var(--bg-panel)', borderRadius: 6, padding: '8px 10px', marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
            SEARCH RADIUS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>
            {radiusKm} km
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={20037}
          step={50}
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          disabled={loading}
          style={{ width: '100%', accentColor: 'var(--aurora-teal)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>50 km</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>Global (20037 km)</span>
        </div>
      </div>

      <div style={{ background: 'var(--bg-panel)', borderRadius: 6, padding: '8px 10px', marginBottom: 10, fontSize: 10, fontFamily: 'var(--font-mono)', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        <div style={{ color: 'var(--text-dim)', marginBottom: 4, letterSpacing: '0.06em' }}>SEARCH CRITERIA</div>
        {mode === 'test' ? (
          <>
            <div>Aurora probability ≥ 0% (test)</div>
            <div>Cloud cover ≤ 100% (test)</div>
            <div>Bortle class ≤ 9 (test)</div>
            <div style={{ marginTop: 4, color: 'var(--text-dim)' }}>Nearest-match routing validation mode</div>
          </>
        ) : (
          <>
            <div>Aurora probability ≥ 50%</div>
            <div>Cloud cover ≤ 30%</div>
            <div>Bortle class ≤ 3</div>
            <div style={{ marginTop: 4, color: 'var(--text-dim)' }}>Production routing constraints</div>
          </>
        )}
      </div>

      <button onClick={handleSearch} disabled={loading || !position} style={{
        width: '100%', padding: '9px',
        background: loading ? 'var(--bg-hover)' : 'rgba(0,230,118,0.1)',
        border: '1px solid var(--aurora-green)', borderRadius: 6,
        color: loading ? 'var(--text-dim)' : 'var(--aurora-green)',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        cursor: loading || !position ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.15s',
      }}>
        {loading && <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />}
        {loading ? 'Scanning globe…' : '⟐ Find Best Viewing Spot'}
      </button>

      {!position && (
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          Waiting for GPS location…
        </div>
      )}

      {error && (
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--danger)', fontFamily: 'var(--font-mono)' }}>{error}</div>
      )}

      {result && !result.found && (
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--warning)', lineHeight: 1.6 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginBottom: 4 }}>NO MATCH FOUND</div>
          {result.reason}
          <div style={{ marginTop: 6, fontSize: 10, color: 'var(--text-dim)' }}>
            Wait for the next OVATION update (~30 min) and try again.
          </div>
        </div>
      )}

      {result?.found && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)', marginBottom: 6 }}>
            Search radius used: {result.searchedRadiusKm} km
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(0,230,118,0.12)', color: 'var(--success)', border: '1px solid rgba(0,230,118,0.3)' }}>
              Aurora {Math.round(result.destination.criteria.auroraPct)}%
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(0,188,212,0.12)', color: 'var(--info)', border: '1px solid rgba(0,188,212,0.3)' }}>
              Cloud {Math.round(result.destination.criteria.cloudPct)}%
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(124,77,255,0.12)', color: 'var(--aurora-purple)', border: '1px solid rgba(124,77,255,0.3)' }}>
              Bortle {result.destination.criteria.bortle}
            </span>
          </div>

          <div style={{ background: 'var(--bg-panel)', borderRadius: 6, padding: '10px 12px', marginBottom: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.06em' }}>DESTINATION</div>
            <div className="metric-row">
              <span className="metric-label">Score</span>
              <span className="metric-value success">{result.destination.score}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Coords</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
                {result.destination.lat.toFixed(3)}°, {result.destination.lon.toFixed(3)}°
              </span>
            </div>
            {typeof result.destination.distanceKm === 'number' && (
              <div className="metric-row">
                <span className="metric-label">Nearest match</span>
                <span className="metric-value" style={{ fontSize: 14 }}>{result.destination.distanceKm} km</span>
              </div>
            )}
          </div>

          {result.route ? (
            <div style={{ background: 'var(--bg-panel)', borderRadius: 6, padding: '10px 12px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.06em' }}>DRIVING ROUTE</div>
              <div className="metric-row">
                <span className="metric-label">Distance</span>
                <span className="metric-value" style={{ fontSize: 16 }}>{result.route.distanceKm} km</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Drive time</span>
                <span className="metric-value" style={{ fontSize: 16 }}>{result.route.durationMin} min</span>
              </div>
              {result.route.steps?.filter(s => s.instruction).slice(0, 4).map((s, i) => (
                <div key={i} style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: 4, paddingLeft: 8, borderLeft: '2px solid var(--border)' }}>
                  {s.instruction} ({s.distanceM}m)
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
              Route unavailable (OSRM timeout) — destination shown on map
            </div>
          )}
        </div>
      )}
    </div>
  );
}