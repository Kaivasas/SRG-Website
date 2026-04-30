import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'work',
  title: 'Works (ผลงาน)',
  type: 'document',
  fields: [
    // 1. ข้อมูลพื้นฐาน
    defineField({
      name: 'title',
      title: 'ชื่อผลงาน (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (เช่น techvision-ecommerce)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'ชื่อลูกค้า (Client)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'ปีที่จัดทำ (Year)',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'แท็ก (Tags เช่น Creative, SEO)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'shortDesc',
      title: 'คำอธิบายแบบสั้น (Short Description)',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'คำอธิบายแบบยาว (Description)',
      type: 'text',
    }),
    
    // 2. รูปภาพหลัก
    defineField({
      name: 'thumbnail',
      title: 'รูปภาพปก (Thumbnail)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroMedia',
      title: 'รูปภาพแบนเนอร์ด้านบนสุด (Hero Media)',
      type: 'image',
      options: { hotspot: true },
    }),

    // 3. ส่วน Before / After Slider
    defineField({
      name: 'beforeAfter',
      title: 'ภาพเปรียบเทียบ (Before / After)',
      type: 'object',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true

          const hasBefore = Boolean((value as { before?: unknown }).before)
          const hasAfter = Boolean((value as { after?: unknown }).after)

          if (!hasBefore && !hasAfter) return true
          if (hasBefore && hasAfter) return true

          return 'Please provide both Before and After images, or leave both empty.'
        }),
      fields: [
        { name: 'before', title: 'รูป Before', type: 'image' },
        { name: 'after', title: 'รูป After', type: 'image' },
      ],
    }),

    // 4. ส่วน Dynamic Scrollytelling (หัวใจหลักของเรา)
    defineField({
      name: 'stickySections',
      title: 'ส่วน Scrollytelling (เนื้อหาที่เลื่อนเปลี่ยนรูป)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'หัวข้อ (เช่น Challenge, Solution)', type: 'string' },
            { 
              name: 'content', 
              // 🌟 เปลี่ยนคำอธิบายให้แอดมินเข้าใจง่ายขึ้น
              title: 'เนื้อหา (พิมพ์ยาวๆ ได้เลย กด Enter เพื่อขึ้นบรรทัดใหม่)', 
              // 🌟 เปลี่ยนจาก array เป็น text
              type: 'text', 
            },
            { name: 'image', title: 'รูปภาพประกอบด้านซ้าย', type: 'image' },
          ],
        },
      ],
    }),

    // 5. ส่วน Gallery ด้านล่าง
    defineField({
      name: 'gallery',
      title: 'แกลเลอรีรูปภาพ (Gallery)',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    // 6. ส่วน Metrics / สถิติผลลัพธ์
    defineField({
      name: 'metrics',
      title: 'สถิติผลลัพธ์ (Metrics)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'ตัวเลข (เช่น 200%, 5x)', type: 'string' },
            { name: 'label', title: 'คำอธิบาย (เช่น Conversion)', type: 'string' },
          ],
        },
      ],
    }),

    // 7. SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings (ตั้งค่าการค้นหา)',
      type: 'seo',
    }),
  ],
})
