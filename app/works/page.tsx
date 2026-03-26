import React from "react";
import Link from "next/link";
import { worksData } from "@/app/data/worksData";

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500 selection:text-white pb-32">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Section (อิงจากภาพแรก: Where Ideas became Reality) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 overflow-hidden">
        {/* วิดีโอพื้นหลัง หรือ ภาพนิ่ง */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 grayscale">
            <source src="/assets/7020050_Abstract_Background_3840x2160.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full mt-20">
          <h1 className="text-6xl md:text-[8rem] font-medium leading-none tracking-tight mb-8">
            Where Ideas <br />
            <span className="text-gray-400">became Reality.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light tracking-wide">
            A curated selection of technical challenges solved and visions brought to life.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. Grid Section (อิงจากภาพที่สอง: รองรับการเพิ่มงานแบบ Dynamic) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {worksData.map((work) => (
            // กดที่การ์ดแล้วจะ Link ไปที่หน้ารายละเอียด
            <Link 
              key={work.slug} 
              href={`/works/${work.slug}`}
              className="group block bg-[#0a0f16] border border-white/10 rounded-3xl p-6 md:p-8 transition-all hover:bg-white/5 hover:border-white/20"
            >
              {/* ส่วนบน: ชื่อและ Tags */}
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {work.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 font-light tracking-widest uppercase">
                  # {work.tags.join(" , ")}
                </p>
              </div>

              {/* ส่วนล่าง: รูปภาพ (ขยายเมื่อ Hover) */}
              <div className="w-full aspect-video md:aspect-[4/3] bg-black rounded-2xl overflow-hidden relative">
                <img 
                  src={work.thumbnail} 
                  alt={work.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* ปุ่ม View Project ที่ลอยขึ้นมาตอนชี้เมาส์ */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <span className="bg-black/70 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl border border-white/10">
                    View Project
                  </span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </section>

    </div>
  );
}