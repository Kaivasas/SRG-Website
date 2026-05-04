import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

interface GenerateSeoProps {
  type: string;
  slug: string;
}

/**
 * ดึงข้อมูล SEO สำหรับหน้า Dynamic Route ต่างๆ (Works, Services, Products)
 * เพื่อลดการเขียนโค้ดซ้ำซ้อนในแต่ละหน้า
 */
export async function generateDynamicMetadata({ type, slug }: GenerateSeoProps): Promise<Metadata> {
  const SEO_QUERY = defineQuery(`*[_type == $type && slug.current == $slug][0] { title, seo }`);
  const { data } = await sanityFetch({ 
    query: SEO_QUERY, 
    params: { type, slug },
    stega: false // Critical for SEO to avoid invisible characters in metadata
  });

  if (!data) return {};

  const typedData = data as { title: string; seo?: { metaTitle?: string; metaDescription?: string } };

  return {
    title: typedData.seo?.metaTitle || typedData.title,
    description: typedData.seo?.metaDescription,
  };
}
