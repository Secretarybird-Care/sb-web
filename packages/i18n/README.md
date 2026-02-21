# packages/i18n — Secretarybird Multilingual Architecture

**Governed by:** Secretarybird AI Safety Constitution v2.0
**Platform:** Lokalise (translation management) + Sanity (content delivery)
**Organisation:** SB-Lang-Glob

---

## Architecture

Lokalise is the single source of truth for all translated strings.
Sanity delivers structured multilingual content (pages, posts).
This package provides shared utilities for consuming both.

```
Translation workflow:
  1. Source strings written in English (default locale)
  2. Lokalise manages translation memory, TM, and translator access
  3. Translations exported from Lokalise → consumed at build time
  4. Sanity stores locale-aware page content

Runtime:
  apps/care  → uses packages/i18n for UI strings
  apps/tech  → uses packages/i18n for UI strings + Sanity for page content
```

---

## Environment Variables

| Variable | Used in | Purpose |
|---|---|---|
| `LOKALISE_API_TOKEN` | Build / CI | Fetch translations from Lokalise API |
| `LOKALISE_PROJECT_ID` | Build / CI | Identify the SB-Lang-Glob Lokalise project |

Both are server-side only. Never expose to browser.

---

## Supported Locales

To be defined when translation scope is confirmed with Maestro.
Placeholder: `en` (English, default).

---

## Security Note

Lokalise API tokens have access to all translation strings.
A compromised Lokalise token means an attacker can modify
content displayed to vulnerable users without touching code.

Token rotation schedule: quarterly, or immediately on any personnel change.

---

## Status

⬜ Locale definitions — pending Maestro decision on target languages
⬜ Lokalise SDK integration — pending locale scope decision
⬜ Build-time fetch script — pending above
✅ Architecture documented and governed
