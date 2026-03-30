import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/ui/Navbar"; // ตรวจสอบ Path ให้ตรงกับไฟล์ของคุณ
import { client } from "@/sanity/lib/client"; // นำเข้าตัวดึงข้อมูล Sanity

export const metadata: Metadata = {
  title: "Sustain Republix",
  description: "Your Partner in Digital Growth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 🟢 1. ดึงรายชื่อ Service ทั้งหมด พร้อมหมวดหมู่และ Slug
  const query = `*[_type == "service"] | order(title asc) {
    title,
    "slug": slug.current,
    category
  }`;
  const services = await client.fetch(query);

  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {/* 🟢 2. โยนข้อมูล services ไปให้ Navbar */}
        <Navbar services={services} />
        {children}
      </body>
    </html>
  );
}