# Seven-minute demonstration script

## 1. Frame the customer problem — 45 seconds

“Atlas Travel operates a high-traffic APJ landing page. The team wants to ship a personalized Smart Deals panel, but a homepage regression would affect every visitor. We already deployed both code paths. LaunchDarkly controls the release independently.”

## 2. Show the safe starting point — 30 seconds

- Taylor is the active Standard customer.
- Targeting is off.
- The classic destination experience is visible.
- Point out the SDK fallback and off variation are both `false`.

## 3. Release live — 45 seconds

- Turn targeting on with the default rule serving `true`.
- Do not refresh the browser.
- The Smart Deals panel appears.
- Point out the live update toast and console activity.

## 4. Remediate an incident — 60 seconds

- Explain that monitoring detected an elevated error rate.
- Invoke the generic trigger from the terminal.
- The trigger turns targeting off.
- The classic experience returns immediately.
- Emphasize: no code change, build, deployment, or page refresh.

## 5. Relaunch to a controlled audience — 90 seconds

- Turn targeting on with individual and Premium rules configured.
- Taylor receives the classic experience through the default rule.
- Switch to Priya. She receives Smart Deals through individual targeting.
- Switch to Kenji. He receives Smart Deals because `user_tier` is `Premium`.
- Explain that the context attributes come from the application at evaluation time.

## 6. Show Experimentation — 60 seconds

- Explain that safe delivery answers “can we release?”
- Experimentation answers “did the release improve behavior?”
- Show the `smart-deal-cta-clicked` metric and experiment design.
- Click **Explore this deal** and show the event in the Live Delivery Console.

## 7. Close with value — 30 seconds

“The same flag helps Atlas Travel release faster, contain blast radius, recover immediately, target the right audience, and measure business impact. Deployment stays technical; release becomes a controlled business decision.”
