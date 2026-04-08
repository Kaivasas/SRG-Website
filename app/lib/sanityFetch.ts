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
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
