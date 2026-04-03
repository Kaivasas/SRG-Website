import React from "react";
import { client } from "@/sanity/lib/client";
import WorksClient from "./WorksClient"; // 🌟 ดึงไฟล์ลูกมาใช้

// 🌟 ไฟล์แม่เป็น Server Component ดึงข้อมูลอย่างเดียว
export default async function WorksSection() {

  // 1. ดึงข้อมูลจาก Sanity
  const worksQuery = `*[_type == "work"] | order(_createdAt desc)[0...4] {
    title,
    "slug": slug.current,
    client,
    year,
    "thumbnail": thumbnail.asset->url
  }`;
  try {
    const worksData = await client.fetch(worksQuery);

    // 2. ถ้าไม่มีข้อมูลก็ซ่อนไปเลย
    if (!worksData || worksData.length === 0) return null;

    // 3. ส่งข้อมูลไปให้ไฟล์ลูกทำ UI ต่อ
    return <WorksClient worksData={worksData} />;

  } catch (error) {
    console.error("🔥 Sanity Error in WorksSection:", error);

    // คืนค่า null เพื่อให้ Section นี้ซ่อนตัวไปเงียบๆ เว็บส่วนอื่นจะได้ทำงานต่อได้
    return null;
  }
}