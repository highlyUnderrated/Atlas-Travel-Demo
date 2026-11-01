# LaunchDarkly setup

This guide recreates every LaunchDarkly resource used by Atlas Travel. The application uses a browser client-side ID. Never place a server-side SDK key or API access token in this frontend.

## Resource summary

| Resource | Value |
| --- | --- |
| Flag name | Smart Deals Panel |
| Flag key | `smart-deals-panel` |
| Flag type | Boolean |
| `true` variation | Smart Deals personalized experience |
| `false` variation | Classic destinations experience |
| Off variation | `false` |
| SDK fallback | `false` |
| Experiment event key | `smart-deal-cta-clicked` |
| Individual target | user key `qa-priya` → `true` |
| Attribute rule | `user_tier` is one of `Premium` → `true` |
| Default rule | `false` |

## 1. Create or select a project and environment

Use a dedicated project such as **Atlas Travel Demo** and the default Test environment. All configuration described below must be created in the same environment whose client-side ID you use locally.

## 2. Copy the client-side ID

1. Open **Organization settings**.
2. Select **SDK keys**.
3. Select the Atlas Travel project and Test environment.
4. Copy the **Client-side ID** — not the server-side SDK key.
5. Create `.env.local` in the repository:

```bash
cp .env.example .env.local
```

6. Replace the placeholder:

```text
VITE_LD_CLIENT_SIDE_ID=your-real-client-side-id
```

Restart `npm run dev` whenever this file changes.

## 3. Create the feature flag

1. Open the Atlas Travel project and Test environment.
2. Select **Create → Flag**.
3. Use the name **Smart Deals Panel**.
4. Confirm the key is exactly `smart-deals-panel`.
5. Choose a Boolean flag.
6. Keep the variations as `true` and `false`.
7. Set the off variation to `false`.
8. Make the flag available to SDKs using a **Client-side ID**.
9. Create the flag.

If client-side availability is disabled, the browser SDK returns the safe fallback (`false`) even when targeting is on.

## 4. Required Part 1 — release and rollback

Configure the flag for the first demonstration:

1. Set the default rule to `true`.
2. Initially leave targeting **Off**. Atlas Travel displays the classic destination cards.
3. Turn targeting **On** and save. The Smart Deals panel appears without a page refresh.
4. Turn targeting **Off** and save. The classic experience returns without a redeploy.

The application explicitly enables streaming and attaches an SDK change listener. The Live Delivery Console records the incoming change.

## 5. Required Part 1 — incident remediation trigger

1. Open the flag.
2. Open the overflow menu for the Test environment.
3. Select **Configuration in environment**.
4. In **Triggers**, add a trigger.
5. Choose **Generic trigger**.
6. Choose the action that turns flag targeting **Off**.
7. Save, then immediately copy the unique trigger URL. LaunchDarkly only displays it once.
8. Store it only in your local shell session:

```bash
export LD_ROLLBACK_TRIGGER_URL='paste-trigger-url-here'
```

9. With the flag on, invoke the simulated incident response:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  --data '{"eventName":"Smart Deals error threshold exceeded"}' \
  "$LD_ROLLBACK_TRIGGER_URL"
```

The trigger turns targeting off. The application receives the change over its streaming connection and immediately returns to the classic experience.

Do not commit the trigger URL. Treat it like a credential.

## 6. Required Part 2 — targeted relaunch

After the remediation demonstration, turn targeting on and configure:

### Individual target

- Context kind: `user`
- Context key: `qa-priya`
- Variation: `true`

### Attribute rule

- Context kind: `user`
- Attribute: `user_tier`
- Operator: `is one of`
- Value: `Premium`
- Variation: `true`

### Default rule

- Serve `false`

Save the targeting changes and use the in-app audience selector:

| Persona | Why the variation is served | Expected result |
| --- | --- | --- |
| Priya | Individual key `qa-priya` | Smart Deals |
| Kenji | `user_tier = Premium` | Smart Deals |
| Taylor | Matches neither target nor rule | Classic experience |

The flag must be on for its individual targets, rules, and default rule to be evaluated. If targeting is off, everyone receives the off variation (`false`).

## 7. Optional extra credit — Experimentation

The application sends a custom event when the Smart Deals CTA is selected:

```text
smart-deal-cta-clicked
```

Recommended sequence:

1. Complete the required targeting demonstration first.
2. Create a custom binary conversion metric using event key `smart-deal-cta-clicked`.
3. Create an experiment using `smart-deals-panel`.
4. Use the Premium targeting rule as the experiment audience.
5. Set `false` as the control and `true` as the treatment.
6. Allocate the rule’s audience across both variations.
7. Start the iteration.
8. Select Kenji in Atlas Travel and click **Explore this deal**.
9. Confirm that the evaluation and custom event appear in LaunchDarkly.

The exercise does not require a statistically conclusive result. The goal is to demonstrate correct metric instrumentation and experiment setup.

## 8. Final verification

- Flag key is exactly `smart-deals-panel`.
- Flag is available to client-side SDKs.
- `.env.local` contains the Test environment’s client-side ID.
- Taylor receives `false` through the default rule.
- Priya receives `true` through individual targeting.
- Kenji receives `true` through the Premium rule.
- Dashboard changes update the page without refresh.
- Generic trigger turns targeting off.
- Trigger URL and SDK secrets are absent from Git.
- The custom event key is exactly `smart-deal-cta-clicked`.
