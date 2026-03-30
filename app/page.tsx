import React from "react";

// Import Components ของคุณทั้งหมด
import BlurredBackground from "./components/home/BlurredBackground"; // <-- ตัวใหม่ที่เราเพิ่งสร้าง
import HeroSection from "./components/home/HeroSection";
import ClientSection from "./components/home/ClientSection"; 
import ServiceSection from "./components/home/ServiceSection";
import ProductsSection from "./components/home/ProductsSection";
import WorksSection from "./components/home/WorksSection";
import TestimonialSection from "./components/home/TestimonialSection";
import CtaSection from "./components/home/CtaSection";

export default function Home() {
  return (
    <div className="relative min-h-screen text-gray-900 font-sans">

      {/* 1. Video Background (ตอนนี้แยกเป็น Client Component แล้ว ทำงานลื่นๆ) */}
      <BlurredBackground />

      {/* 2. Sections อื่นๆ วางต่อกันได้ตามปกติเลย ไม่มี Error ตีกันแล้ว! */}
      <HeroSection />
      <ClientSection />
      <ServiceSection />
      <ProductsSection />
      <WorksSection />
      <TestimonialSection />
      <CtaSection />

    </div>
  );
}