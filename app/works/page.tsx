import React from "react";
import Link from "next/link";
import { worksData } from "@/app/data/worksData";

export default function WorksPage() {
  return (
    // สีพื้นหลังดำสนิท ขับให้ผลงานโดดเด่น / เวลาลากเมาส์คลุมตัวหนังสือจะเป็นสีส้มแบรนด์
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Section (Brutalist Typography Style) */}
      {/* ------------------------------------------------------------- */}
      {/* เอาวิดีโอออก ปล่อยพื้นหลังคลีนๆ เล่นกับตัวหนังสือยักษ์ */}
      <section className="relative min-h-[50vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-48">
        <div className="max-w-screen-2xl mx-auto w-full">
          <h1 className="text-[12vw] md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase mb-6">
            Selected <br />
            {/* ดึงสีน้ำเงินแบรนด์มาใช้กับคำว่า Works */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004965] to-[#005a72]">Works.</span>
          </h1>
          
          <div className="w-full h-[1px] bg-white/10 mt-16 mb-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <p className="text-lg md:text-xl text-[#939598] max-w-2xl font-light tracking-wide">
               Empowering your business with integrated solutions designed for sustainable growth and tangible results.
             </p>
             <span className="text-sm font-bold uppercase tracking-widest text-[#F48120]">Sustain Republix</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. Works Grid (Edge-to-Edge Dentsu Style) */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full relative z-10 border-t border-white/10">
        {/* ไม่มีช่องว่างระหว่างการ์ด (gap-0) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {worksData.map((work, index) => (
            <Link 
              key={work.slug} 
              href={`/works/${work.slug}`}
              // สร้างเส้นขอบบางๆ แบ่งช่องแบบตารางเนียบๆ
              className={`group block relative overflow-hidden aspect-square md:aspect-[4/3] border-b border-white/10 ${index % 2 === 0 ? 'md:border-r' : ''}`}
            >
              {/* ภาพพื้นหลัง: วางเต็มช่อง ดรอปสีและแสงลงเพื่อให้ตัวหนังสือชัด */}
              <div className="absolute inset-0 bg-black z-10 opacity-50 group-hover:opacity-20 transition-opacity duration-700 ease-in-out"></div>
              <img 
                src={work.thumbnail} 
                alt={work.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-0" 
              />
              
              {/* ข้อมูลทับรูป (Typography-driven) */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
                
                {/* ด้านบน: Tags และ Arrow */}
                <div className="flex justify-between items-start overflow-hidden">
                  <p className="text-xs md:text-sm text-white/70 font-medium tracking-[0.2em] uppercase">
                    {work.tags.slice(0, 3).join(" • ")}
                    {work.tags.length > 3 ? " ..." : ""}
                  </p>
                  
                  {/* ลูกศรเฉียงขึ้น (Arrow) จะสไลด์ลงมาพร้อมเปลี่ยนเป็นสีส้มแบรนด์เมื่อ Hover */}
                  <span className="text-3xl font-light transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] text-[#F48120]">
                    ↗
                  </span>
                </div>

                {/* ด้านล่าง: ชื่อผลงานยักษ์ใหญ่ */}
                <div className="overflow-hidden">
                  {/* เปลี่ยนสีเป็นเหลืองแบรนด์เมื่อ Hover */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#FAD337] transition-colors duration-500">
                    {work.title}
                  </h3>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </section>

    </div>
  );
}