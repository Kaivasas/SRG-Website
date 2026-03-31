import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials (รีวิวจากลูกค้า)',
  type: 'document',
  fields: [
    defineField({ 
      name: 'name', 
      title: 'ชื่อลูกค้า (Name)', 
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ 
      name: 'position', 
      title: 'ตำแหน่ง (Position)', 
      type: 'string',
      description: 'เช่น Marketing Director, CEO, Founder'
    }),
    defineField({ 
      name: 'company', 
      title: 'ชื่อบริษัท (Company)', 
      type: 'string',
      description: 'เช่น Google Thailand, Sustain Republix'
    }),
    defineField({ 
      name: 'quote', 
      title: 'คำพูดรีวิว (Quote)', 
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ 
      name: 'avatar', 
      title: 'รูปโปรไฟล์ลูกค้า (Avatar)', 
      type: 'image', 
      options: { hotspot: true } 
    }),
    defineField({ 
      name: 'companyLogo', 
      title: 'โลโก้บริษัท (Company Logo)', 
      type: 'image', 
      options: { hotspot: true },
    }),
  ],
})