import React from "react";
import Link from "next/link";

export default function WorkHero({ work }: { work: any }) {
  if (!work) return null;

  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 max-w-[1920px] mx-auto relative overflow-hidden bg-[#050505]">
      {/* 🌟 2. เพิ่มส่วนของภาพพื้นหลัง (Background Image Section) */}
      <div className="absolute inset-0 z-0">
        {work.heroMedia && (
          // ใส่คลาส grayscale (ขาวดำ) และ opacity-[0.07] (จางมากๆ เกือบมองไม่เห็น)
          <img
            src={work.heroMedia}
            alt=""
            className="w-full h-full object-cover grayscale opacity-[0.07]"
          />
        )}
        {/* ใส่ Gradient ดำทับไล่สีจากล่างขึ้นบน เพื่อให้คอนเทนต์ด้านล่างยังอ่านง่าย */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
      </div>
      <div className="flex flex-col md:flex-row w-full gap-12 md:gap-24 items-center relative z-10">

        {/* ฝั่งซ้าย: เนื้อหา */}
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <Link href="/works" className="text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-[#F48120] transition-colors mb-8 inline-flex items-center gap-2">
            &larr; Back to Works
          </Link>

          {/* 🌟 1. แก้ไข H1: ปรับ text ให้เล็กลงนิดนึง และเปลี่ยน leading-[0.9] เป็น leading-tight เพื่อไม่ให้ตัวหนังสือขาดตอนขึ้นบรรทัดใหม่ */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-tight tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#004965] break-words py-2">
            {work.title}
          </h1>

          {/* 🌟 2. เพิ่ม Client / Year แบบคลีนๆ เข้ากับดีไซน์เดิม */}
          {(work.client || work.year) && (
            <div className="flex items-center gap-6 mb-8 border-l-2 border-[#004965] pl-6">
              {work.client && (
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Client</p>
                  <p className="text-sm text-gray-300 font-medium">{work.client}</p>
                </div>
              )}
              {work.year && (
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Year</p>
                  <p className="text-sm text-gray-300 font-medium">{work.year}</p>
                </div>
              )}
            </div>
          )}

          {/* Description เดิมของน้อง */}
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            {work.shortDesc || work.description}
          </p>
        </div>

        {/* ฝั่งขวา: รูปภาพ (โครงสร้างเดิมของน้องเป๊ะๆ) */}
        <div className="w-full md:w-7/12 aspect-[4/3] md:aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl">
          {work.heroMedia ? (
            <img src={work.heroMedia} alt={work.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">Video / Image Placeholder</div>
          )}
        </div>

      </div>
    </section>
  );
}