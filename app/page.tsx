"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const [projectScrollProgress, setProjectScrollProgress] = useState(0);

  // 1. เพิ่ม State เก็บค่าความเบลอ (เริ่มต้นที่ 0 คือชัดสุด)
  const [bgBlur, setBgBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // ดึงค่าการสกรอลล์มาเก็บไว้ใช้กับฟังก์ชันด้านล่าง
      const currentScrollY = window.scrollY;

      // Logic ของ Project Section (คงเดิม)
      if (projectSectionRef.current) {
        const { top, height } = projectSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = -top / (height - windowHeight);
        setProjectScrollProgress(Math.min(Math.max(progress, 0), 1));
      }

      // ----------------------------------------------------
      // 2. Logic ใหม่: คำนวณความเบลอของ Video พื้นหลัง
      // ----------------------------------------------------
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = totalScrollHeight > 0 ? currentScrollY / totalScrollHeight : 0;

      // ปรับเพิ่มความเบลอสูงสุดจาก 20 เป็น 40 เพื่อให้เห็นจังหวะ "ค่อยๆ เบลอ" ชัดเจนขึ้น
      const maxBlurPx = 40;
      setBgBlur(scrollFraction * maxBlurPx);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-gray-900 font-sans">

      {/* 1. Video Background Loop */}
      <div className="fixed inset-0 z-[-1] bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
          style={{ filter: `blur(${bgBlur}px)`, transition: 'filter 0.1s ease-out' }}
        >
          <source src="/assets/7020050_Abstract_Background_3840x2160.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 pb-12">
        <div className="text-center w-full px-4 max-w-7xl mx-auto z-10 flex flex-col items-center">
          <h1 className="font-black tracking-tighter uppercase leading-[0.9] text-white drop-shadow-2xl">
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] mb-4 md:mb-6">
              YOUR PARTNER IN
            </span>
            <span className="block mb-2 text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              DIGITAL <span className="text-transparent bg-clip-text bg-linear-to-r from-[#005a72] to-[#F48120] drop-shadow-none">GROWTH</span>
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl text-gray-400 font-light my-4 md:my-6 italic font-serif">
              &
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">
              SUSTAINABLE
            </span>
            <span className="block mt-2 text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">
              INNOVATION
            </span>
          </h1>
          <p className="mt-10 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wider leading-relaxed">
            เราพร้อมขับเคลื่อนธุรกิจของคุณ ด้วยเทคโนโลยีและกลยุทธ์ที่ยั่งยืน
          </p>
        </div>
      </section>

      {/* Trusted Brands (ปรับลด padding จาก py-24 เป็น py-16) */}
      <section className="py-12 md:py-16 flex flex-col items-center z-10 relative">
        <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-lg tracking-wide">แบรนด์ที่ไว้วางใจกับทางเรา</h2>

        {/* Mockup Logo Grid */}
        <div className="w-full max-w-5xl bg-white/10 p-10 border border-white/20 rounded-3xl mb-8 backdrop-blur-sm grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 opacity-70 hover:opacity-100 transition brightness-0 invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8 opacity-70 hover:opacity-100 transition brightness-0 invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 opacity-70 hover:opacity-100 transition brightness-0 invert mt-2" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Spotify_logo_without_text.svg" alt="Spotify" className="h-10 opacity-70 hover:opacity-100 transition brightness-0 invert" />
        </div>

        <div className="flex space-x-3">
          {[1, 2, 3, 4].map((dot, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-blue-500 w-8' : 'bg-white/30 hover:bg-white/50 cursor-pointer'}`}></div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Services Section (Premium Sticky Cards) */}
      {/* ------------------------------------------------------------- */}
      {/* ปรับลด padding จาก py-24 md:py-32 เป็น py-16 md:py-20 */}
      <section id="services" className="py-16 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20 relative">
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-2xl">บริการของทางเรา</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-6"></div>
          </div>

          {/* ปรับลด padding-bottom จาก pb-32 เป็น pb-16 */}
          <div className="flex flex-col gap-8 pb-16">
            {/* Premium Card 1 */}
            <div className="sticky top-[15vh] bg-gradient-to-br from-[#002a3a]/90 to-black/90 backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(0,73,101,0.5)]">
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
            <div className="sticky top-[18vh] bg-gradient-to-br from-[#001f2b]/95 to-black/95 backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(0,73,101,0.5)]">
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
            <div className="sticky top-[21vh] bg-gradient-to-br from-black to-gray-900 backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
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

      {/* ------------------------------------------------------------- */}
      {/* Products Section */}
      {/* ------------------------------------------------------------- */}
      {/* ปรับลด padding จาก py-24 md:py-32 เป็น py-16 md:py-20 */}
      <section id="products" className="py-16 md:py-20 relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-blue-500 font-bold uppercase tracking-widest block mb-4 text-sm">Innovation</span>
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-md">Our Products</h2>
            </div>
            <p className="max-w-md text-gray-300 text-lg font-light tracking-wide leading-relaxed border-l-[3px] border-[#F48120] pl-4">
              นวัตกรรมและโซลูชันพร้อมใช้งานที่เราพัฒนาขึ้นมาเพื่อตอบสนองความต้องการในยุคดิจิทัล
            </p>
          </div>

          <div className="flex flex-col border border-white/10 bg-black shadow-2xl">
            {/* Product 01 */}
            <div className="group flex flex-col md:flex-row items-stretch min-h-[400px] border-b border-white/10">
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-500 hover:bg-white/5">
                <span className="absolute -left-4 -top-10 text-[10rem] font-black text-white/5 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">01</span>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">AI Virtual Avatar</h3>
                  <p className="mb-8 text-gray-400 text-lg leading-relaxed font-light">
                    ระบบแชทบอทอัจฉริยะที่มาพร้อมอวาตาร์เสมือนจริง และระบบโต้ตอบด้วยเสียง (Voice Interaction) ยกระดับงานบริการลูกค้าให้เป็นธรรมชาติ
                  </p>
                  <a href="#" className="inline-flex items-center gap-4 text-blue-400 font-bold uppercase tracking-wider group/link hover:text-blue-300 transition-colors">
                    ดูรายละเอียด <span className="transform group-hover/link:translate-x-2 transition-transform">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative bg-gray-900 min-h-[300px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" alt="AI Avatar" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
            </div>

            {/* Product 02 */}
            <div className="group flex flex-col md:flex-row-reverse items-stretch min-h-[400px] border-b border-white/10">
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-500 hover:bg-white/5">
                <span className="absolute -left-4 -top-10 text-[10rem] font-black text-white/5 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">02</span>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Interactive Photo Booth</h3>
                  <p className="mb-8 text-gray-400 text-lg leading-relaxed font-light">
                    ระบบถ่ายภาพสำหรับงานอีเวนต์ พร้อมฟีเจอร์ลบพื้นหลัง (Background Removal) และใส่ฟิลเตอร์แบบ Real-time สร้าง Engagement ให้แบรนด์
                  </p>
                  <a href="#" className="inline-flex items-center gap-4 text-[#F48120] font-bold uppercase tracking-wider group/link hover:text-orange-300 transition-colors">
                    ดูรายละเอียด <span className="transform group-hover/link:translate-x-2 transition-transform">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative bg-gray-900 min-h-[300px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Photo Booth" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
            </div>

            {/* Product 03 */}
            <div className="group flex flex-col md:flex-row items-stretch min-h-[400px]">
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-500 hover:bg-white/5">
                <span className="absolute -left-4 -top-10 text-[10rem] font-black text-white/5 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">03</span>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Smart Management</h3>
                  <p className="mb-8 text-gray-400 text-lg leading-relaxed font-light">
                    แพลตฟอร์มการจัดการข้อมูลแบบครบวงจร ที่พัฒนามาเพื่ออุตสาหกรรมเฉพาะทาง ช่วยให้การทำงานของทีมเป็นระบบ
                  </p>
                  <a href="#" className="inline-flex items-center gap-4 text-green-400 font-bold uppercase tracking-wider group/link hover:text-green-300 transition-colors">
                    ดูรายละเอียด <span className="transform group-hover/link:translate-x-2 transition-transform">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative bg-gray-900 min-h-[300px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80" alt="Platform" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12 md:mt-16">
            <button className="bg-transparent border border-white/30 text-white font-bold py-4 px-12 md:py-4 md:px-16 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-black transition duration-300">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* Projects Section */}
      {/* ------------------------------------------------------------- */}
      {/* อันนี้คงความสูง h-[300vh] ไว้เหมือนเดิมเพราะต้องใช้ทำพื้นที่สำหรับการเลื่อน (Scroll) */}
      <section id="works" ref={projectSectionRef} className="h-[300vh] relative z-10 bg-transparent">
        
        <div className="sticky top-0 h-svh flex flex-col justify-center overflow-hidden ">
          
          <div className="pl-[10vw] mb-12 relative z-20 flex flex-col pr-[10vw]">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight drop-shadow-lg leading-none">
              Our Works
            </h2>
            <p className="text-blue-500 text-sm md:text-base mt-4 font-bold tracking-widest uppercase">
              Selected Projects
            </p>
          </div>

          <div
            className="flex gap-8 px-[10vw] transition-transform duration-100 ease-out will-change-transform w-max"
            style={{ transform: `translateX(calc(-${projectScrollProgress * 100}% + ${projectScrollProgress * 100}vw))` }}
          >
            {/* Project Card 1 */}
            <div className="min-w-[320px] md:min-w-[420px] shrink-0 group cursor-pointer">
              <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Project 1" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">TechVision Store</h4>
                <div className="flex justify-between items-center">
                   <p className="text-gray-400 font-light uppercase text-xs tracking-widest">E-Commerce / 2024</p>
                   <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="min-w-[320px] md:min-w-[420px] shrink-0 group cursor-pointer">
              <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Project 2" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">Analytica Systems</h4>
                <div className="flex justify-between items-center">
                   <p className="text-gray-400 font-light uppercase text-xs tracking-widest">Data Dashboard / 2023</p>
                   <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="min-w-[320px] md:min-w-[420px] shrink-0 group cursor-pointer">
              <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?w=800&q=80" alt="Project 3" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">FinTech Pay App</h4>
                <div className="flex justify-between items-center">
                   <p className="text-gray-400 font-light uppercase text-xs tracking-widest">Mobile App / 2024</p>
                   <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="min-w-[320px] md:min-w-[420px] shrink-0 group cursor-pointer">
              <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="Project 4" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">Global Logistics</h4>
                <div className="flex justify-between items-center">
                   <p className="text-gray-400 font-light uppercase text-xs tracking-widest">Corporate Web / 2023</p>
                   <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* ปรับลด padding จาก py-32 เป็น py-16 md:py-20 */}
      <section className="py-16 md:py-20 relative z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-12 text-center w-full max-w-5xl text-white drop-shadow-md">เสียงจากลูกค้าของเรา</h2>

        <div className="flex items-center justify-center space-x-4 md:space-x-12 w-full max-w-6xl relative">
          <button className="z-10 text-4xl text-gray-400 hover:scale-110 transition hover:text-white p-4">&#8592;</button>

          <div className="z-10 bg-white w-[90%] md:w-150 p-10 md:p-14 flex flex-col items-center text-center shadow-2xl rounded-3xl border border-gray-100 relative mt-8">
            <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
              <img src="https://i.pravatar.cc/150?img=32" alt="Customer Avatar" className="w-full h-full object-cover" />
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Company Logo" className="h-6 mt-6 mb-6 opacity-60" />
            <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
              "ทาง Sustain Republix ช่วยให้ยอดขายออนไลน์ของเราเติบโตขึ้นกว่า 150% ภายใน 3 เดือน ทีมงานมีความเป็นมืออาชีพ ใส่ใจทุกรายละเอียดและคอยให้คำปรึกษาอย่างดีเยี่ยมครับ"
            </p>
            <div>
              <p className="font-bold text-lg text-gray-900">คุณสมชาย ใจดี</p>
              <p className="text-blue-600 font-medium text-sm">Marketing Director, Google Thailand</p>
            </div>
          </div>

          <button className="z-10 text-4xl text-gray-400 hover:scale-110 transition hover:text-white p-4">&#8594;</button>
        </div>
      </section>

      {/* CTA & Footer */}
      {/* ปรับลด padding จาก py-32 เป็น py-16 md:py-24 */}
      <div className="relative z-10">
        <section id="contact" className="py-16 md:py-24 flex flex-col items-center text-center px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-lg">พร้อมที่จะเติบโตไปกับเรา?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl font-light tracking-wide">ร่วมมือไปกับเรา ก้าวไปกับเรา ให้เราเป็นส่วนหนึ่งในการขับเคลื่อนธุรกิจของคุณให้ประสบความสำเร็จ</p>
          <Link
            href="/contact"
            className="inline-block bg-[#004965] text-white font-bold py-5 px-16 rounded-full text-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-black hover:shadow-xl transform transition hover:-translate-y-2">
            ติดต่อเราเลยตอนนี้
          </Link>
        </section>
      </div>

    </div>
  );
}