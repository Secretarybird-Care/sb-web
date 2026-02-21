# SB/66 RECEIPT — ENV + TOKEN + LOKALISE DISCOVERY
Classification: SB-ARCHITECTURE / SB-SECURITY
Date: 2026-02-21
Status: MERGED
Author: Claude (tactical) / Maestro (governance review)
Protocol: DIP — evidence-based, no assumptions

## 1) Trigger / Evidence
- Evidence type: Screenshots (3)
- Source: Sanity API → Tokens page, Vercel Environment Variables, GitHub Actions
- Screenshots captured: 2026-02-21 during Sprint 02B Sanity audit

## 2) Findings
- Found token inventory in Sanity (4 tokens, 3 orphaned):
  - `SANITY_API_TOKEN` (Viewer) — IN USE in Vercel → keep, rename to SANITY_READ_TOKEN semantics
  - `Content Editor` (Editor) — NOT in Vercel → orphan → DELETE
  - `SANITY_API_TOKEN_1` (Editor) — NOT in Vercel → orphan → DELETE
  - `SANITY_API_TOKEN_2` (Editor) — NOT in Vercel → orphan → DELETE
  - `GitHub CI Schema Deploy` (Editor) — CREATED this session → GitHub Actions secret
- Discovered Lokalise integration:
  - Observed in: Vercel env vars (LOKALISE_API_TOKEN, LOKALISE_PROJECT_ID)
  - Integration predates Sprint 02 — added 12/9/25 alongside Sanity vars
  - SB-Lang-Glob spans both Sanity (CMS) and Lokalise (TMS)

## 3) Decisions
- Keep:
  - `SANITY_API_TOKEN` (Viewer) — storage: Vercel env vars (server-side only)
  - Semantic rename in .env.example: SANITY_READ_TOKEN
- Create:
  - `GitHub CI Schema Deploy` (Editor) — storage: GitHub Actions secret SANITY_AUTH_TOKEN
- Delete:
  - `Content Editor` (orphan)
  - `SANITY_API_TOKEN_1` (orphan)
  - `SANITY_API_TOKEN_2` (orphan)
- Lokalise:
  - Treat as already-live infrastructure, not future work
  - Token storage: Vercel (existing) + GitHub Actions secret (to add)
  - Language scope deferred to Maestro briefing

## 4) Changes Made
### Repo changes (sb-web)
- Updated: `apps/tech/.env.example` → Maestro-standard SB/66 format
- Updated: `apps/tech/package.json` → sanity ^5.1.0 (Content Agent compliance)
- Updated: `apps/tech/sanity.config.ts` → governance comment added
- Added: `apps/tech/sanity.cli.ts`
- Added: `apps/tech/lib/sanity.client.ts` (public + preview client, server-side token only)
- Added: `apps/tech/lib/sanity.image.ts`
- Added: `apps/tech/sanity/schemas/` (index, page, post, siteSettings, README)
- Added: `apps/tech/SANITY_WEBHOOKS.md`
- Added: `packages/i18n/README.md` (Lokalise architecture documented)
- Added: `.github/workflows/sanity-schema-deploy.yml` (SHA-pinned actions)
- Added: `packages/security/SECURITY_BASELINE.md`
- Added: `packages/governance/receipts/2026-02-21_SPRINT02B_ENV_TOKEN_LOKALISE_RECEIPT.md`

### Platform changes
- Sanity tokens:
  - Deleted: `Content Editor`, `SANITY_API_TOKEN_1`, `SANITY_API_TOKEN_2`
  - Created: `GitHub CI Schema Deploy` (Editor)
  - Retained: `SANITY_API_TOKEN` (Viewer) — live in Vercel
- GitHub Secrets (sb-web):
  - Added: `SANITY_AUTH_TOKEN` (CI schema deploy token)
  - Added: `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - Added: `NEXT_PUBLIC_SANITY_DATASET`
- Sanity CORS:
  - Existing: `http://localhost:3333`
  - Required: `https://secretarybird.tech` + `https://www.secretarybird.tech` (PENDING human action)

## 5) Verification
### Commands
```bash
# Verify env template is clean
git diff -- apps/tech/.env.example

# Ensure no secrets in repo
grep -RIn --exclude-dir=node_modules --exclude-dir=.git \
  -E "(SANITY_.*TOKEN|LOKALISE_API_TOKEN|api[_-]?token|secret)" .

# Confirm Next.js public env safety
grep -RIn --exclude-dir=node_modules --exclude-dir=.git \
  -E "NEXT_PUBLIC_.*TOKEN|NEXT_PUBLIC_.*SECRET" .
```

### Expected output
- `grep` for tokens: only `__REPLACE_ME__` placeholders, never `sk...` values
- `NEXT_PUBLIC_.*TOKEN`: zero results
- CI run: see GitHub Actions → Sanity Schema Deploy → commit a80e327

## 6) Rollback Plan
- Revert: `git revert <commit sha>`
- Restore Vercel env: re-add SANITY_API_TOKEN value from Vercel dashboard snapshot
- Recreate tokens in Sanity only if rotation was completed
- Do not restore orphan tokens

## 7) Open Items
- [ ] CORS: Add `https://secretarybird.tech` + `https://www.secretarybird.tech` to Sanity CORS origins (HUMAN ACTION REQUIRED)
- [ ] Token rotation: Rotate SANITY_API_TOKEN (Viewer) after confirming CI token is stable
- [ ] Lokalise: Language scope decision deferred to Maestro briefing
- [ ] Vercel: Rename SANITY_API_TOKEN → SANITY_READ_TOKEN in Vercel env vars for clarity
- [ ] CI: Confirm `Sanity Schema Deploy` run goes green (commit a80e327)
