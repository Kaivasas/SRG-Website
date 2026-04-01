import React from "react";
import Image from "next/image";

export default function WorkGallery({ gallery, title }: { gallery: string[]; title: string }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505]">
      
      {/* 1. Header สไตล์ Minimal Agency */}
      <div className="flex items-center gap-4 mb-12 md:mb-16">
        <div className="w-12 h-[1px] bg-blue-500"></div>
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
          Project Gallery
        </h2>
      </div>

      {/* 2. ระบบ Dynamic Grid 12 คอลัมน์ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {gallery.map((image: string, index: number) => {
          const total = gallery.length;
          const remainingCount = total - 1; // จำนวนรูปที่เหลือหลังจากรูปแรก
          
          let colSpan = "md:col-span-4"; // ค่าเริ่มต้นสำหรับ 3 คอลัมน์
          let aspectClass = "aspect-[4/3]";

          // --- 🌟 Logic คำนวณขนาดแบบ Dynamic ---
          if (index === 0) {
            // รูปแรกสุด: กางเต็ม 12 ส่วนเสมอ
            colSpan = "md:col-span-12";
            aspectClass = "aspect-video md:aspect-[21/9]";
          } else {
            // จัดการรูปที่เหลือให้เต็มแถวอัตโนมัติ
            if (remainingCount === 1) {
              colSpan = "md:col-span-12"; // ถ้าเหลือรูปเดียว ให้เต็มแถว
              aspectClass = "aspect-video";
            } else if (remainingCount % 2 === 0 && remainingCount < 5) {
              colSpan = "md:col-span-6"; // ถ้าเหลือเลขคู่ (2 หรือ 4 รูป) แบ่งครึ่ง 50/50
              aspectClass = "aspect-video md:aspect-[16/9]";
            } else {
              colSpan = "md:col-span-4"; // กรณีอื่นๆ (3, 5, 6... รูป) แบ่ง 3 คอลัมน์มาตรฐาน
              aspectClass = "aspect-square md:aspect-[4/3]";
            }
          }

          return (
            <div
              key={`gallery-${index}`}
              className={`relative group overflow-hidden rounded-sm border border-white/5 bg-[#0a0f16] ${colSpan} ${aspectClass}`}
            >
              {/* รายละเอียดเลข Plate เล็กๆ เพิ่มความพรีเมียม */}
              <div className="absolute top-4 left-4 z-20 text-[10px] font-medium tracking-widest text-white/20 uppercase">
                Plate // {String(index + 1).padStart(2, '0')}
              </div>

              <Image 
                src={image} 
                alt={`${title} - ${index}`} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0" 
              />
              
              {/* Overlay จางๆ ตอน Hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          );
        })}
      </div>
      
    </section>
  );
}