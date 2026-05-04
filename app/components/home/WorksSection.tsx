import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import type { SanityWorkCard } from "@/app/types/sanity";
import WorksClient from "./WorksClient";

const WORKS_HOME_QUERY = defineQuery(`*[_type == "work"] | order(_createdAt desc)[0...4] {
  title,
  "slug": slug.current,
  client,
  year,
  "thumbnail": thumbnail.asset->url
}`);

export default async function WorksSection() {
  const { data: worksData } = await sanityFetch({ query: WORKS_HOME_QUERY });
  if (!worksData || worksData.length === 0) return null;

  return <WorksClient worksData={worksData as SanityWorkCard[]} />;
}