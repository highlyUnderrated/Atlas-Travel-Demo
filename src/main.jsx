import { createRoot } from 'react-dom/client';
import { createLDReactProvider } from '@launchdarkly/react-sdk';
import App from './App';
import SetupScreen from './SetupScreen';
import { DEFAULT_PERSONA } from './data/personas';
import './styles.css';

const root = createRoot(document.getElementById('root'));

// The client-side ID is safe for browser use. Vite injects it at build time from
// .env.local; server-side SDK keys must never be used in this frontend.
const clientSideId = import.meta.env.VITE_LD_CLIENT_SIDE_ID?.trim();

if (!clientSideId || clientSideId === 'your-client-side-id') {
  root.render(<SetupScreen />);
} else {
  // Build the provider only after validating configuration. `withReasons` lets
  // the Live Delivery Console explain why a context received its variation.
  const LDProvider = createLDReactProvider(
    clientSideId,
    DEFAULT_PERSONA.context,
    {
      ldOptions: {
        streaming: true,
        withReasons: true,
        applicationInfo: {
          id: 'atlas-travel-demo',
          version: '1.0.0',
        },
      },
    },
  );

  root.render(
    <LDProvider>
      <App />
    </LDProvider>,
  );
}
