# AI tutor recovery review, 22 October 2026

## Changes

- Classify plain-object and nested Puter errors without exposing raw provider payloads. Distinguish blocked popups, cancelled login, authentication, limits, network, timeouts and provider unavailability.
- Keep sign-in popup creation within a direct click. If the SDK needed loading, require a second click rather than opening a delayed popup.
- Add explicit reconnection using `request_auth`, and refresh the UI's sign-in state on focus while the tutor is open.
- Stop model fallbacks for account/auth/limit/network errors. Cancel a timed-out request using the documented AbortSignal; do not silently duplicate that request on another model. Cancellation is best effort on the provider side.
- Remove the unlabelled paid-model fallback. Only configured `:free` model IDs are selected. Puter's own allowance, billing policies and rate limits still apply; this does not promise unlimited free service.
- Label each response as live AI or built-in guidance. Exclude fallback explanations from subsequent provider history so a canned response is not mistaken for a prior AI claim.
- Include original formula placeholders and row-labelled options in question context. Explicitly prohibit pretending that a URL has been visually inspected.
- Do not attach late replies to a different question after navigation.

## Verification

- `npm run qa:all`: passed.
- `npx tsc --noEmit`: passed.
- Targeted lint on the three modified TypeScript files: passed.
- Production export: passed.
- Isolated Microsoft Edge browser tests, desktop and 390px mobile: passed popup failure/retry, nested quota failure with one provider attempt, safe error text, retry recovery, response-source labels, answer gating and fallback-history isolation.
- The browser tests used a simulated provider. They are NOT evidence of successful authenticated live inference.
- Live public SDK catalog on this date listed the DeepSeek V4.1 Flash, Apodex 1.1 Mini and Ling 3.1 Flash free IDs. Catalog listing alone does not prove a model responds for a signed-in account.

## Still requires the account owner

A successful real provider reply in the owner's signed-in Edge session. No credentials, browser cookies or tokens were copied or inspected. Site login and Puter login are separate.

## Official references checked

- https://docs.puter.com/Auth/signIn/ (direct user gesture; popup error objects; explicit account re-auth)
- https://docs.puter.com/AI/chat/ (normalization and request cancellation)
- https://docs.puter.com/user-pays-model/ (account allowance and billing responsibility)
