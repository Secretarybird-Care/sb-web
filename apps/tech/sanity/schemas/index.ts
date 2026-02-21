/**
 * Sanity schema registry — secretarybird.tech
 *
 * Add all content types here.
 * Care* types (CareHome, CareSafetyPage, CareSupportPage) are intentionally
 * excluded — those are canonical to secretarybird.care per Maestro Decision D1.
 *
 * i18n types live in packages/i18n (SB-Lang-Glob architecture).
 */
import { page } from './page'
import { post } from './post'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  page,
  post,
  siteSettings,
]
