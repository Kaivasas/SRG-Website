import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product', // ชื่อเมนูที่จะไปโผล่ในหน้า Admin
  type: 'document',
  fields: [
    // 1. ข้อมูลพื้นฐาน (อ้างอิงจากภาพที่ 2 และ 3)
    defineField({
      name: 'name',
      title: 'ชื่อผลิตภัณฑ์',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (เช่น /product/item-name)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'ประเภทผลิตภัณฑ์',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'รูปภาพหลัก (โชว์หน้าหน้ารวมและหน้าแรกของ Detail)',
      type: 'image',
      options: { hotspot: true }, // ให้ Admin เลือกจุดโฟกัสรูปได้
    }),

    // 2. ส่วนบอกเล่าที่มาของสินค้า (อ้างอิงจากภาพที่ 4)
    defineField({
      name: 'storyText',
      title: 'บอกเล่าที่มาของสินค้า',
      type: 'text', // ใช้ 'text' สำหรับข้อความยาวๆ หรือเปลี่ยนเป็น 'array' (of block) ถ้าอยากให้จัด Formate ตัวหนา/เอียงได้
    }),
    defineField({
      name: 'storyImages',
      title: 'รูปภาพประกอบที่มาของสินค้า',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    // 3. ทำไมจึงต้องเลือกผลิตภัณฑ์นี้ (อ้างอิงจากภาพที่ 5)
    defineField({
      name: 'features',
      title: 'คุณสมบัติ / ประโยชน์ (ทำไมถึงต้องเลือก)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'รูปภาพ/ไอคอน', type: 'image' },
            { name: 'title', title: 'หัวข้อคุณสมบัติ', type: 'string' },
            { name: 'description', title: 'คำอธิบายสั้นๆ', type: 'text' },
          ],
        },
      ],
    }),

    // 4. การรับรองผลิตภัณฑ์ (อ้างอิงจากภาพที่ 6 - ส่วนบน)
    defineField({
      name: 'certifications',
      title: 'โลโก้การรับรองผลิตภัณฑ์',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    // 5. สินค้าที่เกี่ยวข้อง (อ้างอิงจากภาพที่ 6 - ส่วนล่าง)
    defineField({
      name: 'relatedProducts',
      title: 'ผลิตภัณฑ์อื่นๆ ที่เกี่ยวข้อง',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }], // ดึงข้อมูล Product ตัวอื่นมาเชื่อมโยงกันได้เลย
    }),
  ],
})