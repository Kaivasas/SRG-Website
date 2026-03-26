"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import ClientSection from "./components/home/ClientSection"; // <-- 1. Import เข้ามา
import HeroSection from "./components/home/HeroSection";
import ServiceSection from "./components/home/ServiceSection";
import ProductsSection from "./components/home/ProductsSection";
import WorksSection from "./components/home/WorksSection";
import TestimonialSection from "./components/home/TestimonialSection";
import CtaSection from "./components/home/CtaSection";

export default function Home() {

  // 1. เพิ่ม State เก็บค่าความเบลอ (เริ่มต้นที่ 0 คือชัดสุด)
  const [bgBlur, setBgBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // ดึงค่าการสกรอลล์มาเก็บไว้ใช้กับฟังก์ชันด้านล่าง
      const currentScrollY = window.scrollY;

      // ----------------------------------------------------
      // Logic ใหม่: คำนวณความเบลอของ Video พื้นหลัง
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

      {/* ------------------------------------------------------------- */}
      {/* Hero Section (เรียกใช้ Component) */}
      {/* ------------------------------------------------------------- */}
      <HeroSection />

      {/* ------------------------------------------------------------- */}
      {/* Trusted Brands (เรียกใช้ Component แค่บรรทัดเดียว!) */}
      {/* ------------------------------------------------------------- */}
      <ClientSection />

      {/* ------------------------------------------------------------- */}
      {/* Services Section (Premium Sticky Cards) */}
      {/* ------------------------------------------------------------- */}
      <ServiceSection />

      {/* ------------------------------------------------------------- */}
      {/* Products Section */}
      {/* ------------------------------------------------------------- */}
      <ProductsSection />

      {/* ------------------------------------------------------------- */}
      {/* Works Section */}
      {/* ------------------------------------------------------------- */}
      <WorksSection />
      {/* ------------------------------------------------------------- */}
      {/* Testimonials */}
      {/* ------------------------------------------------------------- */}
      <TestimonialSection />
      {/* ------------------------------------------------------------- */}
      {/* CTA*/}
      {/* ------------------------------------------------------------- */}
      <CtaSection />

    </div>
  );
}