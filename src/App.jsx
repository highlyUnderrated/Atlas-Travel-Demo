import { useEffect, useMemo, useState } from 'react';
import {
  useBoolVariationDetail,
  useInitializationStatus,
  useLDClient,
} from '@launchdarkly/react-sdk';
import ClassicExperience from './components/ClassicExperience';
import DemoConsole from './components/DemoConsole';
import PersonaSwitcher from './components/PersonaSwitcher';
import SmartDealsExperience from './components/SmartDealsExperience';
import { DEFAULT_PERSONA, PERSONAS } from './data/personas';
import { ArrowIcon, CompassIcon, PlaneIcon } from './icons';

// These keys are the contracts between the application and LaunchDarkly.
// They must match the flag and custom metric configured in the Test environment.
export const FLAG_KEY = 'smart-deals-panel';
export const EXPERIMENT_EVENT_KEY = 'smart-deal-cta-clicked';

function formatTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

function getReasonLabel(reason) {
  if (!reason?.kind) return 'Fallback while evaluation completes';

  const labels = {
    TARGET_MATCH: 'Individual target matched',
    RULE_MATCH: 'Attribute rule matched',
    FALLTHROUGH: 'Default rule applied',
    OFF: 'Targeting is off',
    ERROR: `Fallback used · ${reason.errorKind || 'evaluation error'}`,
  };

  return labels[reason.kind] || reason.kind.replaceAll('_', ' ').toLowerCase();
}

