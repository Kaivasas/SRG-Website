"use client";
import React, { useState, useEffect } from "react";
// 🌟 1. นำเข้า Image จาก next/image
import Image from "next/image";

// รับ Props เป็นข้อมูล clients ที่ดึงมาจาก Sanity
export default function ClientCarousel({ clients }: { clients: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 16;
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  useEffect(() => {
    if (totalPages <= 1) return; // ถ้ามีหน้าเดียวไม่ต้องเลื่อนอัตโนมัติ
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  // ตัดแบ่งข้อมูล
  const currentClients = clients.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  if (!clients || clients.length === 0) return null;

  return (
    <>
      <div className="w-full max-w-5xl bg-white/10 p-10 border border-white/20 rounded-3xl mb-8 backdrop-blur-sm shadow-xl min-h-40 flex items-center justify-center">
        <div key={currentIndex} className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center animate-pulse-short">
          {currentClients.map((client) => (
            // 🌟 คอนเทนเนอร์นี้มี relative อยู่แล้ว Image fill เลยทำงานได้สมบูรณ์
            <div key={client._id} className="w-32 h-16 flex items-center justify-center text-white/40 font-bold text-sm relative group">
              {client.logo ? (
                // 🌟 2. เปลี่ยนเป็น <Image>
                <Image
                  src={client.logo}
                  alt={client.name || "Client Logo"}
                  fill={true}
                  // โลโก้กว้างสุดแค่ 32 (128px) เลยฟิกซ์ sizes เล็กๆ ไว้ได้เลย ประหยัดเน็ตมาก
                  sizes="128px"
                  // ย้าย class เดิมมาใส่ที่นี่ ยกเว้น max-w/max-h เพราะ fill คุมให้แล้ว
                  className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm"
                />
              ) : (
                <span className="tracking-widest uppercase">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex space-x-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-3 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? 'bg-blue-500 w-8 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                  : 'bg-white/30 w-3 hover:bg-white/60 cursor-pointer'
              }`}
            ></button>
          ))}
        </div>
      )}
    </>
  );
}