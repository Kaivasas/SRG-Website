import { type SchemaTypeDefinition } from 'sanity'

// 1. Import ไฟล์ Database ของเราเข้ามา
import work from './work'
import { product } from './product'
import { productCategory } from './productCategory'
import service from './service'
import logobrand from './clientLogo'
import testimonial from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. จับใส่ Array ตรงนี้
  types: [work, productCategory, product, service, logobrand, testimonial],
}
