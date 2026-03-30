import React from "react";
import Reveal from "@/app/components/Reveal"; // นำเข้า Reveal ให้ถูก Path ตามเครื่องคุณนะครับ

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20 pb-12">
            <div className="text-center w-full px-4 max-w-7xl mx-auto z-10 flex flex-col items-center">

                {/* 1. ตัวหนังสือยักษ์ เด้งขึ้นมาทันที (delay 0) */}
                <Reveal delayMs={0}>
                    <h1 className="font-black tracking-tighter uppercase leading-[0.9] text-white drop-shadow-2xl">
                        <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] mb-4 md:mb-6">
                            YOUR PARTNER IN
                        </span>
                        <span className="block mb-2 text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                            DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005a72] to-[#F48120] drop-shadow-none">GROWTH</span>
                        </span>
                        <span className="block text-4xl sm:text-6xl md:text-7xl text-gray-400 font-light my-4 md:my-6 italic font-serif">
                            &
                        </span>
                        <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">
                            SUSTAINABLE
                        </span>
                        <span className="block mt-2 text-4xl sm:text-6xl md:text-7xl lg:text-[6rem]">
                            INNOVATION
                        </span>
                    </h1>
                </Reveal>

                {/* 2. คำอธิบาย เด้งตามมาทีหลัง (delay 200ms) ให้ดูมีมิติ */}

                <p className="mt-10 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wider leading-relaxed">
                    เราพร้อมขับเคลื่อนธุรกิจของคุณ ด้วยเทคโนโลยีและกลยุทธ์ที่ยั่งยืน
                </p>

            </div>
        </section>
    );
}