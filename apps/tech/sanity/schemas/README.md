# Schema Registry — secretarybird.tech

## What lives here

Content types for the `secretarybird.tech` engineering/corporate surface:

| Schema | Purpose |
|---|---|
| `page` | Generic content pages |
| `post` | Blog posts and updates |
| `siteSettings` | Singleton — site title, description, URL |

## What does NOT live here (by governance decision)

| Excluded | Reason | Canonical location |
|---|---|---|
| `CareHome` | Maestro D1 — .care is canonical | secretarybird-care-website |
| `CareSafetyPage` | Maestro D1 — .care is canonical | secretarybird-care-website |
| `CareSupportPage` | Maestro D1 — .care is canonical | secretarybird-care-website |
| i18n / translation types | SB-Lang-Glob org architecture | packages/i18n (sb-web) |

## Adding a schema type

1. Create `apps/tech/sanity/schemas/yourType.ts`
2. Add to `apps/tech/sanity/schemas/index.ts`
3. Commit to main — CI will auto-deploy schema to Sanity org dashboard
4. Update this README

## Governance

Schema changes are governed by the Secretarybird AI Safety Constitution v2.0.
Any schema that touches user data or vulnerable populations requires Maestro review.
