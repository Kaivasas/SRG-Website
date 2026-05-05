// app/works/[slug]/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import type { Metadata } from "next";
import type { SanityWorkDetail } from "@/app/types/sanity";

// 1. Import Components ที่เราเพิ่งหั่นไว้มาประกอบกัน
import WorkHero from "@/app/components/works/WorkDetailHero";
import WorkDescription from "@/app/components/works/WorkDescription";
import BeforeAfterSlider from "@/app/components/works/BeforeAfterSlider";
import Scrollytelling from "@/app/components/works/Scrollytelling";
import WorkGallery from "@/app/components/works/WorkGallery";
import WorkMetrics from "@/app/components/works/WorkMetrics";

import { generateDynamicMetadata } from "@/app/lib/seoHelper";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generateDynamicMetadata({ type: "work", slug });
}

const WORK_DETAIL_QUERY = defineQuery(`*[_type == "work" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  client,
  year,
  shortDesc,
  description,
  "heroMedia": heroMedia.asset->url,
  "heroAspectRatio": heroMedia.asset->metadata.dimensions.aspectRatio,
  beforeAfter {
    "before": before.asset->url,
    "after": after.asset->url
  },
  stickySections[] {
    title,
    content,
    "image": image.asset->url
  },
  "gallery": gallery[] {
    "url": asset->url,
    "aspectRatio": asset->metadata.dimensions.aspectRatio
  },
  metrics
}`);

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: work } = await sanityFetch({
    query: WORK_DETAIL_QUERY,
    params: { slug },
  });

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white text-2xl">The work you are looking for could not be found.</div>;
  }

  const typedWork = work as SanityWorkDetail;
  const hasBeforeAfter = Boolean(typedWork.beforeAfter?.before && typedWork.beforeAfter?.after);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">

      {/* 1. The Context: Hook สายตาและปูเรื่องราว */}
      <WorkHero work={typedWork} />
      <WorkDescription description={typedWork.description ?? ""} />

      {/* 2. The Journey: เล่ากระบวนการทำงาน ท่าไม้ตายของ Agency */}
      <Scrollytelling sections={typedWork.stickySections ?? []} />

      {/* 3. The Visual Proof: โชว์ความเปลี่ยนแปลงและผลงาน */}
      {hasBeforeAfter ? <BeforeAfterSlider beforeAfter={typedWork.beforeAfter!} /> : null}
      <WorkGallery gallery={typedWork.gallery ?? []} title={typedWork.title || "Work Gallery"} />

      {/* 4. The Impact: หมัดฮุกด้วยตัวเลขสถิติความสำเร็จ */}
      <WorkMetrics metrics={typedWork.metrics ?? []} />

      {/* 5. The Next Step: Call to action */}
      <div className="py-24 text-center relative z-20 bg-[#050505]">
        <Link href="/works" className="inline-block border border-white/20 px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          View All Works
        </Link>
      </div>

    </div>
  );
}
