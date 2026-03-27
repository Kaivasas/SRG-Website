import React from "react";
import Link from "next/link";
// 1. ลบการ import worksData แบบเก่าทิ้งไป และนำเข้า Sanity client แทน
import { client } from "@/sanity/lib/client";

// 2. เติมคำว่า async ไว้หน้า function เพื่อให้มันไปดึงข้อมูลจาก Database ได้
export default async function WorksPage() {
  
  // 3. เขียนคำสั่ง GROQ เพื่อดึงข้อมูลทั้งหมดที่มีประเภทเป็น "work"
  // เรียงลำดับจากใหม่ไปเก่า (order(_createdAt desc))
  // และดึงมาเฉพาะฟิลด์ที่ต้องใช้ในหน้านี้ (เพื่อความรวดเร็วขั้นสุด)
  const query = `*[_type == "work"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "thumbnail": thumbnail.asset->url,
    tags
  }`;

  // 4. สั่งดึงข้อมูลสดๆ จาก Cloud!
  const works = await client.fetch(query);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-48">
        <div className="max-w-screen-2xl mx-auto w-full">
          <h1 className="text-[12vw] md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase mb-6">
            Selected <br />
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

      {/* 2. Works Grid */}
      <section className="w-full relative z-10 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* เปลี่ยนจาก worksData เป็น works ที่เราเพิ่งดึงมา */}
          {works.map((work: any, index: number) => (
            <Link 
              key={work.slug} 
              href={`/works/${work.slug}`}
              className={`group block relative overflow-hidden aspect-square md:aspect-[4/3] border-b border-white/10 ${index % 2 === 0 ? 'md:border-r' : ''}`}
            >
              <div className="absolute inset-0 bg-black z-10 opacity-50 group-hover:opacity-20 transition-opacity duration-700 ease-in-out"></div>
              
              {/* ตรวจสอบว่ามีรูป thumbnail ไหม ถ้าไม่มีให้ใส่สีเทาแทน */}
              {work.thumbnail ? (
                 <img 
                   src={work.thumbnail} 
                   alt={work.title} 
                   className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-0" 
                 />
              ) : (
                 <div className="absolute inset-0 w-full h-full bg-gray-800 z-0"></div>
              )}
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start overflow-hidden">
                  <p className="text-xs md:text-sm text-white/70 font-medium tracking-[0.2em] uppercase">
                    {/* เช็คก่อนว่ามี tags ให้ map ไหม ป้องกันหน้าเว็บพังกรณีที่ลืมกรอก tag ใน admin */}
                    {work.tags && work.tags.length > 0 
                      ? `${work.tags.slice(0, 3).join(" • ")}${work.tags.length > 3 ? " ..." : ""}`
                      : "No Tags"
                    }
                  </p>
                  
                  <span className="text-3xl font-light transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] text-[#F48120]">
                    ↗
                  </span>
                </div>

                <div className="overflow-hidden">
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