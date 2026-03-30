import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services (บริการย่อย)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'ชื่อบริการ (เช่น Website, Facebook)', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug (เช่น website, facebook)', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    
    // 🌟 1. เพิ่มฟิลด์ Category (หัวข้อใหญ่) ให้ตรงกับที่มีใน Navbar
    defineField({
      name: 'category',
      title: 'หมวดหมู่บริการ (Category)',
      type: 'string',
      options: {
        list: [
          { title: 'Digital Marketing', value: 'Digital Marketing' },
          { title: 'Event Organization', value: 'Event Organization' },
          { title: 'Live Streaming', value: 'Live Streaming' },
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Business Strategies', value: 'Business Strategies' },
          { title: 'Creator', value: 'Creator' },
          { title: 'Design', value: 'Design' },
          { title: 'Media', value: 'Media' }
        ]
      },
      validation: (Rule) => Rule.required(), // บังคับว่าต้องเลือกหมวดหมู่
    }),

    defineField({ name: 'subtitle', title: 'หัวข้อย่อย (Subtitle)', type: 'string' }),
    defineField({ name: 'description', title: 'รายละเอียด (Description)', type: 'text' }),
    defineField({ name: 'heroImage', title: 'รูปภาพ Hero', type: 'image', options: { hotspot: true } }),
    
    // 🌟 2. ส่วน Why Choose Us (ลบฟิลด์ id ออก)
    defineField({ name: 'whyTitle', title: 'หัวข้อ Why Choose Us', type: 'string' }),
    defineField({
      name: 'benefits',
      title: 'ข้อดี (Benefits)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          // ลบ { name: 'id' } ออกไปแล้ว ระบบหน้าเว็บจะนับเลขให้เอง
          { name: 'title', title: 'หัวข้อ', type: 'string' },
          { name: 'desc', title: 'คำอธิบาย', type: 'text' }
        ]
      }]
    }),

    // 🌟 3. ส่วน Workflow (ลบฟิลด์ step ออก)
    defineField({
      name: 'workflow',
      title: 'ขั้นตอนการทำงาน (Workflow)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          // ลบ { name: 'step' } ออกไปแล้ว
          { name: 'title', title: 'หัวข้อ', type: 'string' },
          { name: 'desc', title: 'คำอธิบาย', type: 'text' },
          { name: 'color', title: 'สีตัวเลข (เช่น text-blue-500)', type: 'string' },
          { name: 'top', title: 'ระยะห่างด้านบน (เช่น top-[20vh])', type: 'string' },
          { name: 'isDark', title: 'พื้นหลังสีเข้มหรือไม่?', type: 'boolean', initialValue: false }
        ]
      }]
    }),

    // ส่วนเชื่อมโยงผลงาน
    defineField({
      name: 'portfolios',
      title: 'ผลงานที่เกี่ยวข้อง (ดึงจาก Works)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'work' }] }]
    })
  ]
})