export default function App() {
  const ldClient = useLDClient();
  const { status, error } = useInitializationStatus();

  // `false` is intentionally both the SDK fallback and the flag's off variation,
  // so a connection or configuration problem always preserves the Classic UI.
  const detail = useBoolVariationDetail(FLAG_KEY, false);
  const [activePersona, setActivePersona] = useState(DEFAULT_PERSONA);
  const [isSwitching, setIsSwitching] = useState(false);
  const [lastChange, setLastChange] = useState('');
  const [activityMessage, setActivityMessage] = useState('Listening for changes');
  const [toast, setToast] = useState('');

  const flagEnabled = Boolean(detail?.value);
  const evaluationReason = useMemo(() => getReasonLabel(detail?.reason), [detail?.reason]);

  useEffect(() => {
    if (!ldClient) return undefined;

    // The typed variation hook already re-renders on flag changes. This explicit
    // listener exists to make streaming updates visible in the demo console.
    const handleChange = () => {
      setLastChange(`${formatTimestamp()} · Streaming update received`);
      setActivityMessage('LaunchDarkly configuration changed');
      setToast('Live configuration update received');
    };

    ldClient.on(`change:${FLAG_KEY}`, handleChange);
    return () => ldClient.off(`change:${FLAG_KEY}`, handleChange);
  }, [ldClient]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function handlePersonaChange(persona) {
    if (!ldClient || persona.id === activePersona.id) return;

    setIsSwitching(true);
    setActivityMessage(`Evaluating context ${persona.context.key}`);
    try {
      // identify() replaces the active user context and waits for LaunchDarkly to
      // return the flag values for that context before updating the selected persona.
      await ldClient.identify(persona.context);
      setActivePersona(persona);
      setLastChange(`${formatTimestamp()} · Context identified`);
      setActivityMessage(`Context switched to ${persona.label}`);
      setToast(`Now evaluating as ${persona.context.name}`);
    } catch (identifyError) {
      setActivityMessage('Context switch failed');
      setToast('Unable to switch context — check the browser console');
      console.error('LaunchDarkly identify failed:', identifyError);
    } finally {
      setIsSwitching(false);
    }
  }

  function handleDealClick() {
    // This custom event key is also used by the optional binary conversion metric.
    ldClient?.track(EXPERIMENT_EVENT_KEY, {
      destination: 'tokyo-hakone',
      placement: 'smart-deals-panel',
      userTier: activePersona.context.user_tier,
    });
    setLastChange(`${formatTimestamp()} · Custom event queued`);
    setActivityMessage(`Tracked “${EXPERIMENT_EVENT_KEY}”`);
    setToast('Deal interest tracked for the experiment');
  }

  async function handleCopy(command) {
    try {
      await navigator.clipboard.writeText(command);
      setToast('Rollback command copied');
    } catch {
      setToast('Copy unavailable — select the command manually');
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Atlas Travel home">
          <span className="brand-mark"><CompassIcon size={24} /></span>
          <span>Atlas<span>Travel</span></span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#experience">Curated trips</a>
          <a href="#console">Live delivery</a>
        </nav>

        <button className="header-cta" type="button">
          Plan a journey <ArrowIcon size={16} />
        </button>
      </header>

      <main id="top">
        <section className="hero" id="discover">
          <div className="hero__content">
            <span className="eyebrow eyebrow--hero"><span /> Independent journeys across APJ</span>
            <h1>Go further.<br /><em>Feel closer.</em></h1>
            <p>
              Thoughtful journeys for curious people — shaped around local detail, quieter moments, and the freedom to travel your way.
            </p>

            <form className="search-card" onSubmit={(event) => event.preventDefault()}>
              <label>
                <span>Where to?</span>
                <input aria-label="Destination" defaultValue="Tokyo, Japan" />
              </label>
              <label>
                <span>When?</span>
                <input aria-label="Travel dates" defaultValue="Oct 12 — Oct 19" />
              </label>
              <button type="submit" aria-label="Search trips"><ArrowIcon /></button>
            </form>

            <div className="trust-row" aria-label="Atlas Travel service highlights">
              <span><i>4.9</i> traveller rating</span>
              <span><i>24/7</i> local support</span>
              <span><i>100%</i> flexible planning</span>
            </div>
          </div>

          <div className="hero__visual" aria-label="Featured journey from Mumbai to Tokyo">
            <div className="hero-card">
              <span className="hero-card__edition">THE AUTUMN EDIT</span>
              <div className="hero-card__sun" />
              <div className="hero-card__arch hero-card__arch--one" />
              <div className="hero-card__arch hero-card__arch--two" />
              <div className="hero-card__copy">
                <span>35.6762° N</span>
                <h2>Tokyo<br />after dark.</h2>
                <p>Food alleys, listening bars, and the last train home.</p>
              </div>
              <div className="hero-card__route"><span>BOM</span><i /><PlaneIcon /><i /><span>NRT</span></div>
            </div>
            <div className="floating-note floating-note--top"><span>New route</span><strong>Direct to Narita</strong></div>
            <div className="floating-note floating-note--bottom"><span>Selected stay</span><strong>Shibuya, 7 nights</strong></div>
          </div>
        </section>

        <section className="audience-panel" aria-label="LaunchDarkly context controls">
          <div className="audience-panel__intro">
            <span className="audience-panel__number">01</span>
            <div>
              <span className="eyebrow">Audience preview</span>
              <p>Change the evaluation context and watch the experience respond.</p>
            </div>
          </div>
          <PersonaSwitcher
            personas={PERSONAS}
            activePersona={activePersona}
            isSwitching={isSwitching}
            onSelect={handlePersonaChange}
          />
        </section>

        <div id="experience" className={`experience-transition ${flagEnabled ? 'experience-transition--smart' : ''}`}>
          {flagEnabled ? (
            <SmartDealsExperience persona={activePersona} onDealClick={handleDealClick} />
          ) : (
            <ClassicExperience />
          )}
        </div>

        <section id="console" className="console-section">
          <div className="console-section__copy">
            <span className="eyebrow">Release with confidence</span>
            <h2>One deployment.<br />A safer way to release.</h2>
            <p>
              The application already contains both experiences. LaunchDarkly decides who sees which one — without a rebuild, redeploy, or page refresh.
            </p>
          </div>
          <DemoConsole
            persona={activePersona}
            flagEnabled={flagEnabled}
            status={status}
            evaluationReason={status === 'failed' ? error?.message : evaluationReason}
            lastChange={lastChange}
            eventMessage={activityMessage}
            onCopy={handleCopy}
          />
        </section>
      </main>

      <footer>
        <a className="brand brand--footer" href="#top"><span className="brand-mark"><CompassIcon size={20} /></span> AtlasTravel</a>
        <p>Illustrative customer demo · Built for the LaunchDarkly SE technical exercise</p>
        <span>Flag: <code>{FLAG_KEY}</code></span>
      </footer>

      {toast && (
        <div className="toast" role="status">
          <span />
          {toast}
        </div>
      )}
    </div>
  );
}
