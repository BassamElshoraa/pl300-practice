# PL-300 AI Tutor Worker

This Cloudflare Worker keeps AI access and authentication away from the public static site. It validates Supabase sessions, applies request limits, removes the answer key before a learner checks an answer, and calls Workers AI.

## Required setup

1. Create a Supabase project and keep Email/Password authentication enabled.
2. Add the production and localhost URLs to Supabase Authentication redirect URLs.
3. Copy `.dev.vars.example` to `.dev.vars` for local development.
4. Store `SUPABASE_URL` and `SUPABASE_ANON_KEY` as Worker secrets in production.
5. Authenticate Wrangler and deploy this folder's worker.
6. Build the simulator with `NEXT_PUBLIC_AI_TUTOR_API_URL` set to the deployed Worker URL.

The worker stores no chat transcripts. The frontend retains only the Supabase session and a local daily usage counter.
