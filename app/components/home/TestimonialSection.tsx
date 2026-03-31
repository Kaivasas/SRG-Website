"use client";
import React, { useState, useMemo, useCallback } from "react";
import Reveal from "@/app/components/Reveal";
import Image from "next/image";

export default function TestimonialSection({ testimonialsData = [] }: { testimonialsData?: any[] }) {
    
    // 🌟 1. Performance Optimize: ใช้ useMemo เพื่อไม่ให้ React คำนวณ Array ใหม่ทุกครั้งที่กดเลื่อน
    const { baseData, displayData } = useMemo(() => {
        const base = testimonialsData.slice(0, 10);
        let display = [...base];
        
        // โคลนการ์ดให้มีอย่างน้อย 5 ใบเฉพาะตอนที่ข้อมูลโหลดมาครั้งแรกเท่านั้น
        if (base.length > 1 && base.length < 5) {
            while (display.length < 5) {
                display = [...display, ...base];
            }
        }
        return { baseData: base, displayData: display };
    }, [testimonialsData]); // คำนวณใหม่เฉพาะตอนที่ข้อมูลจาก Database เปลี่ยนแปลง

    const [count, setCount] = useState(0);

    // 🌟 2. Performance Optimize: ใช้ useCallback เพื่อจำ Function ไว้ใน Memory ไม่ต้องสร้างใหม่ทุก Render
    const nextSlide = useCallback(() => setCount(prev => prev + 1), []);
    const prevSlide = useCallback(() => setCount(prev => prev - 1), []);

    if (!baseData || baseData.length === 0) return null;

    const total = displayData.length;
    const activeIndex = ((count % total) + total) % total;
    const originalActiveIndex = ((count % baseData.length) + baseData.length) % baseData.length;

    return (
        <section className="py-16 md:py-20 relative z-10 flex flex-col items-center overflow-hidden">
            <Reveal delayMs={0}>
                <h2 className="text-4xl font-bold mb-12 text-center w-full max-w-5xl text-white drop-shadow-md">
                    เสียงจากลูกค้าของเรา
                </h2>
            </Reveal>

            <Reveal delayMs={200} className="w-full relative flex justify-center items-center">
                
                <div className="relative w-full h-[450px] md:h-[500px] flex justify-center items-center max-w-[1440px]">
                    
                    {baseData.length > 1 && (
                        <button 
                            onClick={prevSlide}
                            className="absolute left-1/2 -translate-x-[165px] md:-translate-x-[290px] lg:-translate-x-[350px] z-30 text-4xl md:text-5xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:scale-110 hover:text-blue-400 transition-all p-2 cursor-pointer"
                        >
                            &#8592;
                        </button>
                    )}

                    {displayData.map((current, i) => {
                        let diff = i - activeIndex;

                        if (diff > total / 2) diff -= total;
                        else if (diff < -total / 2) diff += total;

                        if (total % 2 === 0 && diff === -(total / 2)) {
                            diff += total; 
                        }

                        const isCenter = diff === 0;

                        // ย้าย Logic การกำหนด Class มาไว้ตรงนี้ให้โค้ดดูคลีนขึ้น
                        let translateXClass = "translate-x-0";
                        if (diff === 1) translateXClass = "translate-x-[110%] md:translate-x-[115%]";
                        else if (diff === -1) translateXClass = "-translate-x-[110%] md:-translate-x-[115%]";
                        else if (diff > 1) translateXClass = "translate-x-[200%] md:translate-x-[230%]";
                        else if (diff < -1) translateXClass = "-translate-x-[200%] md:-translate-x-[230%]";

                        // 🌟 3. ปรับปรุง CSS: ถ้าการ์ดถูกซ่อนอยู่ (opacity-0) ให้เพิ่ม invisible เข้าไปด้วยเพื่อป้องกันการกดโดนโดยบังเอิญ
                        const visibilityClass = Math.abs(diff) > 1 ? "opacity-0 invisible" : "opacity-100 visible";
                        let scaleClass = isCenter ? "scale-100" : "scale-[0.85]";
                        let finalOpacityClass = isCenter ? "opacity-100" : (Math.abs(diff) === 1 ? "opacity-40" : visibilityClass);
                        let zIndexClass = isCenter ? "z-20" : (Math.abs(diff) === 1 ? "z-10" : "z-0");
                        let pointerEvents = isCenter ? "pointer-events-auto" : "pointer-events-none";

                        return (
                            <div
                                key={i}
                                className={`absolute bg-white w-[300px] md:w-[500px] shrink-0 p-8 md:p-12 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl border border-gray-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${translateXClass} ${scaleClass} ${finalOpacityClass} ${zIndexClass} ${pointerEvents}`}
                            >
                                
                                <div className="absolute -top-10 w-20 h-20 md:-top-12 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                                    <Image 
                                      src={current.avatar || "https://i.pravatar.cc/150?img=32"} 
                                      alt={current.name || "Customer Avatar"} 
                                      fill 
                                      sizes="96px" 
                                      // 🌟 4. เพิ่ม loading="lazy" (ถึง Next.js จะทำให้อัตโนมัติ แต่การใส่ไว้ช่วยให้มั่นใจได้มากขึ้น)
                                      loading="lazy"
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
                                            loading="lazy"
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

                    {baseData.length > 1 && (
                        <button 
                            onClick={nextSlide}
                            className="absolute right-1/2 translate-x-[165px] md:translate-x-[290px] lg:translate-x-[350px] z-30 text-4xl md:text-5xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:scale-110 hover:text-blue-400 transition-all p-2 cursor-pointer"
                        >
                            &#8594;
                        </button>
                    )}
                </div>

                {baseData.length > 1 && (
                    <div className="absolute -bottom-8 flex gap-2 z-30">
                        {baseData.map((_, idx) => (
                            <button 
                                key={idx}
                                onClick={() => {
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