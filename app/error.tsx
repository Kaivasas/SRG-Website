"use client"; // ไฟล์ Error ต้องเป็น Client Component เสมอ
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // ส่ง Error ไปบันทึกในระบบแจ้งเตือนของบริษัท (ถ้ามี)
    console.error("Critical Page Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 text-center">
      <h2 className="text-4xl font-bold mb-4 text-[#FAD337]">Oops! Something went wrong.</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        ขออภัยครับ เกิดข้อผิดพลาดในการโหลดข้อมูลบางส่วน กรุณาลองใหม่อีกครั้ง
      </p>
      <button
        onClick={() => reset()} // ปุ่มนี้จะสั่งให้ Next.js พยายามโหลดหน้าเว็บนี้ใหม่อีกครั้ง
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold uppercase tracking-wider transition"
      >
        Try Again
      </button>
    </div>
  );
}