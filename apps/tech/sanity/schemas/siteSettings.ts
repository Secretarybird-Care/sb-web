/**
 * Site settings schema — singleton for global .tech site config
 */
import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string' }),
    defineField({ name: 'description', title: 'Site Description', type: 'text', rows: 3 }),
    defineField({ name: 'url', title: 'Site URL', type: 'url' }),
  ],
  preview: { select: { title: 'title' } },
})
