import React from "react";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityWorkCard } from "@/app/types/sanity";
import WorksClient from "./WorksClient";

const WORKS_HOME_QUERY = `*[_type == "work"] | order(_createdAt desc)[0...4] {
  title,
  "slug": slug.current,
  client,
  year,
  "thumbnail": thumbnail.asset->url
}`;

export default async function WorksSection() {
  const worksData = await sanityFetchSafe<SanityWorkCard[]>(WORKS_HOME_QUERY);
  if (!worksData || worksData.length === 0) return null;

  return <WorksClient worksData={worksData} />;
}