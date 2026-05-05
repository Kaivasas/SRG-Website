import { defineField, defineType } from "sanity";

export const badgeItem = defineType({
  name: "badgeItem",
  title: "Badge Item",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image / Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
