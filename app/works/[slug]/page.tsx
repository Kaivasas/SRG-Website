// app/works/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import Link from "next/link";

// 1. Import Components ที่เราเพิ่งหั่นไว้มาประกอบกัน
import WorkHero from "@/app/components/works/WorkDetailHero";
import WorkDescription from "@/app/components/works/WorkDescription";
import BeforeAfterSlider from "@/app/components/works/BeforeAfterSlider";
import Scrollytelling from "@/app/components/works/Scrollytelling";
import WorkGallery from "@/app/components/works/WorkGallery";
import WorkMetrics from "@/app/components/works/WorkMetrics";

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // คำสั่งดึงข้อมูล Sanity เหมือนเดิมเป๊ะ
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

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white text-2xl">ไม่พบผลงานที่คุณค้นหา</div>;
  }

  // 2. ประกอบร่าง! (โค้ดคลีนขึ้นแบบ 1000%)
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">
      
      <WorkHero work={work} />

      {/* 🌟 2. เลื่อนลงมาเจอ Description หรูๆ เน้น Typography นำสายตา */}
      <WorkDescription description={work.description} />
      
      <BeforeAfterSlider beforeAfter={work.beforeAfter} />
      
      <Scrollytelling sections={work.stickySections} />
      
      <WorkGallery gallery={work.gallery} title={work.title} />
      
      <WorkMetrics metrics={work.metrics} />

      {/* ปุ่ม View All Works ด้านล่างสุด */}
      <div className="py-24 text-center relative z-20 bg-[#050505]">
        <Link href="/works" className="inline-block border border-white/20 px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          View All Works
        </Link>
      </div>

    </div>
  );
}