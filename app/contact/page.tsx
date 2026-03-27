"use client";

import React, { useState, useEffect } from "react";

export default function ContactPage() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#050505] text-white selection:bg-[#F48120] selection:text-white pb-0">

      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Section (Massive Typography) */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-48 pb-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-[1920px] mx-auto">
          <h1 className="text-[14vw] md:text-[11rem] font-black leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl">
            Let's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004965] to-[#005a72]">Collaborate.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#939598] max-w-2xl font-light tracking-wide border-l-4 border-[#FAD337] pl-6 mt-12">
            เราไม่ใช่แค่เพิ่มยอดขาย แต่เราพร้อมจะเป็นส่วนหนึ่งในการผลักดันให้ธุรกิจของคุณเติบโตอย่างยั่งยืน
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. Editorial Content (Image Left, Typography Right) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* ฝั่งซ้าย: รูปภาพทรงสูง (Portrait) สไตล์นิตยสาร */}
        <div className="w-full lg:w-5/12">
          <div className="aspect-[3/4] w-full bg-[#001f2b] overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800&q=80" 
              alt="Our Team" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]" 
            />
            {/* ป้ายชื่อเล็กๆ แปะบนรูป */}
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-6 py-3 border border-white/10">
              <p className="text-white font-bold uppercase tracking-widest text-sm">Sustain Republix</p>
            </div>
          </div>
        </div>

        {/* ฝั่งขวา: ข้อมูลการติดต่อแบบจัดวางอิสระ ไม่มีกรอบกั้น */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            
            {/* คอลัมน์ที่ 1: การติดต่อ */}
            <div>
              <h3 className="text-[#939598] tracking-[0.2em] uppercase text-sm mb-12 border-b border-white/10 pb-4">Contact Info</h3>
              
              <div className="space-y-12">
                <div>
                  <p className="text-[#004965] font-bold uppercase tracking-widest mb-2 text-xs">Phone</p>
                  <p className="text-3xl md:text-4xl font-light hover:text-[#F48120] transition-colors duration-300 cursor-pointer">+66 91 773 5563</p>
                </div>
                
                <div>
                  <p className="text-[#004965] font-bold uppercase tracking-widest mb-2 text-xs">Email</p>
                  <p className="text-xl md:text-2xl font-light hover:text-[#F48120] transition-colors duration-300 cursor-pointer break-words">arthit.p@sustain-republix.com</p>
                  <p className="text-xl md:text-2xl font-light hover:text-[#FAD337] transition-colors duration-300 cursor-pointer break-words mt-3">wilailak.p@sustain-republix.com</p>
                </div>
              </div>
            </div>

            {/* คอลัมน์ที่ 2: ที่อยู่ */}
            <div>
              <h3 className="text-[#939598] tracking-[0.2em] uppercase text-sm mb-12 border-b border-white/10 pb-4">Headquarters</h3>
              
              <div className="space-y-12">
                <div>
                  <p className="text-[#004965] font-bold uppercase tracking-widest mb-2 text-xs">Address</p>
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                    <span className="text-white font-medium">Sustain Republix Group Co.,Ltd.</span><br />
                    888 5th floor, VGR Building,<br />
                    Samrong Nuea, Mueang Samut Prakan,<br />
                    Samut Prakan 10270
                  </p>
                </div>
                
                <div>
                  <p className="text-[#004965] font-bold uppercase tracking-widest mb-2 text-xs">Office Hours</p>
                  <p className="text-xl md:text-2xl font-light text-gray-300">Mon – Fri <span className="text-[#F48120] mx-2">/</span> 09:00 – 18:00</p>
                </div>
              </div>
            </div>

          </div>

          {/* ปุ่ม Book a Call แบบดุดันเตะตา */}
          <div className="mt-20 pt-16 border-t border-white/10">
            <button className="bg-transparent border-2 border-[#F48120] text-[#F48120] hover:bg-[#F48120] hover:text-black px-12 py-5 font-bold text-lg uppercase tracking-[0.2em] transition-all duration-300 group">
              Book a Call 
              <span className="inline-block transform group-hover:translate-x-2 transition-transform ml-4">→</span>
            </button>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. Full-width Map Section (แผนที่กางเต็มจอ 100%) */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full h-[50vh] md:h-[70vh] relative grayscale hover:grayscale-0 transition-all duration-1000 border-t border-white/10">
        <iframe 
          src="https://maps.google.com/maps?q=VGR%20Building,%20Samrong%20Nuea,%20Samut%20Prakan&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          className="absolute inset-0 w-full h-full border-0 outline-none" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        {/* ป้ายนำทางลอยๆ บนแผนที่ */}
        <div className="absolute top-8 right-8 pointer-events-none">
          <div className="bg-[#050505] text-white border border-white/20 px-6 py-3 shadow-2xl flex items-center gap-4">
             <span className="w-3 h-3 bg-[#FAD337] rounded-full animate-pulse"></span>
             <span className="font-bold tracking-widest uppercase text-sm">We are here</span>
          </div>
        </div>
      </section>

    </div>
  );
}