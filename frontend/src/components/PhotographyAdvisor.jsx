/**
 * PhotographyAdvisor.jsx
 *
 * Settings are driven by an EFFECTIVE level that blends two signals:
 *   - Global Kp index        (storm intensity worldwide)
 *   - Local aurora probability from OVATION (intensity at THIS location)
 *
 * Effective level = max(kp, auroraProb mapped to 0-9 scale)
 * This means clicking a high-probability location raises the settings
 * even if global Kp is quiet — and clicking outside the auroral zone
 * drops them even if Kp is elevated.
 */

const PRESETS = [
  // [minLevel, maxLevel, aperture, iso, shutMin, shutMax, note]
  [0, 2, 'f/1.4', 3200, 15, 25, 'Very faint. Use highest ISO your camera tolerates.'],
  [3, 4, 'f/2.0', 1600, 10, 15, 'Moderate. Balance exposure to preserve curtain texture.'],
  [5, 6, 'f/2.0', 1600,  6, 10, 'Active storm. Shorter exposures capture oval movement.'],
  [7, 8, 'f/2.8',  800,  3,  6, 'Strong storm. Curtains move fast — keep exposures short.'],
  [9, 9, 'f/2.8',  400,  2,  4, 'Extreme G5 event. 2–4s bursts. Consider intervalometer.'],
];

function getPreset(level) {
  const l = Math.min(Math.max(Math.round(level), 0), 9);
  return PRESETS.find(([mn, mx]) => l >= mn && l <= mx) || PRESETS[0];
}

// Map aurora probability (0–100) onto Kp-equivalent scale (0–9)
// 0%→0, 30%→2, 50%→4, 70%→6, 90%→8, 100%→9
function auroraToKpEquiv(prob) {
  if (prob == null) return 0;
  return Math.min(9, (prob / 100) * 9);
}

const BORTLE_LABELS = ['','Pristine','Truly dark','Rural','Rural/sub','Suburban','Bright sub','Sub/urban','City','Inner city'];

export default function PhotographyAdvisor({ kp, visibility }) {
  const kpVal      = kp?.kp ?? 0;
  const auroraProb = visibility?.components?.aurora?.value;
  const moon       = visibility?.meta?.moonIllumination ?? 0;
  const bortle     = visibility?.meta?.bortle;
  const bortleSource = visibility?.meta?.bortleSource;

  // Effective level: take the higher of global Kp and local aurora signal
  const localLevel   = auroraToKpEquiv(auroraProb);
  const effectiveLevel = Math.max(kpVal, localLevel);
  const driverLabel  = localLevel > kpVal ? 'local aurora' : 'Kp index';

  const [, , aperture, isoBase, shutMin, shutMax, note] = getPreset(effectiveLevel);

  // Moon penalty on ISO
  let iso = isoBase;
  let moonNote = null;
  if (moon > 0.7) {
    iso = Math.min(iso * 2, 6400);
    moonNote = `Moon ${Math.round(moon * 100)}% lit — ISO +1 stop`;
  }

  const outsideZone = auroraProb != null && auroraProb < 5;

  let focusTip = null;
  if (bortle != null) {
    if (bortle <= 2)      focusTip = 'Magnify on Polaris in Live View to set focus.';
    else if (bortle <= 4) focusTip = 'Pre-focus manually on a bright star before peak.';
    else                  focusTip = 'Light pollution makes focus stars hard — pre-focus at dusk.';
  }

  if (kp?.kp == null) {
    return (
      <div className="panel">
        <div className="panel-title">Photography advisor</div>
        <div style={{ color: 'var(--text-dim)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>Waiting for Kp data…</div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Photography advisor</span>
        <span style={{ fontWeight: 400, fontSize: 9, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          driven by {driverLabel}
        </span>
      </div>

      {outsideZone && (
        <div style={{ marginBottom: 8, padding: '5px 10px', borderLeft: '2px solid var(--warning)',
          background: 'rgba(255,171,64,0.06)', fontSize: 11, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
          Outside auroral zone — move north
        </div>
      )}

      {/* Level indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--bg-hover)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            width: `${(effectiveLevel / 9) * 100}%`, height: '100%', borderRadius: 2,
            background: effectiveLevel >= 7 ? 'var(--danger)' : effectiveLevel >= 5 ? 'var(--warning)' : effectiveLevel >= 3 ? 'var(--info)' : 'var(--text-dim)',
            transition: 'width 0.6s ease, background 0.4s',
          }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          level {effectiveLevel.toFixed(1)} / 9
        </span>
      </div>

      <div className="photo-settings">
        <div className="photo-setting-card">
          <div className="photo-setting-key">Aperture</div>
          <div className="photo-setting-val">{aperture}</div>
        </div>
        <div className="photo-setting-card">
          <div className="photo-setting-key">ISO</div>
          <div className="photo-setting-val" style={{ color: iso > isoBase ? 'var(--warning)' : 'var(--aurora-teal)' }}>
            {iso}
          </div>
        </div>
        <div className="photo-setting-card">
          <div className="photo-setting-key">Shutter</div>
          <div className="photo-setting-val">{shutMin === shutMax ? `${shutMin}s` : `${shutMin}–${shutMax}s`}</div>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{note}</div>

      {moonNote && (
        <div style={{ marginTop: 5, fontSize: 10, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
          ⚠ {moonNote}
        </div>
      )}

      {focusTip && (
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5 }}>
          {focusTip}
          {bortleSource?.includes('VIIRS') && bortle && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--aurora-teal)', marginLeft: 6 }}>
              Bortle {bortle} · VIIRS
            </span>
          )}
        </div>
      )}

      <div style={{ marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {[['White balance','3200–4000K or AWB'],['File format','RAW preferred'],['Intervalometer','Recommended for timelapse']].map(([k,v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>{k}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}