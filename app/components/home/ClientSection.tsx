"use client"; // ต้องเติมบรรทัดนี้เพราะเรามีการใช้ useState และ useEffect เพื่อควบคุมการสไลด์

import React, { useState, useEffect } from "react";

// 1. Array เก็บรายชื่อและ Path ของโลโก้ (ผมเพิ่มแบรนด์สมมติเข้าไปให้ครบ 8 อัน เพื่อให้มันแบ่งเป็น 2 หน้าได้ครับ)
const clients = [
  { id: 1, name: "TVD", logo: "/assets/clients/tvd.png" },
  { id: 2, name: "Smooth E", logo: "/assets/clients/smoothe.png" },
  { id: 3, name: "Physiogel", logo: "/assets/clients/physiogel.png" },
  { id: 4, name: "Inter Express", logo: "/assets/clients/interexpress.png" },
  { id: 5, name: "Brand 5", logo: "/assets/clients/brand5.png" },
  { id: 6, name: "Brand 6", logo: "/assets/clients/brand6.png" },
  { id: 7, name: "Brand 7", logo: "/assets/clients/brand7.png" },
  { id: 8, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 9, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 10, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 11, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 12, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 13, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 14, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 15, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 16, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 17, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 18, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 19, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 20, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 21, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 22, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 23, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 24, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 25, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 26, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 27, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 28, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 29, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 30, name: "Brand 8", logo: "/assets/clients/brand8.png" },
  { id: 31, name: "Brand 8", logo: "/assets/clients/brand8.png" },

];

export default function ClientSection() {
  // 2. สร้าง State เพื่อจดจำว่าตอนนี้อยู่หน้าไหน (เริ่มที่ 0)
  const [currentIndex, setCurrentIndex] = useState(0);

  // กำหนดว่าหน้านึงจะโชว์กี่โลโก้ (คอมพิวเตอร์โชว์ 4 อัน)
  const itemsPerPage = 16;
  // คำนวณว่าทั้งหมดมีกี่หน้า (เช่น 8 โลโก้ หาร 4 = 2 หน้า)
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  // 3. ระบบเลื่อนอัตโนมัติ (Auto-play)
  useEffect(() => {
    // ตั้งเวลาให้เปลี่ยนหน้าทุกๆ 4 วินาที (4000 ms)
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 4000);

    // ล้างเวลาทิ้งเมื่อ Component ปิดตัวลง เพื่อป้องกันบัค
    return () => clearInterval(timer);
  }, [totalPages]);

  // ตัดแบ่งข้อมูลมาโชว์ทีละ 4 อันตามหน้าปัจจุบัน
  const currentClients = clients.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  {/* ------------------------------------------------------------- */ }
  {/* Trusted Brands (เรียกใช้ Component แค่บรรทัดเดียว!) */ }
  {/* ------------------------------------------------------------- */ }
  return (
    <section className="py-12 md:py-16 flex flex-col items-center z-10 relative">
      <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-lg tracking-wide">
        แบรนด์ที่ไว้วางใจกับทางเรา
      </h2>

      {/* กล่องกระจก (Glassmorphism) */}
      <div className="w-full max-w-5xl bg-white/10 p-10 border border-white/20 rounded-3xl mb-8 backdrop-blur-sm shadow-xl min-h-40 flex items-center justify-center">

        {/* ใส่ key เป็น currentIndex เพื่อให้มัน Re-render สวยๆ เวลาเปลี่ยนหน้า */}
        <div key={currentIndex} className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center animate-pulse-short">

          {/* ใช้ currentClients (ข้อมูลที่ถูกตัดมาแค่ 4 ตัว) */}
          {currentClients.map((client) => (
            <div key={client.id} className="w-32 h-16 flex items-center justify-center text-white/40 font-bold text-sm">
              {/* ถ้ามีรูปแล้ว มันจะโชว์รูปแทนตัวหนังสือด้านล่างครับ */}
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-35 max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer drop-shadow-sm"
                // โค้ดสำรอง (Fallback) ถ้ารูปเสีย ให้แสดงชื่อแบรนด์แทน (แก้ปัญหาไอคอนกระดาษขาด)
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* โชว์ชื่อแบรนด์ถ้ารูปโหลดไม่ติด */}
              <span className="hidden tracking-widest uppercase">{client.name}</span>
            </div>
          ))}

        </div>

      </div>

      {/* จุดวงกลม (Pagination Indicators) ที่กดได้ */}
      <div className="flex space-x-3">
        {/* วนลูปสร้างจุดตามจำนวนหน้าทั้งหมด (totalPages) */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            // เมื่อกดจุด ให้เปลี่ยนหน้าไปที่หน้านั้น
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-3 rounded-full transition-all duration-500 ${i === currentIndex
                ? 'bg-blue-500 w-8 shadow-[0_0_10px_rgba(59,130,246,0.8)]' // จุดที่กำลังแอคทีฟ (ยาวขึ้นและมีแสง)
                : 'bg-white/30 w-3 hover:bg-white/60 cursor-pointer' // จุดธรรมดา
              }`}
          ></button>
        ))}
      </div>
    </section>
  );
}