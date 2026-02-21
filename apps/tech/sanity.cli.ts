/**
 * Sanity CLI configuration — secretarybird.tech
 * Used by: `sanity deploy`, `sanity dataset export`, `sanity documents query`
 */
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
  studioHost: 'secretarybird-tech',
})
