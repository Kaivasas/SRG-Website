"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const lastScrollY = useRef(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) {
    return null;
  }

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
      className={`fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 flex justify-center transition-transform duration-300 ease-in-out ${isNavVisible ? "translate-y-0" : "-translate-y-full"
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
                          {/* 🔴 หัวข้อใหญ่: ลบ <Link> ออก เปลี่ยนเป็น <div> ธรรมดา เพื่อไม่ให้คลิกได้ */}
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Digital Marketing
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            {/* 🟢 หัวข้อย่อย: เอา <Link> มาครอบ <li> เพื่อให้คลิกไปหน้าบริการนั้นๆ ได้ */}
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/website" className="block w-full">• Website</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/facebook" className="block w-full">• Facebook</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/instagram" className="block w-full">• Instagram</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/X" className="block w-full">• X</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/tiktok" className="block w-full">• TikTok</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/youtube" className="block w-full">• YouTube</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/line-OA" className="block w-full">• LINE OA</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/SEO-SEM" className="block w-full">• SEO/SEM</Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Event Organization
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/events" className="block w-full">• Events</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/trade-show" className="block w-full">• Trade Show</Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* คอลัมน์ที่ 2 */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Live Streaming
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/tiktok-live" className="block w-full">• TikTok Live</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/facebook-live" className="block w-full">• Facebook Live</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/shopee-live" className="block w-full">• Shopee Live</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/lazada-live" className="block w-full">• Lazada Live</Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Commercial
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/e-commerce" className="block w-full">• E-Commerce</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/affiliate" className="block w-full">• Affiliate</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/ads-optimize" className="block w-full">• Ads Optimize</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/promotions" className="block w-full">• Promotions</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/sale-admin" className="block w-full">• Sale Admin</Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* คอลัมน์ที่ 3 */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Business Strategies
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/CI-brand" className="block w-full">• CI Brand</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/strategies" className="block w-full">• Strategies</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/company-profile" className="block w-full">• Company Profile</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/ux-ui" className="block w-full">• UX / UI</Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Creator
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/content-creator" className="block w-full">• Content Creator</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/kols" className="block w-full">• KOLs</Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* คอลัมน์ที่ 4 */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Design
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/design" className="block w-full">• Design</Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                            Media
                          </div>
                          <ul className="text-gray-500 text-sm font-medium space-y-3">
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/content-&-creative" className="block w-full">• Content & Creative</Link>
                            </li>
                            <li className="hover:text-gray-900 hover:translate-x-1 transition-all">
                              <Link href="/services/production" className="block w-full">• Production</Link>
                            </li>
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