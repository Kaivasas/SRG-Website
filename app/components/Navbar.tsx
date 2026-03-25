"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';

export default function Navbar() {
  const lastScrollY = useRef(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center transition-transform duration-300 ease-in-out ${
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* โลโก้ */}
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
        <img src="/assets/logo_0.png" alt="Sustain Republix Logo" className="h-10 w-auto" />
      </Link>

      {/* เมนู */}
      <div className="flex items-center space-x-8">
        {/* สังเกตว่าเติม items-center เข้าไปเพื่อให้ปุ่ม Service อยู่ตรงกลางพอดีกับข้อความเมนูอื่นๆ */}
        <ul className="hidden md:flex space-x-8 items-center text-sm font-semibold uppercase text-white tracking-wide">
          <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
          
          {/* เมนู Service พร้อม Premium Dropdown */}
          <li className="relative group">
            {/* ปุ่ม Service หลัก */}
            <button className="flex items-center gap-1 hover:text-blue-400 transition py-4 font-semibold uppercase tracking-wide">
              Service
              <svg 
                className="w-4 h-4 text-white/70 transition-transform duration-300 group-hover:rotate-180 group-hover:text-blue-400" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* กล่อง Dropdown (ซ่อนอยู่ จะโผล่มาตอน Hover) */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-80 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
              {/* ดีไซน์กล่องกระจก ใส่ normal-case เพื่อไม่ให้ข้างในเป็นตัวพิมพ์ใหญ่หมดตามเมนูหลัก */}
              <div className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl p-3 flex flex-col gap-1 relative overflow-hidden normal-case tracking-normal">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#004965] to-[#F48120]"></div>

                {/* Service 01 */}
                <Link href="/services/digital-marketing" className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-50/50 text-blue-600 flex items-center justify-center text-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-sm">
                    📈
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">Digital Marketing</h4>
                    <p className="text-xs text-gray-500 mt-0.5 font-light">การตลาดออนไลน์ครบวงจร</p>
                  </div>
                </Link>

                {/* Service 02 */}
                <Link href="/services/web-development" className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-50/50 text-blue-600 flex items-center justify-center text-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-sm">
                    💻
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">Web & App Dev</h4>
                    <p className="text-xs text-gray-500 mt-0.5 font-light">พัฒนาเว็บไซต์และแอปพลิเคชัน</p>
                  </div>
                </Link>

                {/* Service 03 */}
                <Link href="/services/brand-strategy" className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-50/50 text-blue-600 flex items-center justify-center text-lg group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-sm">
                    🎯
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">Brand Strategy</h4>
                    <p className="text-xs text-gray-500 mt-0.5 font-light">สร้างกลยุทธ์และตัวตนแบรนด์</p>
                  </div>
                </Link>

                {/* Service 04 */}
                <Link href="/services/interactive-booth" className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-orange-50/50 text-[#F48120] flex items-center justify-center text-lg group-hover/item:bg-[#F48120] group-hover/item:text-white transition-all shadow-sm">
                    📸
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-[#F48120] transition-colors">Interactive Photo Booth</h4>
                    <p className="text-xs text-gray-500 mt-0.5 font-light">ระบบถ่ายภาพอัจฉริยะสำหรับอีเวนต์</p>
                  </div>
                </Link>

                {/* Service 05 */}
                <Link href="/services/smart-management" className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-green-50/50 text-green-600 flex items-center justify-center text-lg group-hover/item:bg-green-600 group-hover/item:text-white transition-all shadow-sm">
                    ⚙️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover/item:text-green-600 transition-colors">Smart Management</h4>
                    <p className="text-xs text-gray-500 mt-0.5 font-light">แพลตฟอร์มจัดการข้อมูลธุรกิจ</p>
                  </div>
                </Link>

              </div>
            </div>
          </li>

          <li><Link href="/#works" className="hover:text-blue-400 transition">Works</Link></li>
          <li><Link href="/#products" className="hover:text-blue-400 transition">Product</Link></li>
          <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
        </ul>
        <div className="text-sm font-bold bg-black text-white px-5 py-2.5 rounded-full hover:bg-blue-500 hover:text-white transition cursor-pointer shadow-lg">
          099-123-4567
        </div>
      </div>
    </nav>
  );
}