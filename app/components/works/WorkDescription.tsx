import React from "react";

export default function WorkDescription({ description }: { description: string }) {
  if (!description) return null;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        
        {/* ฝั่งซ้าย: หัวข้อนำสายตา */}
        <div className="md:col-span-4 flex items-start">
          <div className="flex items-center gap-4 mt-2 md:mt-1"> {/* ปรับ margin นิดนึงให้ตรงกับบรรทัดแรกของข้อความ */}
            <div className="w-8 h-[1px] bg-[#F48120]"></div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#F48120]">
              Project Overview
            </h2>
          </div>
        </div>

        {/* ฝั่งขวา: ปรับขนาดลงให้พอดี และเพิ่มช่องไฟระหว่างบรรทัด */}
        <div className="md:col-span-8">
          <p className="text-base md:text-lg lg:text-xl font-light leading-[1.8] text-white/70 whitespace-pre-line">
            {description}
          </p>
        </div>
        
      </div>
    </section>
  );
}