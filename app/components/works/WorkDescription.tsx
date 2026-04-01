import React from "react";

export default function WorkDescription({ description }: { description: string }) {
  if (!description) return null;

  return (
    // 🌟 1. เพิ่ม border-t border-white/10 เพื่อขีดเส้นแบ่ง Section ให้คมกริบ
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505] border-t border-white/10">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        
        {/* ฝั่งซ้าย: หัวข้อนำสายตา (ปรับให้ดู Minimal และแพงขึ้น) */}
        <div className="md:col-span-4 flex items-start">
          <div className="flex items-center gap-6 mt-2 md:mt-3">
            {/* 🌟 2. ยืดเส้นให้ยาวขึ้นนิดนึง ใช้สีน้ำเงินคุมโทน Agency */}
            <div className="w-12 h-[1px] bg-blue-500"></div>
            {/* 🌟 3. เปลี่ยนสีตัวหนังสือให้ดรอปลง และถ่างช่องไฟ (tracking) ให้กว้างขึ้น */}
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
              Project Overview
            </h2>
          </div>
        </div>

        {/* ฝั่งขวา: เน้น Typography ให้อ่านง่ายและดูเป็น Statement */}
        <div className="md:col-span-8">
          <p className="text-lg md:text-xl lg:text-2xl font-light leading-[1.9] text-white/80 whitespace-pre-line">
            {description}
          </p>
        </div>
        
      </div>
    </section>
  );
}