import { type SchemaTypeDefinition } from 'sanity'

// 1. Import ไฟล์ Database ของเราเข้ามา
import work from './work'
import product from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  // 2. จับใส่ Array ตรงนี้
  types: [work, product],
}