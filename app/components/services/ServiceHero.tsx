import React from "react";
import Image from "next/image"; // 🌟 1. นำเข้า Image

export default function ServiceHero({ service }: { service: any }) {
  return (
    <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto min-h-[80vh] flex items-center relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full">
        {/* คอนเทนเนอร์มี relative อยู่แล้ว ใช้ fill ได้เลย */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] bg-gray-900 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10 relative group">
          {service.heroImage && (
            // 🌟 2. เปลี่ยน img เป็น Image และใส่ priority
            <Image 
              src={service.heroImage} 
              alt={service.title} 
              fill={true}
              priority={true} 
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">{service.title}</h1>
          <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#F48120] font-bold mb-6">{service.subtitle}</p>
          <p className="text-lg text-white/80 leading-relaxed font-light border-l-4 border-blue-500 pl-6">{service.description}</p>
        </div>
      </div>
    </section>
  );
}