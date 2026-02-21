/**
 * Sanity Studio configuration — secretarybird.tech
 *
 * Project: SB-Lang-Glob (organization-scoped multilingual CMS)
 * Dataset: production
 * Governed by: Secretarybird AI Safety Constitution v2.0
 *
 * SECURITY:
 * - Project ID and dataset name are loaded from environment variables.
 * - Never hardcode projectId or dataset in this file.
 * - See .env.example for required variables.
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'secretarybird-tech',
  title: 'Secretarybird Tech',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
