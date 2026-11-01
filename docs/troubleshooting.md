# Troubleshooting

## The setup screen is still visible

- Confirm `.env.local` exists in the repository root.
- Confirm it contains `VITE_LD_CLIENT_SIDE_ID=...`.
- Restart `npm run dev` after editing environment variables.
- Do not add quotes unless they are part of the actual value.

## The flag always evaluates to false

- Confirm the flag key is exactly `smart-deals-panel`.
- Confirm the flag is available to client-side SDKs.
- Confirm the client-side ID and flag belong to the same LaunchDarkly project and environment.
- Confirm targeting is on when testing targets and rules.

## Priya or Kenji receives the wrong variation

- Priya’s key must be exactly `qa-priya`.
- The rule attribute must be exactly `user_tier`.
- The Premium value is case-sensitive: `Premium`.
- Individual targeting is evaluated before custom rules.
- Ensure the default rule serves `false`.

## Changes appear only after refreshing

- Check for browser extensions or network policies blocking LaunchDarkly streaming connections.
- Confirm `streaming: true` remains enabled in `src/main.jsx`.
- Confirm the typed variation detail hook still evaluates `smart-deals-panel`.
- Inspect the browser console for SDK connection errors.

## Experiment events do not arrive

- Disable browser “Do Not Track” for the demonstration.
- Temporarily disable ad blockers for localhost.
- Confirm the metric’s event key is exactly `smart-deal-cta-clicked`.
- Confirm an experiment iteration is running.
- Confirm the selected context is included in the experiment audience.

## The generic trigger does not work

- Confirm the trigger belongs to the same flag and environment as the application.
- Confirm the trigger is enabled.
- Confirm it was created with the action “turn targeting off.”
- If the URL was lost or exposed, delete and recreate the trigger, then paste the new URL into the `curl` command.
- Never add the trigger URL to application code, a committed environment file, or a variable prefixed with `VITE_`.
