import React from "react";
// 🌟 1. เพิ่ม Import Image
import Image from "next/image";

export default function WorkGallery({ gallery, title }: { gallery: string[]; title: string }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((image: string, index: number) => {
          const total = gallery.length;
          let isWide = index % 3 === 0;
          let isOrphan = index === total - 1 && index % 3 === 1;

          if (total === 2) {
            isWide = false;
            isOrphan = false;
          }

          return (
            <div
              key={`gallery-${index}`}
              // 🌟 2. เติมคำว่า 'relative' เข้าไปในคลาสนี้ เพื่อไม่ให้ Image fill ล้นออกนอกกรอบ
              className={`relative ${isWide || isOrphan ? 'col-span-1 md:col-span-2 aspect-video' : 'col-span-1 aspect-square md:aspect-[4/3]'} bg-[#0a0f16] rounded-xl overflow-hidden border border-white/5 shadow-lg`}
            >
              {/* 🌟 3. เปลี่ยน img เป็น Image */}
              <Image 
                src={image} 
                alt={`${title} Gallery ${index + 1}`} 
                fill={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-[1500ms] ease-out" 
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}