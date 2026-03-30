import React from "react";
import Link from "next/link";

export default function WorkHero({ work }: { work: any }) {
  if (!work) return null;

  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 max-w-[1920px] mx-auto relative overflow-hidden bg-[#050505]">
      
      {/* ส่วนพื้นหลัง: ภาพ grayscale จางๆ + Gradient (แบบเดิมที่น้องชอบ) */}
      <div className="absolute inset-0 z-0">
        {work.heroMedia && (
          <img
            src={work.heroMedia}
            alt=""
            className="w-full h-full object-cover grayscale opacity-[0.07]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
      </div>

      <div className="flex flex-col md:flex-row w-full gap-12 md:gap-24 items-center relative z-10">

        {/* ฝั่งซ้าย: เนื้อหา */}
        <div className="w-full md:w-5/12 flex flex-col justify-center relative z-10">
          
          {/* 🌟 ส่วนลายน้ำ (Watermark): แก้โจทย์ 3 ข้อรวด 🌟
              - [โจทย์ 1] `whitespace-nowrap`: ยาวเป็นเส้นเดียว ไม่ตัดคำ
              - [โจทย์ 2] `left-[20%]`: ขยับไปทางขวาของถังครอบ
              - [โจทย์ 3] `text-7xl md:text-[150px] lg:text-[220px]`: เพิ่มขนาดตัวอักษรให้ใหญ่เบิ้ม
              - ใส่ `rotate-[-10deg]` ให้เฉียงนิดหน่อยเพิ่มความ Premium
          */}
          <span className="absolute left-[20%] top-[10%] whitespace-nowrap text-7xl md:text-[150px] lg:text-[220px] font-extrabold uppercase text-[#004965]/10 z-0 select-none pointer-events-none rotate-[-10deg]">
            {work?.title?.split(" ")[0]} {/* ดึงคำแรกมาทำลายน้ำ */}
          </span >

          {/* ใส่ relative z-10 ครอบเนื้อหาฝั่งซ้ายทั้งหมด เพื่อให้มันลอยอยู่เหนือลายน้ำ */}
          <div className="relative z-10">
            <Link href="/works" className="text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-[#F48120] transition-colors mb-8 inline-flex items-center gap-2">
              &larr; Back to Works
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-tight tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#004965] break-words py-2">
              {work.title}
            </h1>

            {/* Client / Year */}
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

            {/* Description (ไม่มี .map แล้ว แก้ Error เด็ดขาด) */}
            <p className="whitespace-pre-line text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              {work.shortDesc || work.description}
            </p>
          </div>
        </div>

        {/* ฝั่งขวา: รูปภาพ (โครงสร้างเดิมของน้องเป๊ะๆ) */}
        <div className="w-full md:w-7/12 aspect-[4/3] md:aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl z-10">
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