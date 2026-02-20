# sb-web — Secretarybird Web Monorepo

Model B: Turborepo monorepo with shared packages.
Replaces secretarybird-care-website + secretarybird-tech-website.

## Structure

```
sb-web/
├── apps/
│   ├── care/          → secretarybird.care (strictest security)
│   └── tech/          → secretarybird.tech (CMS-compatible)
├── packages/
│   ├── ui/            → shared components
│   ├── security/      → shared CSP + header configs
│   ├── i18n/          → shared translations
│   └── governance/    → constitution pointer
├── turbo.json
└── package.json
```

## Governance
See CONSTITUTION_POINTER.md

## Freeze Tags
- pre-web-unification-freeze-2026-02-19 on secretarybird-care-website
- pre-web-unification-freeze-2026-02-19 on secretarybird-tech-website
