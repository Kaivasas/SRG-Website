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

    defineField({ name: 'subtitle', title: 'หัวข้อย่อย (Subtitle)', type: 'string' }),
    defineField({ name: 'description', title: 'รายละเอียด (Description)', type: 'text' }),
    defineField({ name: 'heroImage', title: 'รูปภาพ Hero', type: 'image', options: { hotspot: true } }),

    defineField({ name: 'whyTitle', title: 'หัวข้อ Why Choose Us', type: 'string' }),
    
    // 🌟 1. อัปเดตส่วน Why Choose Us ตรงนี้ครับ
    defineField({
      name: 'benefits',
      title: 'ข้อดี (Benefits)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'หัวข้อ', type: 'string' },
          { name: 'desc', title: 'คำอธิบาย', type: 'text' },
          // 🌟 เพิ่มฟิลด์อัปโหลดรูปภาพตรงนี้
          { name: 'image', title: 'รูปภาพประกอบ (Image)', type: 'image', options: { hotspot: true } }
        ]
      }]
    }),
    
    // ส่วน Workflow (คงเดิม)
    defineField({
      name: 'workflow',
      title: 'ขั้นตอนการทำงาน (Workflow)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'หัวข้อ', type: 'string' },
          { name: 'desc', title: 'คำอธิบาย', type: 'text' },
          defineField({
            name: 'color',
            title: 'สีตัวเลข (Number Color)',
            description: 'เลือกสีที่ต้องการให้แสดงตรงตัวเลขขั้นตอน',
            type: 'string',
            options: {
              list: [
                { title: '⚪ สีขาว (Clean White)', value: 'text-white' },
                { title: '🟢 สีเขียว (Sustain Green)', value: 'text-green-500' },
                { title: '🔵 สีฟ้า (Ocean Blue)', value: 'text-blue-500' },
                { title: '🟡 สีทอง (Premium Gold)', value: 'text-yellow-500' },
              ],
              layout: 'radio',
            },
            initialValue: 'text-white',
          }),
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