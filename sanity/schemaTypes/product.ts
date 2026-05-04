import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Short label shown above the product title.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "productCategory",
      title: "Product Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      description: "Choose a category so this product appears in the correct collection.",
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      description: "Cover image used on product cards.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Main image shown on the product detail page.",
      options: { hotspot: true },
    }),
    defineField({
      name: "motionVideo",
      title: "Product Motion Preview (Video)",
      type: "file",
      description: "Optional video preview for the product detail page.",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      description: "Optional. If left empty, the Certificates section will not be shown on the product page.",
      of: [{ type: "badgeItem" }],
    }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      description: "Optional. If left empty, the Recognition & Awards section will not be shown on the product page.",
      of: [{ type: "badgeItem" }],
    }),
    defineField({
      name: "isFeatured",
      title: "Show on Homepage (Featured)",
      type: "boolean",
      description: "Enable this if the product should appear in the homepage featured section.",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO Settings (ตั้งค่าการค้นหา)",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "productCategory.title",
      media: "thumbnail",
    },
  },
});
