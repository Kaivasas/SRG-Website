"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { worksData } from "@/app/data/worksData";

export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const work = worksData.find((w) => w.slug === slug);

  const [sliderPos, setSliderPos] = useState(50);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ปรับเซ็นเซอร์ให้จับจุดกึ่งกลางของบล็อกที่ซ่อนอยู่ (เพื่อให้เปลี่ยนสไลด์แม่นยำ)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      // threshold: 0.5 หมายถึงต้องเลื่อนให้บล็อกที่ซ่อนอยู่เข้ามาในจอเกิน 50% ถึงจะเปลี่ยนสไลด์
      { threshold: 0.5 } 
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [work]);

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white text-2xl">ไม่พบผลงานที่คุณค้นหา</div>;
  }

  // คำนวณความสูงของคอนเทนเนอร์หลัก (1 สไลด์ = 100vh)
  const totalSlides = work.stickySections ? work.stickySections.length : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-12 md:gap-24 items-center">
          <div className="w-full md:w-5/12 flex flex-col justify-center">
            <Link href="/works" className="text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-[#F48120] transition-colors mb-8 inline-flex items-center gap-2">
              &larr; Back to Works
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#004965]">
              {work.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed border-l-4 border-[#004965] pl-6">
              {work.shortDesc || work.description}
            </p>
          </div>
          <div className="w-full md:w-7/12 aspect-[4/3] md:aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl">
            {work.heroMedia ? (
               <img src={work.heroMedia} alt={work.title} className="w-full h-full object-cover" />
            ) : (
               <div className="flex items-center justify-center h-full text-gray-600">Video / Image Placeholder</div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Before / After Slider Section */}
      {work.beforeAfter && (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-[#FAD337]">Transformation</h2>
          </div>
          <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <img src={work.beforeAfter.after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
            <img 
              src={work.beforeAfter.before} alt="Before" 
              className="absolute inset-0 w-full h-full object-cover grayscale" 
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} draggable="false"
            />
            <input 
              type="range" min="0" max="100" value={sliderPos} 
              onChange={(e) => setSliderPos(Number(e.target.value))} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" 
            />
            <div className="absolute top-0 bottom-0 w-1 bg-[#F48120] pointer-events-none z-10 flex items-center justify-center" style={{ left: `${sliderPos}%` }}>
              <div className="w-8 h-8 bg-[#F48120] rounded-full flex items-center justify-center shadow-lg text-black font-bold text-xs">&lt;&gt;</div>
            </div>
            <span className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest font-bold uppercase border border-white/10 pointer-events-none">Before</span>
            <span className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest font-bold uppercase border border-white/10 pointer-events-none text-[#FAD337]">After</span>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. PURE SLIDE PRESENTATION MODE (แก้ปัญหาของซ้อน 100%) */}
      {/* ------------------------------------------------------------- */}
      {work.stickySections && (
        // กำหนดความสูงของ Section นี้ตามจำนวนสไลด์ (เช่น 3 สไลด์ = 300vh) เพื่อให้มีพื้นที่ในการไถเมาส์
        <section className="relative w-full" style={{ height: `${totalSlides * 100}vh` }}>
          
          {/* ลู่เลื่อนล่องหน (Invisible Scroll Triggers) วางไว้ด้านหลังสุด */}
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            {work.stickySections.map((section, index) => (
              <div 
                key={`trigger-${section.id}`}
                data-index={index}
                ref={(el) => { if (el) sectionRefs.current[index] = el; }}
                className="w-full h-screen" // 1 สไลด์ใช้ระยะไถเมาส์ 1 หน้าจอเต็มๆ
              />
            ))}
          </div>

          {/* ส่วนแสดงผลหลัก (Visuals) ที่จะเกาะติดหน้าจอ (Sticky) ไว้ตลอดเวลา */}
          <div className="sticky top-0 left-0 w-full h-screen flex flex-col md:flex-row gap-12 items-center justify-center px-6 md:px-12 max-w-[1920px] mx-auto z-10 pointer-events-none">
            
            {/* ฝั่งซ้าย: รูปภาพ (Fade เปลี่ยนรูป) */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl bg-[#0a0f16] border border-white/10">
              {work.stickySections.map((section, index) => (
                <img 
                  key={`img-${section.id}`}
                  src={section.image} 
                  alt={section.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1000ms] ease-in-out ${index === activeSection ? 'opacity-100' : 'opacity-0'}`} 
                />
              ))}
            </div>

            {/* ฝั่งขวา: หัวข้อและกล่องเนื้อหา */}
            <div className="w-full md:w-1/2 relative h-[60vh] md:h-[70vh] flex flex-col justify-center">
              
              {/* === หัวข้อ (Title) === */}
              <div className="relative h-20 md:h-28 w-full mb-6">
                {work.stickySections.map((section, index) => (
                  <h2 
                    key={`title-${section.id}`}
                    // ลบ translate ออกทั้งหมด เหลือแค่ opacity เพื่อให้เปลี่ยนแบบสไลด์โชว์
                    className={`absolute inset-0 text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter text-[#004965] drop-shadow-md transition-opacity duration-[1000ms] ease-in-out ${index === activeSection ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    {section.title}
                  </h2>
                ))}
              </div>

              {/* === กล่องเนื้อหา (The Content Box) === */}
              {/* สร้างโครงกล่องไว้กรอบเดียว เนื้อหาด้านในจะเฟดเปลี่ยนไปมา */}
              <div className="relative w-full flex-1 bg-gradient-to-br from-[#001f2b] to-[#050505] border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,73,101,0.3)]">
                 {work.stickySections.map((section, index) => (
                    <div 
                      key={`box-content-${section.id}`}
                      // วางเนื้อหาซ้อนทับกันด้วย absolute inset-0 (ไม่มีการเลื่อนขึ้นจากข้างล่างเด็ดขาด)
                      className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-opacity duration-[1000ms] ease-in-out ${index === activeSection ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      <ul className="space-y-6 md:space-y-8 border-l-2 border-[#F48120] pl-6 md:pl-8">
                        {section.content.map((item, i) => (
                          <li key={i} className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed drop-shadow-md">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                 ))}
              </div>

            </div>
          </div>

        </section>
      )}

      {/* 4. Gallery Section */}
      {work.gallery && work.gallery.length === 3 && (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2 aspect-video bg-gray-900 overflow-hidden border border-white/5">
              <img src={work.gallery[0]} alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-square bg-gray-900 overflow-hidden border border-white/5">
              <img src={work.gallery[1]} alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-square bg-gray-900 overflow-hidden border border-white/5">
              <img src={work.gallery[2]} alt="Gallery 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </section>
      )}

      {/* 5. Metrics / Results Section */}
      {work.metrics && (
        <section className="py-32 px-6 bg-[#001f2b] border-y border-white/10 relative z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {work.metrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center justify-center pt-8 md:pt-0">
                <span className="text-6xl md:text-8xl font-black text-[#FAD337] mb-4 drop-shadow-lg tracking-tighter">{metric.value}</span>
                <span className="text-lg md:text-xl font-medium tracking-[0.2em] text-white/80 uppercase">{metric.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="py-24 text-center relative z-20 bg-[#050505]">
        <Link href="/works" className="inline-block border border-white/20 px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          View All Works
        </Link>
      </div>

    </div>
  );
}