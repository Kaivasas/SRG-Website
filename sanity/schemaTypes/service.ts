import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services (บริการย่อย)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'ชื่อบริการ (เช่น Website, Facebook)', type: 'string' }),
    defineField({ name: 'slug', title: 'URL Slug (เช่น website, facebook)', type: 'slug', options: { source: 'title', maxLength: 96 } }),

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
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: 'description', title: 'รายละเอียด (Description)', type: 'text' }),
    defineField({ name: 'heroImage', title: 'รูปภาพ Hero', type: 'image', options: { hotspot: true } }),

    defineField({ name: 'whyTitle', title: 'หัวข้อ Why Choose Us', type: 'string' }),

    // 🌟 1. อัปเดตส่วน Why Choose Us ตรงนี้ครับ
    defineField({
      name: 'benefitImage',
      title: 'รูปภาพประกอบส่วน Why Choose Us (ใช้รูปเดียว)',
      type: 'image',
      options: { hotspot: true }
    }),

    defineField({
      name: 'benefits',
      title: 'หัวข้อข้อดี (Benefits)',
      type: 'array',
      of: [{ type: 'string', title: 'หัวข้อ' }]
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