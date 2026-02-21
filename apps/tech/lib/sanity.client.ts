/**
 * Sanity client — secretarybird.tech
 *
 * Two clients:
 *   client       — public read, CDN-cached, used at build time and in RSC
 *   previewClient — authenticated read, bypasses CDN, used in preview mode only
 *
 * SECURITY NOTE:
 * previewClient token is server-side only. Never expose SANITY_API_READ_TOKEN
 * to the browser. It is used exclusively in Server Components and API routes.
 */
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

// Public client — safe to use in browser and RSC
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Preview client — SERVER SIDE ONLY
// Only instantiate where SANITY_API_READ_TOKEN is available
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export function getClient(preview = false) {
  return preview ? previewClient : client
}
