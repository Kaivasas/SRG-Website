"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { worksData } from "@/app/data/worksData";

export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const work = worksData.find((w) => w.slug === slug);

  // State สำหรับ Before/After Slider
  const [sliderPos, setSliderPos] = useState(50);

  // State & Ref สำหรับ Sticky Scroll Section
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ระบบเช็คว่าตอนนี้ผู้ใช้เลื่อนหน้าจอมาถึงหัวข้อไหนแล้ว (Challenge, Approach, Solution)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // หา index ของกล่องที่กำลังแสดงผลอยู่
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // ทริกเกอร์เมื่อกล่องเข้ามาอยู่ตรงกลางจอ
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [work]);

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white text-2xl">ไม่พบผลงานที่คุณค้นหา</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-32">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Section (แบ่งซ้ายขวาตาม Wireframe) */}
      {/* ------------------------------------------------------------- */}
      <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-12 md:gap-24 items-center">
          
          {/* ซ้าย: ข้อความ */}
          <div className="w-full md:w-5/12 flex flex-col justify-center">
            <Link href="/works" className="text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-[#F48120] transition-colors mb-8 inline-flex items-center gap-2">
              &larr; Back to Works
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
              {work.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed border-l-4 border-[#004965] pl-6">
              {work.shortDesc || work.description}
            </p>
          </div>

          {/* ขวา: ภาพหรือวิดีโอ */}
          <div className="w-full md:w-7/12 aspect-[4/3] md:aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl">
            {work.heroMedia ? (
               <img src={work.heroMedia} alt={work.title} className="w-full h-full object-cover" />
            ) : (
               <div className="flex items-center justify-center h-full text-gray-600">Video / Image Placeholder</div>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. Before / After Slider Section */}
      {/* ------------------------------------------------------------- */}
      {work.beforeAfter && (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-[#FAD337]">Transformation</h2>
          </div>
          
          <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* ภาพ After (อยู่ข้างล่าง เป็นพื้นหลัง) */}
            <img src={work.beforeAfter.after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
            
            {/* ภาพ Before (อยู่ข้างบน ถูกตัดขอบด้วย clipPath ตามค่า sliderPos) */}
            <img 
              src={work.beforeAfter.before} 
              alt="Before" 
              className="absolute inset-0 w-full h-full object-cover grayscale" 
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} 
              draggable="false"
            />
            
            {/* Input Range ที่ซ่อนไว้ใช้จับการเลื่อน */}
            <input 
              type="range" min="0" max="100" value={sliderPos} 
              onChange={(e) => setSliderPos(Number(e.target.value))} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" 
            />
            
            {/* เส้นแบ่งตรงกลาง (Slider Handle) */}
            <div className="absolute top-0 bottom-0 w-1 bg-[#F48120] pointer-events-none z-10 flex items-center justify-center" style={{ left: `${sliderPos}%` }}>
              <div className="w-8 h-8 bg-[#F48120] rounded-full flex items-center justify-center shadow-lg text-black font-bold text-xs">
                &lt;&gt;
              </div>
            </div>

            {/* ป้ายบอกข้อความ */}
            <span className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest font-bold uppercase border border-white/10 pointer-events-none">Before</span>
            <span className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest font-bold uppercase border border-white/10 pointer-events-none text-[#FAD337]">After</span>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. Sticky Scroll Section (Challenge / Approach / Solution) */}
      {/* ------------------------------------------------------------- */}
      {work.stickySections && (
        <section className="relative w-full max-w-[1920px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 items-start">
          
          {/* ฝั่งซ้าย: รูปภาพที่จะ Sticky อยู่กับที่ (โชว์รูปตาม activeSection) */}
          <div className="w-full md:w-1/2 md:sticky md:top-32 aspect-square bg-[#0a0f16] rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500">
            {work.stickySections.map((section, index) => (
              <img 
                key={section.id}
                src={section.image} 
                alt={section.title} 
                // ซ่อนรูปที่ไม่ได้แอคทีฟ โชว์แค่รูปปัจจุบัน
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === activeSection ? 'opacity-100' : 'opacity-0'}`} 
              />
            ))}
          </div>

          {/* ฝั่งขวา: เนื้อหาที่จะถูกเลื่อน (Scroll) */}
          <div className="w-full md:w-1/2 flex flex-col pb-[30vh]">
            {work.stickySections.map((section, index) => (
              <div 
                key={section.id}
                // ยัด ref เข้าไปในอาร์เรย์ เพื่อให้ IntersectionObserver รู้จัก
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={`min-h-[60vh] flex flex-col justify-center transition-opacity duration-500 ${index === activeSection ? 'opacity-100' : 'opacity-30'}`}
              >
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-[#004965] drop-shadow-md">
                  {section.title}
                </h2>
                <ul className="space-y-4 border-l-2 border-[#939598] pl-6">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. Gallery Section (ภาพ 1 ใหญ่ บน, 2 เล็ก ล่าง) */}
      {/* ------------------------------------------------------------- */}
      {work.gallery && work.gallery.length === 3 && (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ภาพใหญ่ (กินพื้นที่ 2 คอลัมน์) */}
            <div className="col-span-1 md:col-span-2 aspect-video bg-gray-900 overflow-hidden border border-white/5">
              <img src={work.gallery[0]} alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* ภาพเล็ก ซ้าย-ขวา */}
            <div className="aspect-square bg-gray-900 overflow-hidden border border-white/5">
              <img src={work.gallery[1]} alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-square bg-gray-900 overflow-hidden border border-white/5">
              <img src={work.gallery[2]} alt="Gallery 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. Metrics / Results Section */}
      {/* ------------------------------------------------------------- */}
      {work.metrics && (
        <section className="py-32 px-6 bg-[#001f2b] border-y border-white/10 mt-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {work.metrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center justify-center pt-8 md:pt-0">
                <span className="text-6xl md:text-8xl font-black text-[#FAD337] mb-4 drop-shadow-lg tracking-tighter">
                  {metric.value}
                </span>
                <span className="text-lg md:text-xl font-medium tracking-[0.2em] text-white/80 uppercase">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Bottom กลับไปหน้ารวม */}
      <div className="py-24 text-center">
        <Link href="/works" className="inline-block border border-white/20 px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          View All Works
        </Link>
      </div>

    </div>
  );
}