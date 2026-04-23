import React from "react";
import Image from "next/image";
import type { SanityServiceDetail } from "@/app/types/sanity";

// ภาพ Fallback กรณีที่ใน Sanity ไม่ได้ลงรูปไว้
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80";

interface WhyChooseUsProps {
  service: SanityServiceDetail;
}

export default function WhyChooseUs({ service }: WhyChooseUsProps) {
  // ป้องกัน Error กรณีไม่มีข้อมูล benefits
  if (!service.benefits || service.benefits.length === 0) return null;

  return (
    // 🌟 ปรับลด Padding ด้านบน/ล่าง ลงเล็กน้อยเพื่อให้กระชับขึ้น
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start relative">

        {/* =============================================================
           ฝั่งซ้าย: โซน Sticky (หัวข้อ + ภาพ)
           ============================================================= */}
        {/* 🌟 เปลี่ยน lg:top-32 เป็น lg:top-24 เพื่อให้ขยับขึ้นไปชิดด้านบนมากขึ้น */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 flex flex-col">
          
          {/* --- 1. หัวข้อ "Why choose us..." --- */}
          {/* 🌟 ลดระยะห่างด้านล่างจาก mb-12 เป็น mb-8 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-blue-500" />
              <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">
                Why Choose Us
              </span>
            </div>
            {/* 🌟 ลดขนาดตัวอักษรลงเป็น lg:text-5xl (จากเดิม 6xl) */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white leading-[1.1]">
              {service.whyTitle}
            </h2>
          </div>

          {/* --- 2. ภาพประกอบ --- */}
          {/* 🌟 เปลี่ยนมาใช้ aspect-video (สัดส่วน 16:9) เพื่อให้ภาพกว้างและไม่สูงจนล้นจอ */}
          <div className="aspect-video relative overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-xl group shadow-2xl">
            <Image
              src={service.benefitImage || FALLBACK_IMAGE}
              alt={service.whyTitle || "Why choose us"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
            />
            {/* Overlay บางๆ เพิ่มความลึก */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
          </div>
        </div>

        {/* =============================================================
           ฝั่งขวา: รายการหัวข้อข้อดี (Scroll เลื่อนได้ตามปกติ)
           ============================================================= */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10 md:gap-14 pt-8 lg:pt-0">
          {service.benefits.map((benefitTitle, index) => {
            // เติมเลข 0 ด้านหน้า (เช่น 01, 02)
            const autoNumber = String(index + 1).padStart(2, "0");
            return (
              <div key={index} className="flex gap-6 group items-center border-b border-white/10 pb-10 last:border-b-0">
                {/* 🌟 ปรับขนาดและสีของตัวเลขให้ดูสวยเข้ากับดีไซน์ในภาพ */}
                <span className="text-4xl md:text-5xl font-black text-white/20 tracking-tighter transition-colors duration-500 group-hover:text-white/60">
                  {autoNumber}
                </span>
                
                {/* หัวข้อข้อดี */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors duration-300">
                    {benefitTitle}
                  </h3>
                </div>
              </div>
            );
          })}
          {/* เพิ่มพื้นที่ด้านล่างเพื่อให้ Scroll ข้อสุดท้ายพ้นขอบภาพฝั่งซ้ายสวยๆ */}
          <div className="h-[20vh]" />
        </div>

      </div>
    </section>
  );
}