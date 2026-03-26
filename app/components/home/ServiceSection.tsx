"use client";

import React from "react";

export default function ServiceSection() {
  {/* ------------------------------------------------------------- */ }
  {/* Services Section (Premium Sticky Cards) */ }
  {/* ------------------------------------------------------------- */ }
  {/* ปรับลด padding จาก py-24 md:py-32 เป็น py-16 md:py-20 */ }
  return (
    <section id="services" className="py-16 md:py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 relative">
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-2xl">our services</h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-transparent mx-auto mt-6"></div>
        </div>

        {/* ปรับลด padding-bottom จาก pb-32 เป็น pb-16 */}
        <div className="flex flex-col gap-8 pb-16">
          {/* Premium Card 1 */}
          <div className="sticky top-[15vh] bg-linear-to-br from-[#002a3a]/90 to-black/90 backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(0,73,101,0.5)]">
            <div className="mb-8 md:mb-0 md:pr-12 w-full md:w-1/2">
              <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">01 / Marketing</span>
              <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">Digital Marketing</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">ยกระดับแบรนด์ของคุณด้วยกลยุทธ์การตลาดออนไลน์ที่วัดผลได้จริง เข้าถึงกลุ่มเป้าหมายอย่างแม่นยำและยั่งยืน</p>
              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase">Discover More</button>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-80 rounded-3xl overflow-hidden relative group shadow-2xl">
              <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-transparent transition duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Marketing" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            </div>
          </div>

          {/* Premium Card 2 */}
          <div className="sticky top-[18vh] bg-linear-to-br from-[#001f2b]/95 to-black/95 backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(0,73,101,0.5)]">
            <div className="mb-8 md:mb-0 md:pr-12 w-full md:w-1/2">
              <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">02 / Development</span>
              <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">Web & App Dev</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">ออกแบบและพัฒนาเว็บไซต์และแอปพลิเคชันที่ทันสมัย ใช้งานง่าย ตอบโจทย์ทุกธุรกิจของคุณด้วยเทคโนโลยีล่าสุด</p>
              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase">Discover More</button>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-80 rounded-3xl overflow-hidden relative group shadow-2xl">
              <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-transparent transition duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Development" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            </div>
          </div>

          {/* Premium Card 3 */}
          <div className="sticky top-[21vh] bg-linear-to-br from-black to-gray-900 backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
            <div className="mb-8 md:mb-0 md:pr-12 w-full md:w-1/2">
              <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">03 / Strategy</span>
              <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">Brand Strategy</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">สร้างตัวตนของแบรนด์ให้แข็งแกร่งและเป็นที่จดจำ พร้อมเติบโตอย่างยั่งยืนในระยะยาวท่ามกลางการแข่งขัน</p>
              <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase">Discover More</button>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-80 rounded-3xl overflow-hidden relative group shadow-2xl">
              <div className="absolute inset-0 bg-gray-500/20 group-hover:bg-transparent transition duration-500 z-10"></div>
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" alt="Strategy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}