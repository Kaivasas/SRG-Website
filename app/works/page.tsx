import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

// Import components ที่เพิ่งแยกไว้
import WorksHero from "@/app/components/works/WorksListHero";
import WorksGrid from "@/app/components/works/WorksGrid";

const WORKS_QUERY = defineQuery(`*[_type == "work"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url,
    tags,
    client,
    year,
  }`);

export default async function WorksPage() {
  const { data: works } = await sanityFetch({ query: WORKS_QUERY });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">
      {/* ประกอบร่างให้คลีนที่สุด! */}
      <WorksHero />
      <WorksGrid works={works ?? []} />
    </div>
  );
}