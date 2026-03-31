"use client"; 
import React, { useEffect, useRef, useState } from "react";

export default function Workflow({ service }: { service: any }) {
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveWorkflow(index);
        }
      });
    }, observerOptions);

    rowsRef.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, [service?.workflow]);

  if (!service?.workflow || service.workflow.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 bg-transparent overflow-hidden">
      
      {/* ส่วนหัว (Header) */}
      <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-16 md:mb-24">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">
              Our Process
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1]">
            เราจะทำงาน<br className="hidden md:block" />กันแบบไหน?
          </h2>
        </div>
        <p className="text-white/50 text-lg max-w-md font-light leading-relaxed pb-2">
          กระบวนการทำงานที่โปร่งใส ตรวจสอบได้ และมุ่งเน้นผลลัพธ์ที่ดีที่สุดสำหรับแบรนด์ของคุณในทุกขั้นตอน
        </p>
      </div>

      {/* 🌟 ส่วนรายการ (ปรับเป็น 2 คอลัมน์ เพื่อรองรับข้อความยาวๆ) */}
      <div className="flex flex-col w-full border-b border-white/10">
        {service.workflow.map((item: any, index: number) => {
          const autoNumber = String(index + 1).padStart(2, '0');
          const numberColor = item.color || 'text-white/20';

          return (
            <div 
              key={item._key || index} 
              ref={(el) => { rowsRef.current[index] = el; }}
              data-index={index}
              // 🌟 แบ่ง Grid เป็น 12 ส่วนเหมือนเดิม แต่จัดกลุ่มใหม่
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 md:py-16 border-t border-white/10 group hover:bg-white/[0.02] transition-colors duration-500 cursor-default px-4 md:px-0"
            >
              
              {/* 🌟 ฝั่งซ้าย (5 ส่วน): รวบตัวเลขและหัวข้อมาไว้ด้วยกัน */}
              <div className="lg:col-span-5 flex flex-row lg:flex-col gap-6 lg:gap-4 items-start">
                <span className={`text-5xl md:text-6xl font-light tracking-tighter leading-none ${numberColor} group-hover:-translate-y-2 transition-transform duration-700 ease-out`}>
                  {autoNumber}.
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500 mt-1 lg:mt-2">
                  {item.title}
                </h3>
              </div>
              
              {/* 🌟 ฝั่งขวา (7 ส่วน): ให้คำอธิบายได้กางออกเต็มที่ ไม่กระจุกเป็นก้อน */}
              <div className="lg:col-span-7 flex items-start lg:items-center">
                {/* ขยายขนาด font ให้ใหญ่ขึ้นนิดนึง (text-lg md:text-xl) เพื่อให้ข้อความดูเต็มและหรูหราขึ้น */}
                <p className="text-white/50 font-light leading-relaxed text-base md:text-xl group-hover:text-white/80 transition-colors duration-500">
                  {item.desc}
                </p>
              </div>

            </div>
          );
        })}
      </div>
      
    </section>
  );
}