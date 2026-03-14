import { useMemo } from 'react';

function BzGauge({ bz }) {
  if (bz == null) return <span className="metric-value" style={{ color: 'var(--text-dim)' }}>—</span>;

  const norm = Math.min(Math.max((bz + 20) / 40, 0), 1); // –20..+20 nT → 0..1
  const colorClass = bz < -7 ? 'danger' : bz < -3 ? 'warning' : bz > 2 ? 'success' : '';
  const barColor   = bz < -7 ? 'var(--danger)' : bz < -3 ? 'var(--warning)' : bz > 2 ? 'var(--success)' : 'var(--text-dim)';
  const barPct     = `${norm * 100}%`;

  return (
    <div>
      <div className="metric-row">
        <span className="metric-label">IMF Bz</span>
        <span className={`metric-value ${colorClass}`}>
          {bz > 0 ? '+' : ''}{bz.toFixed(1)}<span className="metric-unit">nT</span>
        </span>
      </div>
      <div className="bz-bar-track">
        {/* Center line at 50% */}
        <div style={{ position: 'absolute', left: '50%', top: 0, width: 1, height: '100%', background: 'rgba(255,255,255,0.15)' }} />
        <div className="bz-bar-fill" style={{ width: barPct, background: barColor }} />
      </div>
      {bz < -7 && (
        <div style={{ fontSize: 10, color: 'var(--danger)', fontFamily: 'var(--font-mono)', marginTop: 4, letterSpacing: '0.05em' }}>
          ▼ SUBSTORM CONDITIONS
        </div>
      )}
    </div>
  );
}

function KpBadge({ kp }) {
  if (kp == null) return null;
  const kpFloor = Math.floor(kp);
  let color = '#1565c0';
  if (kpFloor >= 3) color = '#00897b';
  if (kpFloor >= 5) color = '#f9a825';
  if (kpFloor >= 7) color = '#e53935';
  if (kpFloor >= 9) color = '#9c27b0';

  const stormLabel = kpFloor >= 9 ? 'G5 Extreme' : kpFloor >= 8 ? 'G4 Severe' : kpFloor >= 7 ? 'G3 Strong'
    : kpFloor >= 6 ? 'G2 Moderate' : kpFloor >= 5 ? 'G1 Minor' : kpFloor >= 3 ? 'Active' : 'Quiet';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div className="kp-badge" style={{ color, borderColor: color }}>
        {kp.toFixed(1)}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>Kp index</div>
        <div style={{ fontSize: 11, color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{stormLabel}</div>
      </div>
    </div>
  );
}

function KpHistory({ history }) {
  if (!history || history.length === 0) return null;
  const max = 9;
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 28, marginTop: 10 }}>
      {history.map((h, i) => {
        const pct = Math.min(h.kp / max, 1);
        const color = h.kp >= 5 ? 'var(--warning)' : h.kp >= 3 ? 'var(--info)' : 'var(--text-dim)';
        return (
          <div key={i} title={`Kp ${h.kp} at ${h.ts}`}
            style={{ flex: 1, height: `${Math.max(pct * 100, 8)}%`, background: color, borderRadius: 2, opacity: 0.7 + 0.3 * (i / history.length) }} />
        );
      })}
    </div>
  );
}

export default function SolarWindPanel({ solarWind, kp, dataSource, isStale }) {
  const speed = solarWind?.speed;
  const bz    = solarWind?.bz;
  const bt    = solarWind?.bt;

  const speedClass = speed > 600 ? 'danger' : speed > 500 ? 'warning' : speed > 400 ? '' : '';

  return (
    <div className="panel">
      <div className="panel-title">
        Solar wind
        <span style={{ float: 'right', fontWeight: 400, color: isStale ? 'var(--warning)' : 'var(--text-dim)' }}>
          {dataSource} {isStale ? '· STALE' : ''}
        </span>
      </div>

      <BzGauge bz={bz} />

      <div style={{ height: 12 }} />

      <div className="metric-row">
        <span className="metric-label">Speed</span>
        <span className={`metric-value ${speedClass}`}>
          {speed != null ? Math.round(speed) : '—'}<span className="metric-unit">km/s</span>
        </span>
      </div>

      <div className="metric-row">
        <span className="metric-label">|Bt| total field</span>
        <span className="metric-value" style={{ fontSize: 15 }}>
          {bt != null ? bt.toFixed(1) : '—'}<span className="metric-unit">nT</span>
        </span>
      </div>

      <div style={{ height: 12 }} />

      <KpBadge kp={kp?.kp} />
      <KpHistory history={kp?.history} />

      {solarWind?.fetchedAt && (
        <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
          Updated {new Date(solarWind.fetchedAt).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
