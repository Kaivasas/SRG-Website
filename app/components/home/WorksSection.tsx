"use client"
import React, { useEffect, useRef, useState } from "react"
import Reveal from "@/app/components/Reveal";
import Image from "next/image"; // 🌟 1. นำเข้า Image

export default function WorksSection() {
    const projectSectionRef = useRef<HTMLDivElement>(null);
    const [projectScrollProgress, setProjectScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (projectSectionRef.current) {
                const { top, height } = projectSectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const progress = -top / (height - windowHeight);
                setProjectScrollProgress(Math.min(Math.max(progress, 0), 1));
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="works" ref={projectSectionRef} className="h-[300vh] relative z-10 bg-transparent">

            <div className="sticky top-0 h-svh flex flex-col justify-center overflow-hidden ">

                <div className="pl-[10vw] mb-12 relative z-20 flex flex-col pr-[10vw]">
                    <Reveal delayMs={0}>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight drop-shadow-lg leading-none">
                            Our Works
                        </h2>
                    </Reveal>
                    <Reveal delayMs={150}>
                        <p className="text-blue-500 text-sm md:text-base mt-4 font-bold tracking-widest uppercase">
                            Selected Projects
                        </p>
                    </Reveal>
                </div>

                <div
                    className="flex gap-8 px-[10vw] transition-transform duration-100 ease-out will-change-transform w-max"
                    style={{ transform: `translateX(calc(-${projectScrollProgress * 100}% + ${projectScrollProgress * 100}vw))` }}
                >
                    {/* Project Card 1 */}
                    <div className="min-w-[320px] md:min-w-105 shrink-0 group cursor-pointer">
                        <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                            {/* 🌟 2. เปลี่ยน img เป็น Image */}
                            <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Project 1" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">TechVision Store</h4>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-400 font-light uppercase text-xs tracking-widest">E-Commerce / 2024</p>
                                <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                            </div>
                        </div>
                    </div>

                    {/* Project Card 2 */}
                    <div className="min-w-[320px] md:min-w-105 shrink-0 group cursor-pointer">
                        <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                            <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Project 2" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">Analytica Systems</h4>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-400 font-light uppercase text-xs tracking-widest">Data Dashboard / 2023</p>
                                <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                            </div>
                        </div>
                    </div>

                    {/* Project Card 3 */}
                    <div className="min-w-[320px] md:min-w-105 shrink-0 group cursor-pointer">
                        <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                            <Image src="https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?w=800&q=80" alt="Project 3" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">FinTech Pay App</h4>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-400 font-light uppercase text-xs tracking-widest">Mobile App / 2024</p>
                                <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                            </div>
                        </div>
                    </div>

                    {/* Project Card 4 */}
                    <div className="min-w-[320px] md:min-w-105 shrink-0 group cursor-pointer">
                        <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative border border-white/10 shadow-lg rounded-2xl">
                            <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="Project 4" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors">Global Logistics</h4>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-400 font-light uppercase text-xs tracking-widest">Corporate Web / 2023</p>
                                <span className="text-white/30 group-hover:text-blue-400 transition-colors">&rarr;</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}