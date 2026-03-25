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
        <ul className="hidden md:flex space-x-8 text-sm font-semibold uppercase text-white tracking-wide">
          <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
          {/* สังเกตว่าผมเติม / หน้า # เพื่อให้กดจากหน้า Contact แล้วกลับมาหน้า Home ได้ถูกต้อง */}
          <li><Link href="/#services" className="hover:text-blue-400 transition">Service</Link></li>
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