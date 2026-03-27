// app/works/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import WorkDetailClient from "./WorkDetailClient"; // เดี๋ยวเราจะสร้างไฟล์นี้

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `*[_type == "work" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    client,
    year,
    shortDesc,
    description,
    "heroMedia": heroMedia.asset->url,
    beforeAfter {
      "before": before.asset->url,
      "after": after.asset->url
    },
    stickySections[] {
      title,
      content,
      "image": image.asset->url
    },
    "gallery": gallery[].asset->url,
    metrics
  }`;

  const work = await client.fetch(query, { slug });

  if (!work) return <div>Work not found</div>;

  // ส่งข้อมูลที่ดึงได้ไปให้ไฟล์ฝั่ง Client แสดงผล
  return <WorkDetailClient work={work} />;
}