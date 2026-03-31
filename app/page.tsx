import React from "react";
import { client } from "@/sanity/lib/client"; // 🌟 1. นำเข้า client ของ Sanity (เช็ค path ให้ตรงกับโปรเจกต์ของน้องด้วยนะครับ)

// Import Components ของคุณทั้งหมด
import BlurredBackground from "./components/home/BlurredBackground";
import HeroSection from "./components/home/HeroSection";
import ClientSection from "./components/home/ClientSection"; 
import ServiceSection from "./components/home/ServiceSection";
import ProductsSection from "./components/home/ProductsSection";
import WorksSection from "./components/home/WorksSection";
import TestimonialSection from "./components/home/TestimonialSection";
import CtaSection from "./components/home/CtaSection";

// 🌟 2. เปลี่ยนเป็น async function เพื่อให้สามารถใช้ await ดึงข้อมูลได้
export default async function Home() {
  
  // 🌟 3. คำสั่ง GROQ: ดึงเอา Service "ตัวแรกสุด" ของ 3 หมวดหมู่นี้ออกมา (จะได้ Array 3 ตัวพอดี)
  const query = `[
    *[_type == "service" && category == "Digital Marketing"] | order(_createdAt asc)[0],
    *[_type == "service" && category == "Business Strategies"] | order(_createdAt asc)[0],
    *[_type == "service" && category == "Commercial"] | order(_createdAt asc)[0]
  ] {
    title,
    description,
    category,
    "slug": slug.current,
    "image": heroImage.asset->url
  }`;

  // 🌟 4. ใช้ try...catch เพื่อดัก Error กรณี Sanity มีปัญหา เว็บเราจะได้ไม่พัง (จอขาว)
  let fetchedServices = [];
  try {
    fetchedServices = await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch featured services:", error);
  }

  return (
    <div className="relative min-h-screen text-gray-900 font-sans">

      {/* 1. Video Background */}
      <BlurredBackground />

      {/* 2. Sections อื่นๆ วางต่อกันได้ตามปกติเลย */}
      <HeroSection />
      <ClientSection />
      
      {/* 🌟 5. ส่งข้อมูลที่ดึงมา (fetchedServices) เข้าไปใน ServiceSection ของเรา */}
      <ServiceSection servicesData={fetchedServices} />
      
      <ProductsSection />
      <WorksSection />
      <TestimonialSection />
      <CtaSection />

    </div>
  );
}