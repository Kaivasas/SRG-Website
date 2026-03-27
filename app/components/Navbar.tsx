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
      className={`fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 flex justify-center transition-transform duration-300 ease-in-out ${
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* ตัวครอบเนื้อหา Navbar ให้อยู่ตรงกลาง (จำกัดความกว้าง) */}
      <div className="w-full max-w-480 px-8 py-4 flex justify-between items-center relative">
        
        {/* โลโก้ */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src="/assets/logo_0.png" alt="Sustain Republix Logo" className="h-10 w-auto" />
        </Link>

        {/* เมนู */}
        <div className="flex items-center space-x-8">
          <ul className="hidden md:flex space-x-8 items-center text-sm font-semibold uppercase text-white tracking-wide">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            
            {/* ----------------------------------------------------------------- */}
            {/* เมนู Service - แบบแนวยาวเต็มจอ (Full-width Mega Menu) */}
            {/* ----------------------------------------------------------------- */}
            {/* สังเกตว่าเราเอา relative ออกจาก li เพื่อให้ Dropdown อ้างอิงความกว้างจากหน้าจอแทน */}
            <li className="group">
              <button className="flex items-center gap-1 hover:text-blue-400 transition py-4 font-semibold uppercase tracking-wide">
                Service
                <svg 
                  className="w-4 h-4 text-white/70 transition-transform duration-300 group-hover:rotate-180 group-hover:text-blue-400" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* กล่อง Mega Menu แนวยาว (w-full ขยายเต็มหน้าจอ และ left-0 เริ่มจากซ้ายสุด) */}
              <div className="absolute top-full left-0 w-full opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50 cursor-default">
                
                {/* พื้นหลังกระจกของ Dropdown แนวยาว */}
                <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_40px_60px_rgba(0,0,0,0.1)] w-full">
                  {/* เส้น Gradient ด้านบน */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#004965] to-[#F48120]"></div>

                  {/* ตัวจัดระเบียบเนื้อหาด้านในให้อยู่ตรงกลางเหมือน Navbar */}
                  <div className="max-w-7xl mx-auto px-8 py-12">
                    
                    {/* แบ่งเนื้อหาเป็น 4 คอลัมน์ และเว้นช่องไฟให้ดูโปร่งสบายตาขึ้น (gap-12) */}
                    <div className="grid grid-cols-4 gap-12 normal-case tracking-normal">
                      
                      {/* คอลัมน์ที่ 1 */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <Link href="/services/digital-marketing" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Digital Marketing
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Website</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Facebook</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Instagram</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• X</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• TikTok</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• YouTube</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• LINE OA</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• SEO/SEM</li>
                          </ul>
                        </div>
                        <div>
                          <Link href="/services/event-organization" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Event Organization
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Events</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Trade Show</li>
                          </ul>
                        </div>
                      </div>

                      {/* คอลัมน์ที่ 2 */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <Link href="/services/live-streaming" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Live Streaming
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• TikTok Live</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Facebook Live</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Shopee Live</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Lazada Live</li>
                          </ul>
                        </div>
                        <div>
                          <Link href="/services/commercial" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Commercial
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• E-Commerce</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Affiliate</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Ads Optimize</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Promotions</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Sale Admin</li>
                          </ul>
                        </div>
                      </div>

                      {/* คอลัมน์ที่ 3 */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <Link href="/services/business-strategies" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Business Strategies
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• CI Brand</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Strategies</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Company Profile</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• UX / UI</li>
                          </ul>
                        </div>
                        <div>
                          <Link href="/services/creator" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Creator
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Content Creator</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• KOLs</li>
                          </ul>
                        </div>
                      </div>

                      {/* คอลัมน์ที่ 4 */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <Link href="/services/design" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Design
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Design</li>
                          </ul>
                        </div>
                        <div>
                          <Link href="/services/media" className="text-[#004965] font-black text-sm mb-4 block hover:text-[#F48120] transition uppercase tracking-wider">
                            Media
                          </Link>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Content & Creative</li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all cursor-pointer">• Production</li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li><Link href="/works" className="hover:text-blue-400 transition">Works</Link></li>
            <li><Link href="/products" className="hover:text-blue-400 transition">Product</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
          <div className="text-sm font-bold bg-white text-gray-900 px-6 py-2.5 rounded-full hover:bg-blue-500 hover:text-white transition cursor-pointer shadow-lg">
            099-123-4567
          </div>
        </div>

      </div>
    </nav>
  );
}