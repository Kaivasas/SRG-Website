import React from "react";
import Link from "next/link";
import { worksData } from "@/app/data/worksData";

export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  
  // ค้นหาข้อมูลจาก slug ใน URL
  const work = worksData.find((w) => w.slug === slug);

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white text-2xl">ไม่พบผลงานที่คุณค้นหา</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-32 pb-32">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* ปุ่มย้อนกลับ */}
        <Link href="/works" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12 group">
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">&larr;</span> กลับหน้ารวมผลงาน
        </Link>

        {/* หัวข้อโปรเจกต์ */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{work.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm tracking-widest uppercase">
            <span className="text-blue-500 border border-blue-500/30 bg-blue-500/10 px-4 py-2 rounded-full">Client: {work.client}</span>
            <span className="text-gray-400 border border-white/10 px-4 py-2 rounded-full">Year: {work.year}</span>
          </div>
        </div>

        {/* รูปภาพใหญ่ (Hero Image) */}
        <div className="w-full aspect-video bg-gray-900 rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
          <img src={work.thumbnail} alt={work.title} className="w-full h-full object-cover" />
        </div>

        {/* เนื้อหา */}
        <div className="max-w-3xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-300">About the project</h3>
          <p className="text-lg text-gray-400 leading-relaxed font-light">
            {work.description}
          </p>
        </div>

      </div>
    </div>
  );
}