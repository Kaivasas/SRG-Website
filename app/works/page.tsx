import React from "react";
import { client } from "@/sanity/lib/client";

// Import components ที่เพิ่งแยกไว้
import WorksHero from "@/app/components/works/WorksListHero";
import WorksGrid from "@/app/components/works/WorksGrid";

export default async function WorksPage() {

  // ดึงข้อมูลจาก Sanity
  const query = `*[_type == "work"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url,
    tags,
    client,
    year,
  }`;

  const works = await client.fetch(query);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">
      {/* ประกอบร่างให้คลีนที่สุด! */}
      <WorksHero />
      <WorksGrid works={works} />
    </div>
  );
}