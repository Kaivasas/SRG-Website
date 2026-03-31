import React from "react";
import { client } from "@/sanity/lib/client";

// Import Components ของคุณทั้งหมด
import BlurredBackground from "./components/home/BlurredBackground";
import HeroSection from "./components/home/HeroSection";
import ClientSection from "./components/home/ClientSection"; 
import ServiceSection from "./components/home/ServiceSection";
import ProductsSection from "./components/home/ProductsSection";
import WorksSection from "./components/home/WorksSection";
import TestimonialSection from "./components/home/TestimonialSection";
import CtaSection from "./components/home/CtaSection";

export default async function Home() {
  
  // 1. ดึงข้อมูล Services สำหรับ ServiceSection (ของเดิมที่คุณมีอยู่แล้ว)
  const serviceQuery = `[
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

  // 🌟 2. คำสั่ง GROQ ใหม่! ดึงผลงาน 4 ชิ้นล่าสุด
  // order(_createdAt desc) = เรียงจากใหม่ไปเก่า
  // [0...4] = เอาลำดับที่ 0 ถึง 3 (รวม 4 ชิ้น)
  const worksQuery = `*[_type == "work"] | order(_createdAt desc)[0...4] {
    title,
    "slug": slug.current,
    client,
    year,
    "thumbnail": thumbnail.asset->url
  }`;

  // 🌟 1. เพิ่มคำสั่ง GROQ ตรงนี้
  const testimonialQuery = `*[_type == "testimonial"] | order(_createdAt desc)[0...10] {
    name,
    position,
    company,
    quote,
    "avatar": avatar.asset->url,
    "companyLogo": companyLogo.asset->url
  }`;

  let fetchedServices = [];
  let fetchedWorks = [];
  let fetchedTestimonials = []; // 🌟 2. ตัวแปรเก็บรีวิว

  try {
    // 🌟 3. ดึงข้อมูล 2 อย่างพร้อมกันผ่าน Promise.all เพื่อความรวดเร็ว
    const [servicesData, worksData, testimonialsData] = await Promise.all([
      client.fetch(serviceQuery),
      client.fetch(worksQuery),
      client.fetch(testimonialQuery),
    ]);
    
    fetchedServices = servicesData;
    fetchedWorks = worksData;
    fetchedTestimonials = testimonialsData;
  } catch (error) {
    console.error("Failed to fetch data for Home page:", error);
  }

  return (
    <div className="relative min-h-screen text-gray-900 font-sans">
      <BlurredBackground />

      <HeroSection />
      <ClientSection />
      <ServiceSection servicesData={fetchedServices} />
      <ProductsSection />
      
      {/* 🌟 4. ส่งข้อมูลที่ดึงมาให้ WorksSection */}
      <WorksSection worksData={fetchedWorks} />
      
      <TestimonialSection testimonialsData={fetchedTestimonials} />
      <CtaSection />
    </div>
  );
}