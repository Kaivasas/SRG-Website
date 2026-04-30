import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";

interface GenerateSeoProps {
  type: string;
  slug: string;
}

/**
 * ดึงข้อมูล SEO สำหรับหน้า Dynamic Route ต่างๆ (Works, Services, Products)
 * เพื่อลดการเขียนโค้ดซ้ำซ้อนในแต่ละหน้า
 */
export async function generateDynamicMetadata({ type, slug }: GenerateSeoProps): Promise<Metadata> {
  const query = `*[_type == $type && slug.current == $slug][0] { title, seo }`;
  const data = await client.fetch(query, { type, slug });

  if (!data) return {};

  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription,
  };
}
