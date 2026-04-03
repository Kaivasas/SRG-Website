import React from "react";
import { client } from "@/sanity/lib/client";
import TestimonialCarousel from "./TestimonialCarousel"; // 🌟 ดึงไฟล์ลูกมาใช้

// 🌟 ไฟล์แม่เป็น Server Component ไม่มี "use client" แล้ว!
export default async function TestimonialSection() {
  
  // 1. ดึงข้อมูลจาก Sanity
  const query = `*[_type == "testimonial"] | order(_createdAt desc)[0...10] {
    name,
    position,
    company,
    quote,
    "avatar": avatar.asset->url,
    "companyLogo": companyLogo.asset->url
  }`;
try {
  const testimonials = await client.fetch(query);

  // 2. ถ้าไม่มีข้อมูลก็ซ่อนไปเลย
  if (!testimonials || testimonials.length === 0) return null;

  // 3. ส่งข้อมูลไปให้ไฟล์ลูก (Carousel) ทำสไลเดอร์ต่อ
  return <TestimonialCarousel testimonialsData={testimonials} />;
} catch (error){
  // 🌟 ถ้า Sanity ล่ม หรือเน็ตหลุด จะเข้าเงื่อนไขนี้
    console.error("🔥 Sanity Error in TestimonialSection:", error);
    
    // คืนค่า null เพื่อให้ Section นี้ซ่อนตัวไปเงียบๆ เว็บส่วนอื่นจะได้ทำงานต่อได้
    return null; 
}
}