import React from "react";
import { client } from "@/sanity/lib/client";
import ServiceClient from "./ServiceClient"; // 🌟 ดึงไฟล์ลูกมาใช้

// 🌟 ไฟล์แม่เป็น Server Component ดึงข้อมูลอย่างเดียว
export default async function ServiceSection() {
  
  // 1. ดึงข้อมูลจาก Sanity
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
try {
  const servicesData = await client.fetch(serviceQuery);

  // 2. ถ้าไม่มีข้อมูลก็ซ่อนไปเลย
  if (!servicesData || servicesData.length === 0) return null;

  // 3. ส่งข้อมูลไปให้ไฟล์ลูกทำ UI ต่อ
  return <ServiceClient servicesData={servicesData} />;
} catch (error) {
  // 🌟 ถ้า Sanity ล่ม หรือเน็ตหลุด จะเข้าเงื่อนไขนี้
    console.error("🔥 Sanity Error in ServiceSection:", error);
    
    // คืนค่า null เพื่อให้ Section นี้ซ่อนตัวไปเงียบๆ เว็บส่วนอื่นจะได้ทำงานต่อได้
    return null;
}
}