import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'clientLogo',
  title: 'Clients (โลโก้ลูกค้า)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'ชื่อแบรนด์',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'รูปโลโก้ (พื้นหลังใส PNG)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
})