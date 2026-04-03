"use client";
import React, { useEffect, useRef, useState } from "react";
import Reveal from "@/app/components/Reveal";
import Image from "next/image";
import Link from "next/link"; 

// 🌟 เปลี่ยนชื่อเป็น ServiceClient
export default function ServiceClient({ servicesData = [] }: { servicesData?: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollableDistance = height - windowHeight;
        const progress = -top / scrollableDistance;
        setScrollYProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validServices = servicesData.filter(Boolean);
  if (validServices.length === 0) return null;

  const services = validServices.map((svc, index) => {
    const uiConfigs = [
      { bgClass: "from-[#002a3a]/90 to-black/90", overlayClass: "bg-blue-500/20" }, 
      { bgClass: "from-[#001f2b]/95 to-black/95", overlayClass: "bg-blue-500/20" }, 
      { bgClass: "from-black to-gray-900", overlayClass: "bg-gray-500/20" }         
    ];
    
    const config = uiConfigs[index] || uiConfigs[2];

    return {
      id: `0${index + 1} / ${svc.category}`, 
      title: svc.title,
      desc: svc.description,
      image: svc.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      slug: svc.slug,
      ...config 
    };
  });

  const totalCards = services.length;
  const segment = scrollYProgress * (totalCards - 1);

  return (
    <section id="services" ref={sectionRef} className="relative z-10" style={{ height: `${totalCards * 100}vh` }}>
      
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full relative z-20">
          
          <div className="text-center mb-10 md:mb-16 relative">
            <Reveal delayMs={0}>
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-2xl">our services</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-6"></div>
            </Reveal>
          </div>

          <div className="relative w-full h-[65vh] md:h-[60vh]">
            {services.map((svc, index) => {
              
              let translateY = 0;
              let scale = 1;
              let opacity = 1;
              let brightness = 1;

              if (segment < index) {
                translateY = (index - segment) * 100;
              } else {
                const past = segment - index;
                scale = 1 - (past * 0.05);
                opacity = 1 - (past * 1);
                brightness = 1 - (past * 0.2);
              }

              const isCovered = segment - index > 0.1;
              const shadowClass = isCovered 
                ? "shadow-none border-white/5" 
                : "shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border-white/20";

              return (
                <div 
                  key={index}
                  className="absolute inset-0 w-full h-full will-change-transform"
                  style={{ 
                    transform: `translateY(${translateY}vh) scale(${scale})`, 
                    opacity: opacity,
                    zIndex: index,
                    filter: `brightness(${brightness})`,
                  }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${svc.bgClass} backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center border transition-all duration-300 ${shadowClass}`}>
                    
                    <div className="mb-8 md:mb-0 md:pr-12 w-full md:w-1/2">
                      <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">{svc.id}</span>
                      <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{svc.title}</h3>
                      <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 line-clamp-3 md:line-clamp-none">{svc.desc}</p>
                      
                      {svc.slug ? (
                        <Link href={`/services/${svc.slug}`} className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase inline-block">
                          Discover More
                        </Link>
                      ) : (
                        <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase cursor-not-allowed opacity-50">
                          Coming Soon
                        </button>
                      )}

                    </div>
                    
                    <div className="w-full md:w-1/2 h-48 md:h-full rounded-3xl overflow-hidden relative group shrink-0">
                      <div className={`absolute inset-0 ${svc.overlayClass} group-hover:bg-transparent transition duration-500 z-10`}></div>
                      <Image 
                        src={svc.image} 
                        alt={svc.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                        className="object-cover group-hover:scale-110 transition duration-700" 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}