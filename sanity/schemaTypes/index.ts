import { type SchemaTypeDefinition } from 'sanity'

import { work } from './work'
import { product } from './product'
import { productCategory } from './productCategory'
import { service } from './service'
import { clientLogo } from './clientLogo'
import { testimonial } from './testimonial'
import { seo } from './seo'
import { siteSettings } from './siteSettings'
import { badgeItem } from './badgeItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [work, productCategory, product, service, clientLogo, testimonial, seo, siteSettings, badgeItem],
}
