import { client } from "@/sanity/lib/client";
import { type QueryParams } from "next-sanity";

/**
 * Safe wrapper around `client.fetch` that catches errors and returns `null`
 * instead of throwing, so Server Components can gracefully degrade.
 */
export async function sanityFetchSafe<T>(
  query: string,
  params: QueryParams = {},
): Promise<T | null> {
  try {
    // 🌟 เพิ่ม Parameter ที่ 3 เข้าไปตรงนี้ครับ
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 } 
    });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}