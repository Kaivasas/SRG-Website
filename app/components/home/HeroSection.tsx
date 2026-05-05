import React from "react";
import Reveal from "@/app/components/Reveal";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 pb-12">
      <div className="text-center w-full px-4 max-w-7xl mx-auto z-10 flex flex-col items-center">
        <Reveal delayMs={0}>
          {/* 🌟 เพิ่ม flex flex-col items-center เพื่อให้จัดกึ่งกลางได้เนียนๆ */}
          {/* 🌟 เพิ่ม relative ตรง h1 เพื่อให้ตัว & ยึดตรงกลางบล็อกนี้ */}
          <h1 className="relative font-black tracking-tighter uppercase leading-[0.9] text-white drop-shadow-2xl flex flex-col items-center">
            
            {/* 🌟 ลายน้ำตัว & ยักษ์: ไว้ตรงกลางเป๊ะๆ ลดความสว่างเหลือแค่ 5% (white/5) */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] sm:text-[25rem] md:text-[35rem] lg:text-[45rem] text-white/20 font-serif italic select-none pointer-events-none -z-10">
              &amp;
            </span>

            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] mb-4 md:mb-6">
              YOUR PARTNER IN
            </span>
            
            {/* เอาตัว & ออกจากตรงนี้แล้ว */}
            <span className="block mb-4 md:mb-8 text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005a72] to-[#F48120] drop-shadow-none relative z-10">GROWTH</span>
            </span>

            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">SUSTAINABLE</span>
            <span className="block mt-2 text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">INNOVATION</span>
            
          </h1>
        </Reveal>

        <p className="mt-10 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wider leading-relaxed">
          We are ready to drive your business forward with sustainable technology and strategies.
        </p>
      </div>
    </section>
  );
}