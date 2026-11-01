import { createRoot } from 'react-dom/client';
import { createLDReactProvider } from '@launchdarkly/react-sdk';
import App from './App';
import SetupScreen from './SetupScreen';
import { DEFAULT_PERSONA } from './data/personas';
import './styles.css';

const root = createRoot(document.getElementById('root'));
const clientSideId = import.meta.env.VITE_LD_CLIENT_SIDE_ID?.trim();

if (!clientSideId || clientSideId === 'your-client-side-id') {
  root.render(<SetupScreen />);
} else {
  const LDProvider = createLDReactProvider(
    clientSideId,
    DEFAULT_PERSONA.context,
    {
      ldOptions: {
        streaming: true,
        evaluationReasons: true,
        application: {
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
