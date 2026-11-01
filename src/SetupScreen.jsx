import { CompassIcon } from './icons';

export default function SetupScreen() {
  return (
    <main className="setup-screen">
      <section className="setup-card">
        <div className="brand-mark"><CompassIcon size={26} /></div>
        <span className="eyebrow">One final connection</span>
        <h1>Atlas Travel is ready.<br />Add your LaunchDarkly client-side ID.</h1>
        <p>
          Copy <code>.env.example</code> to <code>.env.local</code>, replace the placeholder, and restart the development server.
        </p>
        <pre><code>VITE_LD_CLIENT_SIDE_ID=your-client-side-id</code></pre>
        <p className="setup-card__note">
          Use the client-side ID for your LaunchDarkly environment — never a server-side SDK key.
        </p>
      </section>
    </main>
  );
}
