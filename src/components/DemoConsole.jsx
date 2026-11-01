import { CopyIcon, ShieldIcon, SignalIcon } from '../icons';

// Keep the real trigger URL out of source control and the browser bundle.
const INCIDENT_COMMAND = "curl -X POST 'PASTE_THE_COMPLETE_TRIGGER_URL_HERE'";

export default function DemoConsole({
  persona,
  flagEnabled,
  status,
  evaluationReason,
  lastChange,
  eventMessage,
  onCopy,
}) {
  const statusLabel = status === 'complete' ? 'Stream ready' : status === 'failed' ? 'Connection issue' : 'Connecting';
  const reasonLabel = evaluationReason || 'Waiting for evaluation';

  return (
    <aside className="demo-console" aria-labelledby="console-title">
      <div className="demo-console__header">
        <div>
          <span className="eyebrow eyebrow--console">Live delivery console</span>
          <h2 id="console-title">What LaunchDarkly is deciding</h2>
        </div>
        <div className={`connection-pill connection-pill--${status}`}>
          <span />
          {statusLabel}
        </div>
      </div>

      <div className="console-grid">
        <section className="console-card">
          <div className="console-card__icon"><SignalIcon /></div>
          <span>Flag evaluation</span>
          <strong className={flagEnabled ? 'value-on' : 'value-off'}>
            {flagEnabled ? 'TRUE · Smart Deals' : 'FALSE · Classic'}
          </strong>
          <small>{reasonLabel}</small>
        </section>

        <section className="console-card">
          <div className="console-card__icon"><ShieldIcon /></div>
          <span>Evaluation context</span>
          <strong>{persona.context.key}</strong>
          <small>{persona.context.user_tier} · {persona.context.region}</small>
        </section>

        <section className="console-card console-card--activity">
          <span>Latest activity</span>
          <strong>{eventMessage || 'Listening for changes'}</strong>
          <small>{lastChange || 'No live configuration changes received yet'}</small>
        </section>
      </div>

      <div className="incident-strip">
        <div>
          <span className="incident-strip__dot" />
          <p><strong>Incident remediation</strong><br />Invoke the environment-specific trigger from your terminal.</p>
        </div>
        <button type="button" className="command-copy" onClick={() => onCopy(INCIDENT_COMMAND)}>
          <code>{INCIDENT_COMMAND}</code>
          <CopyIcon />
          <span className="sr-only">Copy rollback command</span>
        </button>
      </div>
    </aside>
  );
}
