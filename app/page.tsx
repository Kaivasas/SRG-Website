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
          // เอา blur-md ออก เพื่อใช้ inline style คุมแทน
          className="w-full h-full object-cover opacity-40 scale-105"
          // เพิ่ม inline style นี้เข้าไป
          style={{ filter: `blur(${bgBlur}px)`, transition: 'filter 0.1s ease-out' }}
        >
          {/* เปลี่ยนชื่อไฟล์ตรงนี้ให้ตรงกับไฟล์ที่คุณดาวน์โหลดมาใส่ใน public/assets/ */}
          <source src="/assets/7020050_Abstract_Background_3840x2160.mp4" type="video/mp4" />
        </video>

        {/* เลเยอร์สีดำทับอีกชั้น ช่วยให้ตัวหนังสือข้างหน้าอ่านง่ายขึ้น (ปรับ bg-black/40 ได้ตามต้องการ) */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      </div>

      {/* Hero Section */}
      {/* แก้ h-screen เป็น min-h-screen และเพิ่ม pt-24 md:pt-32 เพื่อเว้นที่ให้ Navbar */}
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

      {/* Trusted Brands */}
      <section className="py-24 flex flex-col items-center z-10 relative">
        <h2 className="text-3xl font-bold mb-12 text-white drop-shadow-lg tracking-wide">แบรนด์ที่ไว้วางใจกับทางเรา</h2>

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

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20 text-white drop-shadow-md">บริการของทางเรา</h2>

          {/* เอา pb-32 ออก เพื่อลดช่องว่างด้านล่างสุดของการ์ด */}
          <div className="flex flex-col gap-6">
            {/* Card 1 */}
            <div className="sticky top-[15vh] bg-[#005a72] text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center shadow-2xl border border-[#003850] transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 md:mb-0 md:pr-8">
                <h3 className="text-3xl font-bold mb-4">Digital Marketing</h3>
                <p className="mb-6 text-gray-100 max-w-sm text-lg leading-relaxed">ยกระดับแบรนด์ของคุณด้วยกลยุทธ์การตลาดออนไลน์ที่วัดผลได้จริง เข้าถึงกลุ่มเป้าหมายอย่างแม่นยำ</p>
                <a href="#" className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-2">
                  ดูรายละเอียดเพิ่มเติม <span>&rarr;</span>
                </a>
              </div>
              <div className="w-full md:w-72 h-48 bg-gray-800 rounded-2xl overflow-hidden shadow-inner">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" alt="Marketing" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="sticky top-[18vh] bg-[#004965] text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center shadow-2xl border border-black transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 md:mb-0 md:pr-8">
                <h3 className="text-3xl font-bold mb-4">Web & App Development</h3>
                <p className="mb-6 text-blue-200 max-w-sm text-lg leading-relaxed">ออกแบบและพัฒนาเว็บไซต์และแอปพลิเคชันที่ทันสมัย ใช้งานง่าย ตอบโจทย์ทุกธุรกิจของคุณ</p>
                <a href="#" className="text-white font-bold hover:text-blue-200 flex items-center gap-2">
                  ดูรายละเอียดเพิ่มเติม <span>&rarr;</span>
                </a>
              </div>
              <div className="w-full md:w-72 h-48 bg-blue-950 rounded-2xl overflow-hidden shadow-inner">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" alt="Development" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="sticky top-[21vh] bg-[#003951] text-gray-300 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center shadow-2xl border border-black transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 md:mb-0 md:pr-8">
                <h3 className="text-3xl font-bold mb-4">Brand Strategy</h3>
                <p className="mb-6 text-gray-300 max-w-sm text-lg leading-relaxed">สร้างตัวตนของแบรนด์ให้แข็งแกร่งและเป็นที่จดจำ พร้อมเติบโตอย่างยั่งยืนในระยะยาว</p>
                <a href="#" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2">
                  ดูรายละเอียดเพิ่มเติม <span>&rarr;</span>
                </a>
              </div>
              <div className="w-full md:w-72 h-48 bg-gray-200 rounded-2xl overflow-hidden shadow-inner">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" alt="Strategy" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section (Zig-Zag Layout เน้นรูปภาพ) */}
      <section id="products" className="py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">

          {/* ปรับขยับหัวข้อให้ใกล้กับการ์ดใบแรกขึ้นอีกนิด */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Our Products</h2>
            <p className="text-blue-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
              นวัตกรรมและโซลูชันพร้อมใช้งานที่เราพัฒนาขึ้นมาเพื่อคุณ
            </p>
          </div>

          <div className="flex flex-col gap-24 md:gap-32">

            {/* Product 01 (รูปซ้าย - ข้อความขวา) */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 group">
              <div className="w-full md:w-1/2 rounded-4xl overflow-hidden shadow-2xl relative">
                {/* กรอบรูป */}
                <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" alt="AI Avatar" className="w-full h-100 object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="absolute -top-20 -left-10 text-[12rem] font-black text-white/5 z-[-1] leading-none select-none">01</div>
                <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">AI Solution</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">AI Virtual Avatar</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  ระบบแชทบอทอัจฉริยะที่มาพร้อมอวาตาร์เสมือนจริง และระบบโต้ตอบด้วยเสียง (Voice Interaction) ยกระดับงานบริการลูกค้าให้เป็นธรรมชาติและทันสมัย
                </p>
                <button className="flex items-center gap-3 text-white font-bold border-b-2 border-blue-500 pb-1 hover:text-blue-400 hover:gap-5 transition-all">
                  ดูรายละเอียด <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Product 02 (ข้อความซ้าย - รูปขวา) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 group">
              <div className="w-full md:w-1/2 rounded-4xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-[#F48120]/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Event Booth" className="w-full h-100 object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="absolute -top-20 -left-10 text-[12rem] font-black text-white/5 z-[-1] leading-none select-none">02</div>
                <span className="text-[#F48120] font-bold tracking-widest uppercase text-sm mb-4 block">Event Tech</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Interactive Photo Booth</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  ระบบถ่ายภาพสำหรับงานอีเวนต์ พร้อมฟีเจอร์ลบพื้นหลัง (Background Removal) และใส่ฟิลเตอร์แบบ Real-time สร้าง Engagement ให้แบรนด์ได้อย่างสนุกสนาน
                </p>
                <button className="flex items-center gap-3 text-white font-bold border-b-2 border-[#F48120] pb-1 hover:text-[#F48120] hover:gap-5 transition-all">
                  ดูรายละเอียด <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Product 03 (รูปซ้าย - ข้อความขวา) */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 group">
              <div className="w-full md:w-1/2 rounded-4xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-green-500/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80" alt="Platform" className="w-full h-100 object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="absolute -top-20 -left-10 text-[12rem] font-black text-white/5 z-[-1] leading-none select-none">03</div>
                <span className="text-green-400 font-bold tracking-widest uppercase text-sm mb-4 block">Platform</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Smart Management</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  แพลตฟอร์มการจัดการข้อมูลแบบครบวงจร ที่พัฒนามาเพื่ออุตสาหกรรมเฉพาะทาง ช่วยให้การทำงานของทีมเป็นระบบและจัดการทรัพยากรได้อย่างมีประสิทธิภาพ
                </p>
                <button className="flex items-center gap-3 text-white font-bold border-b-2 border-green-500 pb-1 hover:text-green-400 hover:gap-5 transition-all">
                  ดูรายละเอียด <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Product 04 (ข้อความซ้าย - รูปขวา) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 group">
              <div className="w-full md:w-1/2 rounded-4xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-pink-500/20 group-hover:bg-transparent transition duration-500 z-10"></div>
                <img src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80" alt="Gamification" className="w-full h-100 object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="w-full md:w-1/2 relative">
                <div className="absolute -top-20 -left-10 text-[12rem] font-black text-white/5 z-[-1] leading-none select-none">04</div>
                <span className="text-pink-400 font-bold tracking-widest uppercase text-sm mb-4 block">Gamification</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Visual Novel Game</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  เปลี่ยนการเล่าเรื่องของแบรนด์ให้น่าสนใจยิ่งขึ้น ด้วยรูปแบบเกม Interactive และ Visual Novel ที่ดึงดูดผู้ใช้งานให้อยู่กับแคมเปญได้นานขึ้น
                </p>
                <button className="flex items-center gap-3 text-white font-bold border-b-2 border-pink-500 pb-1 hover:text-pink-400 hover:gap-5 transition-all">
                  ดูรายละเอียด <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-20 mb-8">
            <button className="bg-[#004965] text-white font-bold py-4 px-12 md:py-5 md:px-16 rounded-full text-lg md:text-xl shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:bg-black hover:shadow-xl transform transition hover:-translate-y-2">
              Product อื่น ๆ ของเราทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="works" ref={projectSectionRef} className="h-[300vh] relative z-10">
        {/* 1. เปลี่ยน h-screen เป็น h-[100svh] และเอา pb-20 ออก เพื่อให้มันกะระยะกึ่งกลางเป๊ะๆ */}
        <div className="sticky top-0 h-svh flex flex-col justify-center overflow-hidden">

          {/* 2. Header - ลด mb-8 เหลือ mb-4 และปรับ leading-none ให้กล่องข้อความไม่สูงเกินไป */}
          <div className="pl-[10vw] mb-4 relative z-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight drop-shadow-lg leading-none">
              Our Works
            </h2>
            <p className="text-blue-300 text-sm md:text-base mt-2 font-light tracking-wide max-w-xl">
              ผลงานที่เราภาคภูมิใจ จากความร่วมมือและเทคโนโลยีที่ขับเคลื่อนความสำเร็จ
            </p>
          </div>

          <div
            className="flex gap-8 px-[10vw] transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: `translateX(-${projectScrollProgress * 70}%)` }}
          >
            {/* Project Card 1 (ขนาด h-137.5 เท่าเดิม) */}
            <div className="min-w-100 md:min-w-125 h-137.5 bg-white rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] shrink-0 group cursor-pointer border border-gray-100">
              <div className="h-2/3 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Project 1" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500"></div>
              </div>
              <div className="p-8 grow flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">E-Commerce Platform</p>
                  <h3 className="text-2xl font-bold text-gray-900">TechVision Store Redesign</h3>
                </div>
                <button className="self-start text-gray-900 font-semibold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition">ดูโปรเจค</button>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="min-w-100 md:min-w-125 h-137.5 bg-white rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] shrink-0 group cursor-pointer border border-gray-100">
              <div className="h-2/3 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Project 2" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8 grow flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Data Dashboard</p>
                  <h3 className="text-2xl font-bold text-gray-900">Analytica Data Systems</h3>
                </div>
                <button className="self-start text-gray-900 font-semibold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition">ดูโปรเจค</button>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="min-w-100 md:min-w-125 h-137.5 bg-white rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] shrink-0 group cursor-pointer border border-gray-100">
              <div className="h-2/3 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?w=800&q=80" alt="Project 3" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8 grow flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Mobile App</p>
                  <h3 className="text-2xl font-bold text-gray-900">FinTech Payment App</h3>
                </div>
                <button className="self-start text-gray-900 font-semibold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition">ดูโปรเจค</button>
              </div>
            </div>

            {/* Project Card 4 */}
            <div className="min-w-100 md:min-w-125 h-137.5 bg-white rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] shrink-0 group cursor-pointer border border-gray-100">
              <div className="h-2/3 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="Project 4" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8 grow flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Corporate Website</p>
                  <h3 className="text-2xl font-bold text-gray-900">Global Logistics Corp</h3>
                </div>
                <button className="self-start text-gray-900 font-semibold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition">ดูโปรเจค</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* 1. เอา bg-gray-50 และ border-t ออก เพื่อโชว์วิดีโอพื้นหลัง */}
      <section className="py-32 relative z-10 flex flex-col items-center">
        {/* เปลี่ยนสีตัวหนังสือเป็น text-white */}
        <h2 className="text-4xl font-bold mb-20 text-center w-full max-w-5xl text-white drop-shadow-md">เสียงจากลูกค้าของเรา</h2>

        <div className="flex items-center justify-center space-x-4 md:space-x-12 w-full max-w-6xl relative">
          <button className="z-10 text-4xl text-gray-400 hover:scale-110 transition hover:text-white p-4">&#8592;</button>

          {/* การ์ดแบบเดิม คงพื้นหลัง bg-white ไว้เพื่อให้เป็นกล่องป๊อปอัพขึ้นมาสวยๆ */}
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
      {/* 2. เอา bg-white และ border-t border-gray-200 ออกจากตัวครอบ เพื่อลบเส้นสีขาวและลบสีพื้นหลัง */}
      <div className="relative z-10">
        <section id="contact" className="py-32 flex flex-col items-center text-center px-6">
          {/* เปลี่ยนสีตัวหนังสือเป็น text-white เพื่อให้อ่านง่ายบนพื้นหลังวิดีโอ */}
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-lg">พร้อมที่จะเติบโตไปกับเรา?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl font-light tracking-wide">ร่วมมือไปกับเรา ก้าวไปกับเรา ให้เราเป็นส่วนหนึ่งในการขับเคลื่อนธุรกิจของคุณให้ประสบความสำเร็จ</p>
          <Link
            href="/contact"
            className="inline-block bg-[#004965] text-white font-bold py-5 px-16 rounded-full text-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-black hover:shadow-xl transform transition hover:-translate-y-2">
            ติดต่อเราเลยตอนนี้
          </Link>
        </section>

        <footer className="bg-[#004965] text-white py-20 px-10 md:px-24 flex flex-col md:flex-row justify-between border-t border-[#003850]">
          <div className="mb-12 md:mb-0">
            <h2 className="text-3xl font-black mb-6 tracking-wide">
              <span className="text-[#F48120]">SUSTAIN</span> <span className="text-[#939598]">REPUBLIX</span>
            </h2>
            <div className="flex space-x-4">
              {/* Facebook Icon */}
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition hover:scale-110">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              {/* LinkedIn Icon */}
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition hover:scale-110">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              {/* TikTok Icon */}
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition hover:scale-110">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>
              </a>
            </div>
          </div>
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-400">เรารอคุณอยู่</h2>
            <p className="mb-6 font-bold text-2xl text-blue-400 hover:text-white transition cursor-pointer">hello@sustainrepublix.com</p>
            <p className="text-sm leading-relaxed text-gray-400">
              Sustain Republix Group Co.,Ltd.,<br />
              Sridan 18 Alley, Samrong Nuea,<br />
              Mueang Samut Prakan District,<br />
              Samut Prakan 10270
            </p>
          </div>
        </footer>
      </div>

    </div>
  );
}