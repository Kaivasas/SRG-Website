import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import TransitionLoader from "./components/ui/TransitionLoader";
import { client } from "@/sanity/lib/client"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sustain Republix",
  description: "Your Partner in Digital Growth",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  // 🌟 1. สร้างตัวแปรเริ่มต้นเป็น Array ว่าง เผื่อไว้กรณีพัง
  let services = [];

  // 🌟 2. ใช้ try...catch เพื่อดัก Error
  try {
    const servicesQuery = `*[_type == "service"] | order(title asc) {
      title,
      slug,
      category
    }`;
    services = await client.fetch(servicesQuery);
  } catch (error) {
    // ถ้า Sanity พัง มันจะวิ่งมาเข้าบล็อกนี้ เว็บจะไม่จอขาว
    console.error("Failed to fetch Navbar services:", error);
    // services ก็จะเป็น [] ตามที่ตั้งไว้ตอนแรก
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TransitionLoader />
        
        {/* Navbar จะได้รับ Array ว่างไปแทน ทำให้มันลูปไม่เจอข้อมูล แต่เว็บไม่แครช! */}
        <Navbar services={services} />
        
        {children}
        <Footer />
      </body>
    </html>
  );
}