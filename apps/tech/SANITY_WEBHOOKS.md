# Sanity Webhook Setup — secretarybird.tech

Zero webhooks currently configured (confirmed 2026-02-21).

## When to add webhooks

Add a Vercel revalidation webhook when:
- apps/tech is deployed to production on Vercel under the sb-web monorepo
- You need content changes in Sanity to trigger Next.js ISR revalidation

## Webhook configuration (do this in Sanity dashboard)

**Name:** Vercel Revalidate — secretarybird.tech
**URL:** `https://secretarybird.tech/api/revalidate`
**Trigger on:** Create, Update, Delete
**Filter:** none (all documents)
**Secret:** Set `SANITY_REVALIDATE_SECRET` in both Sanity webhook config and Vercel env vars

## API route to create

`apps/tech/app/api/revalidate/route.ts`

Validates webhook signature against SANITY_REVALIDATE_SECRET,
then calls `revalidatePath('/')` or targeted paths.

## Security

- Never log the webhook secret
- Reject requests with invalid signatures (return 401)
- SANITY_REVALIDATE_SECRET must match exactly in both Sanity and Vercel
