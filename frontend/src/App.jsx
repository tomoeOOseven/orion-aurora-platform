import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './index.css';
import { useSpaceWeather } from './hooks/useSpaceWeather';
import { useVisibility }   from './hooks/useVisibility';
import { useSightings, useSightingPins, SightingForm } from './components/SightingLayer';
import SolarWindPanel     from './components/SolarWindPanel';
import VisibilityScore    from './components/VisibilityScore';
import SubstormWarning    from './components/SubstormWarning';
import PhotographyAdvisor from './components/PhotographyAdvisor';
import RoutingPanel       from './components/RoutingPanel';
import AlertSettings      from './components/AlertSettings';

const AuroraMap = lazy(() => import('./components/AuroraMap'));

function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const on  = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  if (!offline) return null;
  return <div className="offline-banner">OFFLINE — showing cached data</div>;
}

// Simple tab bar for sidebar sections
const TABS = ['data', 'alerts', 'sightings'];
const TAB_LABELS = { data: 'Live Data', alerts: 'Alerts', sightings: 'Community' };

export default function App() {
  const {
    solarWind, kp, ovation, alerts, substormAlert,
    loading, isStale, dataSource, refreshOvation,
  } = useSpaceWeather();

  const { position, setPosition, visibility, geoError, loadingScore, refetch: refetchScore } = useVisibility();

  const [nightVision,       setNightVision]       = useState(false);
  const [activeSubstorm,    setActiveSubstorm]     = useState(null);
  const [dismissedTs,       setDismissedTs]        = useState(null);
  const [routeGeometry,     setRouteGeometry]      = useState(null);
  const [activeTab,         setActiveTab]          = useState('data');
  const [sightingPos,       setSightingPos]        = useState(null); // right-click position for form
  const [visibilityAlert,   setVisibilityAlert]    = useState(null);
  const mapInstanceRef = useRef(null); // shared map instance ref for sighting pins

  // SSE event source ref for sightings
  const [esRef, setEsRef] = useState(null);
  useEffect(() => {
    const es = new EventSource('/api/stream');
    setEsRef(es);
    // Visibility alerts from SSE
    es.addEventListener('visibility_alert', e => {
      try { setVisibilityAlert(JSON.parse(e.data)); } catch {}
    });
    return () => es.close();
  }, []);

  // Sightings (fetched + SSE-updated)
  const { sightings, addSighting } = useSightings(esRef);

  // Render sighting pins on the map imperatively
  useSightingPins(mapInstanceRef.current, sightings);

  // OVATION update → refresh score
  useEffect(() => { if (ovation) refetchScore(); }, [ovation]); // eslint-disable-line

  // Substorm
  useEffect(() => {
    if (substormAlert && substormAlert.receivedAt !== dismissedTs) {
      setActiveSubstorm(substormAlert);
      if (navigator.vibrate && substormAlert.level === 'SEVERE') navigator.vibrate([200,100,200]);
    }
  }, [substormAlert, dismissedTs]);

  const statusColor = loading ? 'var(--warning)' : isStale ? 'var(--warning)' : 'var(--success)';

  return (
    <div className={`app-shell${nightVision ? ' night-vision' : ''}`}>
      <OfflineBanner />

      {/* Sighting form modal */}
      {sightingPos && (
        <SightingForm
          position={sightingPos}
          kp={kp?.kp}
          score={visibility?.score}
          onSubmit={() => {}}
          onClose={() => setSightingPos(null)}
        />
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="logo">✦ ORION</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          AURORA PLATFORM
        </div>
        {ovation?.forecastTime && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
            OVATION {new Date(ovation.forecastTime).toLocaleTimeString()}
          </div>
        )}
        <div className="header-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="status-dot" style={{ background: statusColor }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
              {loading ? 'LOADING' : isStale ? 'STALE' : 'LIVE'}
            </span>
          </div>
          {sightings.length > 0 && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--aurora-teal)' }}
              title="Community sightings on map">
              {sightings.length} sightings
            </div>
          )}
          <button className={`icon-btn ${nightVision ? 'active' : ''}`}
            onClick={() => setNightVision(v => !v)}
            title="Night-vision mode: red-only filter preserves dark-adapted vision">
            ☽ NIGHT
          </button>
        </div>
      </header>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="sidebar">
        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-space)' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '8px 4px', background: 'none',
              border: 'none', borderBottom: activeTab === tab ? '2px solid var(--aurora-green)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--aurora-green)' : 'var(--text-dim)',
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {activeTab === 'data' && (
          <>
            <SubstormWarning substormAlert={activeSubstorm} noaaAlerts={alerts}
              onDismissSubstorm={() => { setDismissedTs(activeSubstorm?.receivedAt); setActiveSubstorm(null); }} />
            <SolarWindPanel solarWind={solarWind} kp={kp} dataSource={dataSource} isStale={isStale} />
            <VisibilityScore visibility={visibility} loadingScore={loadingScore} position={position} />
            <PhotographyAdvisor kp={kp} visibility={visibility} />
            <RoutingPanel position={position} onRouteFound={geo => setRouteGeometry(geo)} />
          </>
        )}

        {activeTab === 'alerts' && (
          <AlertSettings
            position={position}
            currentScore={visibility?.score}
            visibilityAlert={visibilityAlert}
            onDismissAlert={() => setVisibilityAlert(null)}
          />
        )}

        {activeTab === 'sightings' && (
          <div className="panel">
            <div className="panel-title">Community sightings</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginBottom: 10 }}>
              Right-click anywhere on the map to report a sighting. Pins appear live for all users.
            </div>
            {sightings.length === 0 ? (
              <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>No sightings yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[...sightings].reverse().slice(0, 20).map(s => (
                  <div key={s.id} style={{ background: 'var(--bg-panel)', borderRadius: 6, padding: '8px 10px',
                    borderLeft: '2px solid var(--aurora-teal)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--aurora-teal)' }}>
                        {s.username}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>
                        {new Date(s.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                      {s.lat.toFixed(2)}°, {s.lon.toFixed(2)}°
                      {s.kp != null && ` · Kp ${s.kp.toFixed(1)}`}
                    </div>
                    {s.description && (
                      <div style={{ marginTop: 4, fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {s.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </aside>

      {/* ── Map ─────────────────────────────────────────────────────────── */}
      <main className="map-area">
        <Suspense fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <div className="spinner" />
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: 12 }}>Loading map…</span>
          </div>
        }>
          <AuroraMap
            ovation={ovation}
            position={position}
            onMapClick={setPosition}
            onRightClick={setSightingPos}
            routeGeometry={routeGeometry}
            mapRef={mapInstanceRef}
          />
        </Suspense>

        {/* Right-click hint */}
        <div style={{
          position: 'absolute', bottom: 52, left: 16, zIndex: 500, pointerEvents: 'none',
          background: 'rgba(5,8,16,0.75)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 5, padding: '3px 10px',
          fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)',
        }}>
          Left-click: set location · Right-click: report sighting
        </div>
      </main>
    </div>
  );
}