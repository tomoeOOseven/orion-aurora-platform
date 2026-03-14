import { useState, useEffect } from 'react';

function timeSince(ts) {
  if (!ts) return '';
  const secs = Math.floor((Date.now() - ts) / 1000);
  if (secs < 60)  return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
}

function AlertBanner({ alert, onDismiss }) {
  const level = alert.level?.toLowerCase();
  return (
    <div className={`alert-banner ${level}`}>
      <div className={`alert-dot ${level}`} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
          SUBSTORM {alert.level}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {alert.message}
        </div>
        <div style={{ marginTop: 4, display: 'flex', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>
            Bz {alert.bz?.toFixed(1)} nT · {alert.speed ? `${Math.round(alert.speed)} km/s` : ''} · {timeSince(alert.receivedAt)}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-dim)' }}>
            Confidence: {alert.confidence}
          </span>
        </div>
      </div>
      <button onClick={onDismiss} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 14, padding: '0 4px', alignSelf: 'flex-start' }}>
        ×
      </button>
    </div>
  );
}

function NoaaAlert({ alert }) {
  const [expanded, setExpanded] = useState(false);
  const isHighPriority = alert.message?.includes('WARNING') || alert.message?.includes('G4') || alert.message?.includes('G5');

  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '8px 0' }}>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}
        onClick={() => setExpanded(v => !v)}
      >
        <div style={{ width: 6, height: 6, borderRadius: 3, background: isHighPriority ? 'var(--danger)' : 'var(--info)', marginTop: 4, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)' }}>
            {alert.product_id || 'NOAA Alert'}
          </div>
          {expanded && (
            <div style={{ marginTop: 4, fontSize: 11, color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {(alert.message || alert.issue_datetime || '').slice(0, 400)}
              {alert.message?.length > 400 && '…'}
            </div>
          )}
        </div>
        <span style={{ color: 'var(--text-dim)', fontSize: 12, flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
      </div>
    </div>
  );
}

export default function SubstormWarning({ substormAlert, noaaAlerts, onDismissSubstorm }) {
  const hasAlerts = noaaAlerts && noaaAlerts.length > 0;

  return (
    <div className="panel">
      <div className="panel-title">
        Alerts
        {hasAlerts && (
          <span style={{ float: 'right', background: 'var(--danger)', color: '#fff', borderRadius: 10, padding: '0 6px', fontSize: 9, fontWeight: 700, letterSpacing: '0.05em' }}>
            {noaaAlerts.length}
          </span>
        )}
      </div>

      {substormAlert && (
        <AlertBanner alert={substormAlert} onDismiss={onDismissSubstorm} />
      )}

      {!substormAlert && !hasAlerts && (
        <div style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', padding: '4px 0' }}>
          No active alerts. Monitoring Bz rate of change…
        </div>
      )}

      {hasAlerts && (
        <div style={{ marginTop: 4 }}>
          {noaaAlerts.slice(0, 5).map((a, i) => (
            <NoaaAlert key={i} alert={a} />
          ))}
        </div>
      )}
    </div>
  );
}
