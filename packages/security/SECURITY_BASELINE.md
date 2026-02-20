# SECURITY_BASELINE.md — Secretarybird Domain Security Policy
# Canonical definition for all sb-web domains
# Version: 1.0 | Ratified: 2026-02-19 | Authority: Maestro / CAIO

## Header Templates by Domain

### secretarybird.care — PUBLIC TRUST SURFACE (Strictest)
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()
X-Robots-Tag: index, follow
```

### secretarybird.tech — CMS SURFACE (Sanity-compatible)
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.sanity.io; connect-src 'self' https://api.sanity.io https://cdn.sanity.io; frame-ancestors 'self'; object-src 'none'; base-uri 'self'
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
X-Robots-Tag: index, follow
```

### secretarybird.dev — QUARANTINED (Admin / Internal)
```
X-Robots-Tag: noindex, nofollow
```
Auth: Vercel SSO (Team member login required)
Note: No public CSP needed. Traffic does not reach content layer.

### secretarybird.store — REDIRECT ONLY
```
Redirect: 301 → secretarybird.care
```
No headers required. No content served.

### secretarybird.app — INACTIVE (Do not configure DNS)
Status: Unresolved until Guardian Console auth model is defined.
Activation criteria:
- Guardian Console shell exists
- Auth model (OAuth/SSO) defined
- CSP for auth domain defined

---

## Allowed Third-Party List

| Domain | Purpose | Allowed On |
|---|---|---|
| cdn.sanity.io | CMS asset delivery | .tech only |
| api.sanity.io | CMS API | .tech only |
| vercel.app | Deployment previews | .dev (internal) |

No third-party analytics, tracking, or advertising scripts are permitted on any domain.

---

## Robots Policy

| Domain | Crawlable | Directive |
|---|---|---|
| .care | ✅ Yes | index, follow |
| .tech | ✅ Yes | index, follow |
| .dev | ❌ No | noindex, nofollow (CF Transform Rule + Vercel SSO) |
| .store | ✅ Yes (redirects) | Inherits .care |
| .app | ❌ No | No DNS — not reachable |

---

## Incident Rollback Procedure

### If a domain security regression is detected:

1. **Immediate**: Run `curl -sI https://<domain>` to confirm regression
2. **Contain**: If .dev, verify Vercel SSO is still active (`401` response)
3. **Cloudflare**: Check Transform Rules are applied in Cloudflare dashboard
4. **DNS**: Verify DNS records are proxied (orange cloud) not DNS-only (grey cloud)
5. **Rollback**: If headers missing, re-apply from this document via Cloudflare dashboard
6. **Freeze**: If code change caused regression, `git revert` to last freeze tag:
   - care: `pre-web-unification-freeze-2026-02-19`
   - tech: `pre-web-unification-freeze-2026-02-19`
7. **Verify**: Re-run `curl -sI` on all five domains before declaring resolved
8. **Log**: Update Notion Sprint log with incident timestamp and root cause

### Verification commands (run after any infrastructure change):
```bash
curl -sI https://secretarybird.care  # Expect: 200, full headers
curl -sI https://secretarybird.tech  # Expect: 200, 5 CMS headers
curl -sI https://secretarybird.store # Expect: 301 → .care
curl -sI https://secretarybird.dev   # Expect: 401, noindex header
```

---

## Change Control

This file is the single source of truth for domain security posture.
Any change to headers, CSP, or robots policy must:
1. Update this file first (PR with description)
2. Apply to Cloudflare dashboard second
3. Verify via curl third
4. Log in Notion Sprint log fourth

No Fake Success: Do not mark a header change complete until curl confirms it live.
