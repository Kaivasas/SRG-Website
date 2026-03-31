import React from "react";
import Image from "next/image";

export default function ServiceHero({ service }: { service: any }) {
  return (
    <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto min-h-[80vh] flex items-center relative z-10">
      
      {/* 🌟 ปรับ gap ให้กว้าง และใช้ items-stretch เพื่อให้กล่องข้อความและรูปดูสมดุลกัน */}
      <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-24 w-full">
        
        {/* 🌟 1. ฝั่งรูปภาพ: ย้ายมาอยู่ลำดับแรก (order-1) เพื่อให้อยู่ซ้ายสุดบนจอคอม */}
        <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] lg:aspect-square bg-[#0a0a0a] overflow-hidden border border-white/10 relative group order-1">
          {service.heroImage && (
            <Image 
              src={service.heroImage} 
              alt={service.title} 
              fill={true}
              priority={true} 
              sizes="(max-width: 768px) 100vw, 50vw"
              // 🌟 อนิเมชั่นแบบนิ่งๆ: ซูมออกเมื่อ Hover
              className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] scale-110 group-hover:scale-100" 
            />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none"></div>
        </div>

        {/* 🌟 2. ฝั่งข้อความ: อยู่ลำดับที่สอง (order-2) อยู่ขวาสุดบนจอคอม */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">
              Service Excellence
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter text-white leading-[1.1]">
            {service.title}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light mb-8 leading-snug">
            {service.subtitle}
          </p>

          {/* ปรับเส้นขีดด้านข้างให้ดูเป็น Agency ที่เนี้ยบขึ้น */}
          <div className="border-l-[1px] border-white/20 pl-8">
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-lg">
              {service.description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}