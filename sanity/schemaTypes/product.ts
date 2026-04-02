import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'ข้อความสั้นๆ ที่อยู่เหนือ Title (เช่น Control Tower Platform)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    // 🌟 ลบ Client ออกไปแล้วครับ
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Launched', value: 'Launched' },
          { title: 'In Market', value: 'In Market' },
          { title: 'Pilot', value: 'Pilot' },
          { title: 'Rolling Out', value: 'Rolling Out' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
    }),

    // 🌟 1. ภาพ Thumbnail (หน้ารวม)
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'ภาพปกขนาดเล็กสำหรับการ์ดในหน้า Products รวม',
      options: { hotspot: true },
    }),

    // 🌟 2. ภาพ Hero (หน้า Detail)
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Detail Page)',
      type: 'image',
      description: 'ภาพปกขนาดใหญ่ด้านบนสุดของหน้า Product Detail',
      options: { hotspot: true },
    }),

    // 🌟 3. ภาพประกอบ Storytelling
    defineField({
      name: 'storyImage',
      title: 'Storytelling Image',
      type: 'image',
      description: 'ภาพประกอบในส่วนของเรื่องราว (Story)',
      options: { hotspot: true },
    }),

    // 🌟 4. วิดีโอ Motion Preview
    defineField({
      name: 'motionVideo',
      title: 'Product Motion Preview (Video)',
      type: 'file', // ใช้ file สำหรับรองรับการอัปโหลดวิดีโอ
      description: 'อัปโหลดไฟล์วิดีโอพรีวิว (แนะนำไฟล์ .mp4 ขนาดไม่ใหญ่เกินไป)',
      options: {
        accept: 'video/*' // จำกัดให้เลือกได้เฉพาะไฟล์วิดีโอ
      }
    }),

    defineField({
      name: 'gradient',
      title: 'Background Theme',
      type: 'string',
      description: 'เลือกโทนสีพื้นหลังสำหรับผลงานนี้',
      options: {
        list: [
          { title: 'Silver Theme (โทนสว่าง)', value: 'from-[#fcfcfc] via-[#ececec] to-[#d8d8d8]' },
          { title: 'Warm Sand (โทนอบอุ่น)', value: 'from-[#fafafa] via-[#e9e9e9] to-[#d3d3d3]' },
          { title: 'Dark Slate (โทนมืด)', value: 'from-[#111111] via-[#1a1a1a] to-[#222222]' },
        ],
        layout: 'radio',
      },
      initialValue: 'from-[#fcfcfc] via-[#ececec] to-[#d8d8d8]',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'storyTitle',
      title: 'Story Title',
      type: 'string',
    }),
    defineField({
      name: 'story',
      title: 'Story Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'แต่ละกล่องข้อความคือ 1 ย่อหน้า (Paragraph)',
    }),

    // 🌟 5. เพิ่ม Image เข้าไปในแต่ละ Benefit
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        defineField({
          name: 'benefitItem',
          title: 'Benefit Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Background Image',
              type: 'image',
              description: 'รูปภาพพื้นหลังสำหรับข้อดีข้อนี้',
              options: { hotspot: true },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category', // 🌟 เปลี่ยนจาก client เป็น category เพื่อไม่ให้ Error
      media: 'thumbnail', // 🌟 โชว์ Thumbnail ในหน้าจัดการของ Sanity
    },
  },
})