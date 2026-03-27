import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services (บริการ)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'ชื่อบริการ (Title)', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'subtitle', title: 'หัวข้อย่อย (Subtitle)', type: 'string' }),
    defineField({ name: 'description', title: 'รายละเอียด (Description)', type: 'text' }),
    defineField({ name: 'heroImage', title: 'รูปภาพ Hero', type: 'image', options: { hotspot: true } }),
    
    // ส่วน Why Choose Us
    defineField({ name: 'whyTitle', title: 'หัวข้อ Why Choose Us', type: 'string' }),
    defineField({
      name: 'benefits',
      title: 'ข้อดี (Benefits)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'id', title: 'หมายเลข (เช่น 01)', type: 'string' },
          { name: 'title', title: 'หัวข้อ', type: 'string' },
          { name: 'desc', title: 'คำอธิบาย', type: 'text' }
        ]
      }]
    }),

    // ส่วน Workflow
    defineField({
      name: 'workflow',
      title: 'ขั้นตอนการทำงาน (Workflow)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', title: 'หมายเลขขั้นตอน (เช่น 01)', type: 'string' },
          { name: 'title', title: 'หัวข้อ', type: 'string' },
          { name: 'desc', title: 'คำอธิบาย', type: 'text' },
          { name: 'color', title: 'สีตัวเลข (เช่น text-blue-500)', type: 'string' },
          { name: 'top', title: 'ระยะห่างด้านบน (เช่น top-[20vh])', type: 'string' },
          { name: 'isDark', title: 'พื้นหลังสีเข้มหรือไม่?', type: 'boolean', initialValue: false }
        ]
      }]
    }),

    // ส่วนเชื่อมโยงผลงาน (ทีเด็ด!)
    defineField({
      name: 'portfolios',
      title: 'ผลงานที่เกี่ยวข้อง (ดึงจาก Works)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'work' }] }] // ดึง Database 'work' มาใช้เลย!
    })
  ]
})