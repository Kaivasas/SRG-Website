"use client";
import React, { useState } from "react";
import Reveal from "@/app/components/Reveal";
import Image from "next/image";

export default function TestimonialSection({ testimonialsData = [] }: { testimonialsData?: any[] }) {
    
    // 🌟 1. จำกัดแค่ 10 การ์ด
    const baseData = testimonialsData.slice(0, 10);
    
    // 🌟 2. ทำ Infinite Loop Trick (โคลนให้มีอย่างน้อย 5 การ์ดเสมอ เพื่อให้อนิเมชั่นสมูท)
    let displayData = [...baseData];
    if (baseData.length > 1 && baseData.length < 5) {
        while (displayData.length < 5) {
            displayData = [...displayData, ...baseData];
        }
    }

    // ใช้ State นับจำนวนครั้งที่กดเลื่อน (ติดลบได้ เป็นร้อยได้) เพื่อให้สมการคำนวณวงกลมทำงาน
    const [count, setCount] = useState(0);

    if (!baseData || baseData.length === 0) return null;

    const total = displayData.length;
    // หา Index จริงๆ ที่กำลังโชว์อยู่ตรงกลาง
    const activeIndex = ((count % total) + total) % total;
    // หา Index ของจุดไข่ปลา (Dots) ด้านล่าง
    const originalActiveIndex = ((count % baseData.length) + baseData.length) % baseData.length;

    const nextSlide = () => setCount(prev => prev + 1);
    const prevSlide = () => setCount(prev => prev - 1);

    return (
        <section className="py-16 md:py-20 relative z-10 flex flex-col items-center overflow-hidden">
            <Reveal delayMs={0}>
                <h2 className="text-4xl font-bold mb-12 text-center w-full max-w-5xl text-white drop-shadow-md">
                    เสียงจากลูกค้าของเรา
                </h2>
            </Reveal>

            <Reveal delayMs={200} className="w-full relative flex justify-center items-center">
                
                {/* Container หลัก (ซ่อนส่วนที่ล้นออกนอกจอ) */}
                <div className="relative w-full h-[450px] md:h-[500px] flex justify-center items-center max-w-[1440px]">
                    
                    {/* 🌟 3. ปุ่มลูกศรซ้าย (จับชิดการ์ดตรงกลางด้วย left-1/2 และดันออก) */}
                    {baseData.length > 1 && (
                        <button 
                            onClick={prevSlide}
                            className="absolute left-1/2 -translate-x-[165px] md:-translate-x-[290px] lg:-translate-x-[350px] z-30 text-4xl md:text-5xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:scale-110 hover:text-blue-400 transition-all p-2 cursor-pointer"
                        >
                            &#8592;
                        </button>
                    )}

                    {/* 🌟 4. วนลูป Render การ์ด (ใช้ CSS Transform จัดการอนิเมชั่นทั้งหมด) */}
                    {displayData.map((current, i) => {
                        let diff = i - activeIndex;

                        // คณิตศาสตร์คำนวณตำแหน่งแบบวงกลม
                        if (diff > total / 2) diff -= total;
                        else if (diff < -total / 2) diff += total;

                        // ป้องกันการ์ดกระตุกกรณีเลขคู่
                        if (total % 2 === 0 && diff === -(total / 2)) {
                            diff += total; 
                        }

                        const isCenter = diff === 0;

                        // คลาสคุมตำแหน่ง (เลื่อนซ้าย-ขวา)
                        let translateXClass = "translate-x-0";
                        if (diff === 1) translateXClass = "translate-x-[110%] md:translate-x-[115%]"; // อยู่ขวา
                        else if (diff === -1) translateXClass = "-translate-x-[110%] md:-translate-x-[115%]"; // อยู่ซ้าย
                        else if (diff > 1) translateXClass = "translate-x-[200%] md:translate-x-[230%]"; // ซ่อนขวา
                        else if (diff < -1) translateXClass = "-translate-x-[200%] md:-translate-x-[230%]"; // ซ่อนซ้าย

                        // คลาสคุมขนาด, ความโปร่งใส, และ Layer
                        let scaleClass = isCenter ? "scale-100" : "scale-[0.85]";
                        let opacityClass = isCenter ? "opacity-100" : (Math.abs(diff) === 1 ? "opacity-40" : "opacity-0");
                        let zIndexClass = isCenter ? "z-20" : (Math.abs(diff) === 1 ? "z-10" : "z-0");
                        let pointerEvents = isCenter ? "pointer-events-auto" : "pointer-events-none";

                        return (
                            <div
                                key={i}
                                className={`absolute bg-white w-[300px] md:w-[500px] shrink-0 p-8 md:p-12 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${translateXClass} ${scaleClass} ${opacityClass} ${zIndexClass} ${pointerEvents}`}
                            >
                                
                                <div className="absolute -top-10 w-20 h-20 md:-top-12 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                                    <Image 
                                      src={current.avatar || "https://i.pravatar.cc/150?img=32"} 
                                      alt={current.name || "Customer Avatar"} 
                                      fill 
                                      sizes="96px" 
                                      className="object-cover" 
                                    />
                                </div>
                                
                                <div className="h-8 md:h-10 mt-6 mb-4 flex items-center justify-center">
                                    {current.companyLogo && (
                                        <Image 
                                            src={current.companyLogo} 
                                            alt="Company Logo" 
                                            width={120} 
                                            height={40} 
                                            className="max-h-full w-auto opacity-60 object-contain" 
                                        />
                                    )}
                                </div>
                                
                                <p className="text-lg md:text-xl text-gray-700 mb-6 italic leading-relaxed min-h-[100px] flex items-center line-clamp-4">
                                    "{current.quote}'''
                                </p>
                                
                                <div>
                                    <p className="font-bold text-lg md:text-xl text-gray-900 mb-1 tracking-tight">{current.name}</p>
                                    <p className="text-blue-600 font-medium text-xs md:text-sm mt-1 line-clamp-1">{current.position}</p>
                                    {current.company && (
                                        <p className="text-gray-500 font-normal text-xs md:text-sm mt-0.5 line-clamp-1">{current.company}</p>
                                    )}
                                </div>

                            </div>
                        );
                    })}

                    {/* 🌟 5. ปุ่มลูกศรขวา (จับชิดการ์ดตรงกลางด้วย right-1/2 และดันออก) */}
                    {baseData.length > 1 && (
                        <button 
                            onClick={nextSlide}
                            className="absolute right-1/2 translate-x-[165px] md:translate-x-[290px] lg:translate-x-[350px] z-30 text-4xl md:text-5xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:scale-110 hover:text-blue-400 transition-all p-2 cursor-pointer"
                        >
                            &#8594;
                        </button>
                    )}
                </div>

                {/* จุดไข่ปลา (Dots Pagination) - คำนวณตามข้อมูลออริจินัล */}
                {baseData.length > 1 && (
                    <div className="absolute -bottom-8 flex gap-2 z-30">
                        {baseData.map((_, idx) => (
                            <button 
                                key={idx}
                                onClick={() => {
                                    // กระโดดไปยังการ์ดที่คลิกได้ทันที
                                    const diff = idx - originalActiveIndex;
                                    setCount(prev => prev + diff);
                                }}
                                className={`h-2 rounded-full transition-all duration-500 ${idx === originalActiveIndex ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/60'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </Reveal>
        </section>
    );
}