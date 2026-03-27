"use client";
import React, { useState } from "react";

export default function BeforeAfterSlider({ beforeAfter }: { beforeAfter: any }) {
  const [sliderPos, setSliderPos] = useState(50);

  if (!beforeAfter || !beforeAfter.before || !beforeAfter.after) return null;

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-[#FAD337]">Transformation</h2>
      </div>
      <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <img src={beforeAfter.after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
        <img
          src={beforeAfter.before} alt="Before"
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
  );
}