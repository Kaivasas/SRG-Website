"use client"

import React from "react"

export default function ProductsSection() {
  {/* ------------------------------------------------------------- */ }
  {/* Products Section */ }
  {/* ------------------------------------------------------------- */ }
  {/* ปรับลด padding จาก py-24 md:py-32 เป็น py-16 md:py-20 */ }
  return (
    <section id="products" className="py-16 md:py-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-blue-500 font-bold uppercase tracking-widest block mb-4 text-sm">Innovation</span>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-md">Our Products</h2>
          </div>
          <p className="max-w-md text-gray-300 text-lg font-light tracking-wide leading-relaxed border-l-[3px] border-[#F48120] pl-4">
            นวัตกรรมและโซลูชันพร้อมใช้งานที่เราพัฒนาขึ้นมาเพื่อตอบสนองความต้องการในยุคดิจิทัล
          </p>
        </div>

        <div className="flex flex-col border border-white/10 bg-black shadow-2xl">
          {/* Product 01 */}
          <div className="group flex flex-col md:flex-row items-stretch min-h-100 border-b border-white/10">
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-500 hover:bg-white/5">
              <span className="absolute -left-4 -top-10 text-[10rem] font-black text-white/5 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">01</span>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">AI Virtual Avatar</h3>
                <p className="mb-8 text-gray-400 text-lg leading-relaxed font-light">
                  ระบบแชทบอทอัจฉริยะที่มาพร้อมอวาตาร์เสมือนจริง และระบบโต้ตอบด้วยเสียง (Voice Interaction) ยกระดับงานบริการลูกค้าให้เป็นธรรมชาติ
                </p>
                <a href="#" className="inline-flex items-center gap-4 text-blue-400 font-bold uppercase tracking-wider group/link hover:text-blue-300 transition-colors">
                  ดูรายละเอียด <span className="transform group-hover/link:translate-x-2 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative bg-gray-900 min-h-75 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" alt="AI Avatar" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
          </div>

          {/* Product 02 */}
          <div className="group flex flex-col md:flex-row-reverse items-stretch min-h-100 border-b border-white/10">
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-500 hover:bg-white/5">
              <span className="absolute -left-4 -top-10 text-[10rem] font-black text-white/5 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">02</span>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Interactive Photo Booth</h3>
                <p className="mb-8 text-gray-400 text-lg leading-relaxed font-light">
                  ระบบถ่ายภาพสำหรับงานอีเวนต์ พร้อมฟีเจอร์ลบพื้นหลัง (Background Removal) และใส่ฟิลเตอร์แบบ Real-time สร้าง Engagement ให้แบรนด์
                </p>
                <a href="#" className="inline-flex items-center gap-4 text-[#F48120] font-bold uppercase tracking-wider group/link hover:text-orange-300 transition-colors">
                  ดูรายละเอียด <span className="transform group-hover/link:translate-x-2 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative bg-gray-900 min-h-75 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Photo Booth" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
          </div>

          {/* Product 03 */}
          <div className="group flex flex-col md:flex-row items-stretch min-h-100">
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-500 hover:bg-white/5">
              <span className="absolute -left-4 -top-10 text-[10rem] font-black text-white/5 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">03</span>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Smart Management</h3>
                <p className="mb-8 text-gray-400 text-lg leading-relaxed font-light">
                  แพลตฟอร์มการจัดการข้อมูลแบบครบวงจร ที่พัฒนามาเพื่ออุตสาหกรรมเฉพาะทาง ช่วยให้การทำงานของทีมเป็นระบบ
                </p>
                <a href="#" className="inline-flex items-center gap-4 text-green-400 font-bold uppercase tracking-wider group/link hover:text-green-300 transition-colors">
                  ดูรายละเอียด <span className="transform group-hover/link:translate-x-2 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative bg-gray-900 min-h-75 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80" alt="Platform" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 md:mt-16">
          <button className="bg-transparent border border-white/30 text-white font-bold py-4 px-12 md:py-4 md:px-16 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-black transition duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}