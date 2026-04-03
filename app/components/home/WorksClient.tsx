"use client"
import React, { useEffect, useRef, useState } from "react"
import Reveal from "@/app/components/Reveal";
import Image from "next/image";
import Link from "next/link"; 

// 🌟 เปลี่ยนชื่อเป็น WorksClient
export default function WorksClient({ worksData = [] }: { worksData?: any[] }) {
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

    if (!worksData || worksData.length === 0) return null;

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
                    className="flex gap-8 md:gap-16 px-[10vw] transition-transform duration-100 ease-out will-change-transform w-max"
                    style={{ transform: `translateX(calc(-${projectScrollProgress * 100}% + ${projectScrollProgress * 100}vw))` }}
                >
                    {worksData.map((work, index) => (
                        <Link 
                            href={`/works/${work.slug}`} 
                            key={index}
                            className="w-[85vw] md:w-[600px] lg:w-[800px] shrink-0 group cursor-pointer"
                        >
                            <div className="aspect-video bg-gray-900 mb-6 md:mb-8 overflow-hidden relative border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl md:rounded-3xl">
                                <Image 
                                    src={work.thumbnail || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"} 
                                    alt={work.title} 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, 800px" 
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                                />
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div>
                                <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 uppercase group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">
                                    {work.title}
                                </h4>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-gray-400 font-light uppercase text-xs md:text-sm tracking-widest line-clamp-1">
                                        {work.client || 'Client'} / {work.year || '2024'}
                                    </p>
                                    <span className="text-white/30 text-xl md:text-2xl group-hover:text-blue-400 transition-colors">&rarr;</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}