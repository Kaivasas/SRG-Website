import React from "react";
import Image from "next/image";

// 🌟 สร้าง Type มารับข้อมูลแบบใหม่ที่มี aspectRatio
export interface GalleryImage {
  url: string;
  aspectRatio: number;
}

export default function WorkGallery({ gallery, title }: { gallery: GalleryImage[]; title: string }) {
  if (!gallery || gallery.length === 0) return null;

  // 🌟 1 & 2. เช็คว่าภาพเป็นแนวนอนหรือแนวตั้ง
  // ถ้ารูปมีค่าความกว้าง มากกว่าหรือเท่ากับ ความสูง (สัดส่วน >= 1) = แนวนอน
  const landscapes = gallery.filter((img) => img.aspectRatio >= 1);
  // ถ้ารูปแคบกว่า (สัดส่วน < 1) = แนวตั้ง
  const portraits = gallery.filter((img) => img.aspectRatio < 1);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505]">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-12 md:mb-16">
        <div className="w-12 h-[1px] bg-white/20"></div>
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
          Project Gallery
        </h2>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        
        {/* 🌟 3. ภาพแนวนอน (โชว์ก่อน เป็นภาพขนาดใหญ่) */}
        {landscapes.length > 0 && (
          <div className="flex flex-col gap-6 md:gap-12">
            {landscapes.map((img, index) => (
              <div 
                key={`land-${index}`} 
                className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-sm group border border-white/5"
              >
                <Image 
                  src={img.url} 
                  alt={`${title} Landscape ${index + 1}`} 
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0" 
                />
              </div>
            ))}
          </div>
        )}

        {/* 🌟 4, 5, 6. ภาพแนวตั้ง (เรียงต่อกัน จัดกลาง) */}
        {portraits.length > 0 && (
          // ใช้ flex-wrap และ justify-center คือคำตอบของโจทย์ข้อ 6 ครับ!
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {portraits.map((img, index) => (
              <div 
                key={`port-${index}`} 
                // กำหนดความกว้างบนคอมพิวเตอร์ให้เป็น 1 ใน 3 (ประมาณ 33.33%) ของพื้นที่ลบด้วยช่องว่าง
                className="relative w-full md:w-[calc(33.333%-16px)] aspect-[3/4] overflow-hidden rounded-sm group border border-white/5"
              >
                <Image 
                  src={img.url} 
                  alt={`${title} Portrait ${index + 1}`} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0" 
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}