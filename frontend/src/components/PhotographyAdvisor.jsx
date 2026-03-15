/**
 * PhotographyAdvisor.jsx
 * Derives camera settings from Kp index, aurora brightness, and visibility score.
 *
 * Model assumptions (based on empirical astrophotography data):
 *   - Kp 0–2: very faint emission → wide aperture, high ISO, long exposure
 *   - Kp 3–4: moderate → f/2.8, ISO 1600, 8–15s
 *   - Kp 5–6: active   → f/2.0, ISO 800–1600, 4–8s (avoid trails)
 *   - Kp 7–9: intense  → shorter exposures to freeze fast-moving curtains
 */

const PRESETS = [
  // [minKp, maxKp, aperture, iso, shutterMin, shutterMax, notes]
  [0, 2, 'f/1.4', 3200, 15, 25, 'Very faint. Use highest ISO your camera tolerates. Focus on a bright star.'],
  [3, 4, 'f/2.0', 1600, 10, 15, 'Moderate activity. Balance exposure time to preserve curtain texture.'],
  [5, 6, 'f/2.0', 1600,  6, 10, 'Active storm. Shorter exposures capture movement in the oval.'],
  [7, 8, 'f/2.8', 800,   3,  6, 'Strong storm. Curtains move fast — keep exposures short.'],
  [9, 9, 'f/2.8', 400,   2,  4, 'Extreme G5 event. 2–4s exposures. Consider burst mode.'],
];

function getPreset(kp) {
  const k = Math.min(Math.max(kp || 0, 0), 9);
  return PRESETS.find(([min, max]) => k >= min && k <= max) || PRESETS[0];
}

function formatShutter(min, max) {
  if (min === max) return `${min}s`;
  return `${min}–${max}s`;
}

function focusTip(bortle) {
  if (bortle <= 2) return 'Use Live View + magnify on Polaris or a bright star to focus.';
  if (bortle <= 4) return 'Manually focus to ∞ and fine-tune on a star before the aurora peaks.';
  return 'Light pollution may make it hard to find focus stars — pre-focus at dusk.';
}

export default function PhotographyAdvisor({ kp, visibility }) {
  const kpVal  = kp?.kp;
  const score  = visibility?.score;
  const bortle = visibility?.meta?.bortle;
  const moon   = visibility?.meta?.moonIllumination;

  if (kpVal == null) {
    return (
      <div className="panel">
        <div className="panel-title">Photography advisor</div>
        <div style={{ color: 'var(--text-dim)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
          Waiting for Kp data…
        </div>
      </div>
    );
  }

  const [, , aperture, iso, shutMin, shutMax, note] = getPreset(kpVal);

  // Moon penalty: full moon → add 1 stop of ISO headroom
  const adjustedISO = moon > 0.7 ? Math.min(iso * 2, 6400) : iso;
  // Darkness penalty: if score < 30, warn user
  const darkWarning = score != null && score < 30;

  return (
    <div className="panel">
      <div className="panel-title">Photography advisor</div>

      <div className="photo-settings">
        <div className="photo-setting-card">
          <div className="photo-setting-key">Aperture</div>
          <div className="photo-setting-val">{aperture}</div>
        </div>
        <div className="photo-setting-card">
          <div className="photo-setting-key">ISO</div>
          <div className="photo-setting-val">{adjustedISO}</div>
        </div>
        <div className="photo-setting-card">
          <div className="photo-setting-key">Shutter</div>
          <div className="photo-setting-val">{formatShutter(shutMin, shutMax)}</div>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        {note}
      </div>

      {bortle && (
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5 }}>
          {focusTip(bortle)}
        </div>
      )}

      {moon > 0.7 && (
        <div style={{ marginTop: 6, fontSize: 10, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
          ☽ High lunar illumination ({Math.round(moon * 100)}%) — ISO adjusted up
        </div>
      )}

      {darkWarning && (
        <div style={{ marginTop: 6, fontSize: 10, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
          ⚠ Low visibility score — cloud or light pollution may obscure aurora
        </div>
      )}

      <div style={{ marginTop: 10, padding: '8px 0', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>White balance</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>3200–4000K or AWB</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>File format</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>RAW preferred</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>Intervalometer</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>Recommended for timelapse</span>
      </div>
    </div>
  );
}
