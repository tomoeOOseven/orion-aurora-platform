import { useEffect, useRef } from 'react';

function ScoreRing({ score, size = 80 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = size/2, cy = size/2, r = size/2 - 6;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, 2*Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 5; ctx.stroke();
    if (score > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI/2, -Math.PI/2 + 2*Math.PI*Math.min(score,100)/100);
      ctx.strokeStyle = score >= 70 ? '#00e676' : score >= 40 ? '#ffab40' : '#ff5252';
      ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.stroke();
    }
    ctx.fillStyle = score >= 70 ? '#00e676' : score >= 40 ? '#ffab40' : '#ff5252';
    ctx.font = `700 ${size*0.28}px 'Space Mono',monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(score != null ? Math.round(score) : '—', cx, cy - 4);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = `400 ${size*0.13}px 'Space Mono',monospace`;
    ctx.fillText('/100', cx, cy + size*0.18);
  }, [score, size]);
  return <canvas ref={ref} style={{ width: size, height: size, flexShrink: 0 }} />;
}

function Bar({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', width: 54, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 4, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(value||0,100)}%`, height: '100%', background: color, borderRadius: 2, transition: 'width 0.7s ease' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', width: 24, textAlign: 'right' }}>
        {value != null ? Math.round(value) : '—'}
      </span>
    </div>
  );
}

const BORTLE_LABELS = ['','Pristine dark','Truly dark','Rural','Rural/suburban','Suburban','Bright suburban','Suburban/urban','City','Inner city'];

function BortleBadge({ bortle, radiance, source }) {
  if (!bortle) return null;
  const isViirs = source?.includes('VIIRS');
  const isFallback = source?.includes('fallback');
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6,
      background: 'var(--bg-panel)', border: '1px solid var(--border)',
      borderRadius: 6, padding: '4px 8px',
    }}
      title={radiance != null ? `VIIRS DNB radiance: ${radiance.toFixed(2)} nW/cm²/sr` : 'Estimated sky darkness'}
    >
      <div style={{ width: 6, height: 6, borderRadius: 3, background: isViirs ? 'var(--aurora-teal)' : 'var(--text-dim)' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)' }}>
        Bortle {bortle} — {BORTLE_LABELS[bortle]}
      </span>
      {isViirs && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--aurora-teal)', letterSpacing: '0.06em' }}>
          VIIRS DNB
        </span>
      )}
      {isFallback && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--warning)', letterSpacing: '0.06em' }}>
          DEFAULT 5 (FETCH FAIL)
        </span>
      )}
    </div>
  );
}

export default function VisibilityScore({ visibility, loadingScore, position }) {
  const score = visibility?.score;
  const comps = visibility?.components;
  const meta  = visibility?.meta;
  const label = score == null ? '—' : score >= 70 ? 'Excellent' : score >= 50 ? 'Good' : score >= 30 ? 'Fair' : 'Poor';

  return (
    <div className="panel">
      <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Visibility score</span>
        {position && (
          <span style={{ fontWeight: 400, color: 'var(--text-dim)', fontSize: 9 }}>
            {position.lat.toFixed(2)}°, {position.lon.toFixed(2)}°
          </span>
        )}
      </div>

      {loadingScore && !visibility ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
          <div className="spinner" />
          <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Computing… (fetching VIIRS sky data)</span>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
            <ScoreRing score={score} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {label}
                {loadingScore && (
                  <span style={{ fontSize: 10, color: 'var(--text-dim)', marginLeft: 8 }}>updating…</span>
                )}
              </div>
              {meta && (
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                  Moon {Math.round((meta.moonIllumination||0)*100)}% · Zenith {Math.round(meta.solarZenith||0)}°
                </div>
              )}
              <BortleBadge bortle={meta?.bortle} radiance={meta?.radiance} source={meta?.bortleSource} />
              {meta?.bortleSource?.includes('fallback') && (
                <div style={{ marginTop: 5, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--warning)' }}>
                  Bortle fetch unavailable, using default Bortle 5 fallback.
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <Bar label="Aurora"    value={comps?.aurora?.value}   color="var(--aurora-purple)" />
            <Bar label="Clear sky" value={comps?.cloud?.value}    color="var(--aurora-teal)" />
            <Bar label="Darkness"  value={comps?.darkness?.value} color="var(--aurora-amber)" />
          </div>

          {comps?.cloud?.cloudCoverPct != null && (
            <div style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>
              Cloud cover: {Math.round(comps.cloud.cloudCoverPct)}%
              {comps.cloud.cloudSource === 'unavailable' && (
                <span style={{ color: 'var(--warning)', marginLeft: 6 }}>⚠ unavailable</span>
              )}
            </div>
          )}

          {meta?.computedAt && (
            <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>
              {new Date(meta.computedAt).toLocaleTimeString()}
            </div>
          )}
        </>
      )}
    </div>
  );
}