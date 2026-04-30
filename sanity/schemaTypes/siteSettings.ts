import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of the website.',
    }),
    defineField({
      name: 'seo',
      title: 'Default Global SEO',
      type: 'seo',
      description: 'Default SEO settings for the website. Used when a page does not have its own SEO settings.',
    }),
  ],
})
