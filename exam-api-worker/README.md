# Managed Exams API

Cloudflare Worker + D1 backend for the PL-300 Managed Exam Center.

## What it stores

- One administrator and registered student accounts
- Salted PBKDF2 password hashes and hashed session tokens
- The 494-question server-side bank; new managed exams are selected only from the 363 questions with a verified automatic grading key
- Published exam settings and selected question IDs
- Attempts, answers, flags, locked item-series questions, browser identity, security events, violation thresholds, deadlines, and results

The API never sends correct-answer indexes, explanations, or answer images in an active student attempt.

## Local verification

```bash
npm run managed:seed
npx wrangler d1 migrations apply pl300-managed-exams --local --config exam-api-worker/wrangler.jsonc
npx wrangler d1 execute pl300-managed-exams --local --config exam-api-worker/wrangler.jsonc --file exam-api-worker/seed-question-bank.sql
npx wrangler dev --config exam-api-worker/wrangler.jsonc --local --var ADMIN_BOOTSTRAP_CODE:LOCAL-ADMIN-SETUP-2026
node scripts/managed-api-integration-qa.mjs
```

## Production deployment

1. Create the D1 database and place its returned ID in `wrangler.jsonc`.
2. Apply the migration in `migrations/` to the remote database.
3. Import `seed-question-bank.sql` into the remote database.
4. Store a long random `ADMIN_BOOTSTRAP_CODE` with Wrangler secrets.
5. Deploy the Worker and set the resulting URL as `NEXT_PUBLIC_MANAGED_EXAMS_API_URL` in the GitHub Pages build.
6. Open `/managed`, choose **First-time administrator setup**, and create the owner account. The bootstrap endpoint permanently refuses a second administrator.

Never commit the administrator setup code, student passwords, session tokens, or Cloudflare credentials.
