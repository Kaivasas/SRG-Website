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
      name: 'productCategory',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'เลือกประเภทสินค้าจากเอกสาร Product Category เพื่อให้หน้า Product จัดกลุ่มได้',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 5,
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

    // 🌟 3. วิดีโอ Motion Preview
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
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      description: 'ไม่จำเป็นต้องใส่ก็ได้ ถ้าไม่ใส่จะไม่แสดง section Certifications บนหน้า Product',
      of: [
        defineField({
          name: 'certificationItem',
          title: 'Certification Item',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Certificate Name',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Certificate Image / Logo',
              type: 'image',
              description: 'ใส่รูปโลโก้ อย. หรือสัญลักษณ์รับรองที่เกี่ยวกับสินค้านี้',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      description: 'ไม่จำเป็นต้องใส่ก็ได้ ถ้าไม่ใส่จะไม่แสดง section Awards บนหน้า Product',
      of: [
        defineField({
          name: 'awardItem',
          title: 'Award Item',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Award Name',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Award Image / Badge',
              type: 'image',
              description: 'ใส่รูปโลโก้งานประกวด เหรียญ หรือรูปที่เกี่ยวกับรางวัลนี้',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'isFeatured',
      title: '🌟 Show on Homepage (Featured)',
      type: 'boolean',
      description: 'เปิดสวิตช์นี้เพื่อปักหมุดผลงานนี้ให้ไปโชว์ที่หน้า Home เป็นอันดับแรกๆ',
      initialValue: false, // ค่าเริ่มต้นคือปิดไว้
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'productCategory.title',
      media: 'thumbnail', // 🌟 โชว์ Thumbnail ในหน้าจัดการของ Sanity
    },
  },
})
