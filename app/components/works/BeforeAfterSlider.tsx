"use client";
import React, { useState } from "react";
import Image from "next/image";
import type { SanityBeforeAfter } from "@/app/types/sanity";

export default function BeforeAfterSlider({
  beforeAfter,
}: {
  beforeAfter: SanityBeforeAfter;
}) {
  const [sliderPos, setSliderPos] = useState(50);

  if (!beforeAfter || !beforeAfter.before || !beforeAfter.after) return null;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 bg-[#050505]">
      
      {/* 🌟 1. Editorial Header (สไตล์เดียวกับ Workflow และ Service) */}
      <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">
              Visual Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.1]">
            Transformation
          </h2>
        </div>
        <p className="text-white/50 text-base md:text-lg max-w-sm font-light leading-relaxed pb-2">
          Drag the slider to compare the results and see the transformation before and after our work.
        </p>
      </div>

      {/* 🌟 2. ตัว Slider (ขอบคมขึ้น, ไร้เงา, เน้นความดิบ) */}
      <div className="relative w-full aspect-[4/3] md:aspect-video bg-[#0a0f16] rounded-sm overflow-hidden cursor-ew-resize select-none border border-white/10 group">
        
        {/* รูป After (รูปสี / ภาพด้านล่าง) */}
        <Image 
          src={beforeAfter.after} 
          alt="After" 
          fill={true}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover" 
          draggable="false" 
        />
        
        {/* รูป Before (รูปขาวดำ / ภาพด้านบนที่ถูก Clip Path) */}
        <Image
          src={beforeAfter.before} 
          alt="Before"
          fill={true}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover grayscale"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} 
          draggable="false"
        />

        {/* Input สำหรับรับค่าการเลื่อน (ซ่อนไว้แต่ใช้งานได้) */}
        <input
          type="range" min="0" max="100" value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />

        {/* 🌟 3. เส้นแบ่งและปุ่มจับ (Glassmorphism & Thin Line) */}
        <div 
          className="absolute top-0 bottom-0 w-[1px] bg-white/40 pointer-events-none z-10 flex items-center justify-center transition-transform duration-75" 
          style={{ left: `${sliderPos}%` }}
        >
          {/* ปุ่มจับ (Knob) ตรงกลาง */}
          <div className="w-12 h-12 backdrop-blur-xl bg-white/10 border border-white/30 rounded-full flex items-center justify-center shadow-2xl text-white/80 transition-transform duration-300 group-hover:scale-110">
            {/* ไอคอนลูกศรแบบ Minimal แทน < > */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </div>

        {/* 🌟 4. Labels แบบแพง (Typography + Mix Blend Mode) */}
        {/* mix-blend-difference จะทำให้ตัวหนังสืออ่านออกเสมอ ไม่ว่าพื้นหลังจะเป็นสีขาวหรือดำ */}
        <span className="absolute bottom-6 left-6 text-xs md:text-sm tracking-[0.3em] font-light uppercase text-white/80 pointer-events-none mix-blend-difference">
          Before
        </span>
        <span className="absolute bottom-6 right-6 text-xs md:text-sm tracking-[0.3em] font-light uppercase text-white pointer-events-none mix-blend-difference">
          After
        </span>

      </div>
    </section>
  );
}
