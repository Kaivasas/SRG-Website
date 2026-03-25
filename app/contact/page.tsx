"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';

export default function ContactPage() {
  const [isNavVisible, setIsNavVisible] = useState(true);

  // สำหรับ Navbar (ถ้าคุณแยก Component ไว้ในอนาคต จะจัดการง่ายขึ้นครับ)
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
    <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
      
      {/* Navbar (ดีไซน์เดียวกับหน้า Home เพื่อความต่อเนื่อง) */}
      <nav
        className={`fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex justify-between items-center transition-transform duration-300 ease-in-out ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src="/assets/logo_0.png" alt="Sustain Republix Logo" className="h-10 w-auto" />
        </a>
        <div className="flex items-center space-x-8">
          <ul className="hidden md:flex space-x-8 text-sm font-semibold uppercase text-gray-700 tracking-wide">
            <li><Link href="/" className="hover:text-blue-500 transition">Home</Link></li>
            <li><a href="/#services" className="hover:text-blue-500 transition">Service</a></li>
            <li><a href="/#works" className="hover:text-blue-500 transition">Works</a></li>
            <li><a href="/#products" className="hover:text-blue-500 transition">Products</a></li>
            <li><Link href="/contact" className="text-blue-600 transition">Contact</Link></li>
          </ul>
          <div className="text-sm font-bold bg-[#004965] text-white px-5 py-2.5 rounded-full shadow-lg">
            0123456789
          </div>
        </div>
      </nav>

      {/* Part 1: Hero Section (สีโทนเข้ม/รูปภาพตามแบบ) */}
      <section className="relative pt-40 pb-32 bg-[#002a3a] flex flex-col items-center justify-center overflow-hidden">
        {/* เลเยอร์พื้นหลัง (เปลี่ยน src เป็นรูปออฟฟิศสวยๆ ได้เลย) */}
        <div className="absolute inset-0 z-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="Office Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
            เรารอคุณอยู่
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wider">
            ก้าวไปพร้อมเรา เราจะเคียงข้างคุณ
          </p>
        </div>
      </section>

      {/* Part 2: Contact Info & Booking */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* ซ้าย: ข้อความ + รูป CEO */}
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">เติบโตไปพร้อมกับเรา</h2>
            <p className="text-lg text-gray-600 mb-12">เราไม่ใช่แค่เพิ่มรายได้ แต่เราจะเป็นส่วนหนึ่งของครอบครัวคุณ</p>
            
            <div className="w-full h-80 md:h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex items-center justify-center relative">
               {/* ใส่รูป CEO ตรงนี้ */}
               <span className="absolute text-6xl text-gray-400 font-light">X</span>
               {/* <img src="..." alt="CEO" className="w-full h-full object-cover relative z-10" /> */}
            </div>
          </div>

          {/* ขวา: กล่องข้อมูลติดต่อ & กล่องปรึกษาฟรี */}
          <div className="flex flex-col gap-8">
            
            {/* กล่อง Contact */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-4xl font-bold mb-8">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                  <span className="text-pink-500 text-xl">📞</span>
                  <p className="font-bold text-gray-800">+66 2249-5445</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                  <span className="text-blue-500 text-xl">📧</span>
                  <p className="font-bold text-gray-800 text-sm md:text-base">arthit.p@sustain-Republix.com</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                  <span className="text-blue-500 text-xl">📧</span>
                  <p className="font-bold text-gray-800 text-sm md:text-base">wilailak.p@sustain-Republix.com</p>
                </div>
              </div>
              <div className="mt-8 inline-block bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                เวลาทำการ: จันทร์–ศุกร์ 09:00–18:00
              </div>
            </div>

            {/* กล่อง ปรึกษาฟรี! */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center">
              <h3 className="text-5xl font-black mb-4">ปรึกษาฟรี!</h3>
              <p className="text-gray-600 mb-8 text-lg">สามารถนัดวันปรึกษากับทางทีมผู้เชี่ยวชาญได้เลย</p>
              <button className="w-full md:w-auto border-2 border-gray-900 text-gray-900 font-bold text-lg py-4 px-12 hover:bg-gray-900 hover:text-white transition duration-300">
                Book a call
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Part 3: Map Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
            
            {/* ซ้าย: Google Map (แทนที่ด้วย iframe แผนที่จริง) */}
            <div className="w-full md:w-1/2 h-96 md:h-auto bg-gray-300 flex items-center justify-center relative">
                <span className="absolute text-6xl text-gray-500 font-light z-0">X</span>
                {/* ตัวอย่างการใส่ iframe แผนที่จริง (พิกัดสำโรงเหนือ สมุทรปราการ) */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.017565882333!2d100.63000000000001!3d13.630000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM3JzQ4LjAiTiAxMDDCsDM3JzQ4LjAiRQ!5e0!3m2!1sth!2sth!4v1610000000000!5m2!1sth!2sth" 
                  className="w-full h-full relative z-10 opacity-80 hover:opacity-100 transition duration-300" 
                  loading="lazy"
                ></iframe>
            </div>

            {/* ขวา: ที่อยู่ออฟฟิศ */}
            <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-gray-50">
              <h3 className="text-4xl font-bold mb-8 text-gray-900">ออฟฟิศของเรา</h3>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-400">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  Sustain Republix Group Co.,Ltd.,<br />
                  Sridan 18 Alley, Samrong Nuea,<br />
                  Mueang Samut Prakan District,<br />
                  Samut Prakan 10270
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}