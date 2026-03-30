"use client";
import React, { useEffect, useRef, useState } from "react";

export default function WhyChooseUs({ service }: { service: any }) {
  if (!service.benefits || service.benefits.length === 0) return null;
  const whySectionRef = useRef<HTMLDivElement>(null);
  const [whyScrollProgress, setWhyScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (whySectionRef.current) {
        const { top, height } = whySectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = -top / (height - windowHeight);
        setWhyScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!service.benefits || service.benefits.length === 0) return null;

  const totalCards = service.benefits.length;
  let activeCardIndex = Math.floor(whyScrollProgress * totalCards);
  if (activeCardIndex >= totalCards) activeCardIndex = totalCards - 1;

  return (
    <section ref={whySectionRef} className="relative bg-transparent" style={{ height: `${totalCards * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col pt-32 pb-16 overflow-hidden">
        <div className="w-full px-6 md:px-[10vw] mb-12 shrink-0 relative z-10">
          <h2 className="text-3xl md:text-5xl font-light text-white/60 drop-shadow-lg">{service.whyTitle}</h2>
        </div>
        <div className="grow w-full px-6 md:px-[10vw] relative z-20 pb-12">
          {service.benefits.map((benefit: any, index: number) => {
            const autoNumber = String(index + 1).padStart(2, '0');
            const translateX = index <= activeCardIndex ? "0%" : "150vw";
            return (
              <div
                key={index}
                className="absolute inset-x-6 md:inset-x-[10vw] top-0 bottom-12 bg-white/5 backdrop-blur-2xl rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-stretch gap-12 border border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                style={{ transform: `translateX(${translateX})`, zIndex: index }}
              >
                <div className="w-full md:w-[45%] flex flex-col justify-center shrink-0">
                  <span className="text-6xl md:text-[8rem] font-black text-white/10 mb-6 leading-none tracking-tight drop-shadow-md">
                    {autoNumber} {/* ✅ เปลี่ยนเป็นตัวนี้แทนครับ */}
                  </span>
                  <h4 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight tracking-tight drop-shadow-md">{benefit.title}</h4>
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light border-l-4 border-blue-500 pl-6">{benefit.desc}</p>
                </div>
                <div className="grow w-full md:w-[55%] h-60 md:h-auto bg-black/50 rounded-3xl overflow-hidden relative border border-white/5 shadow-inner">
                  <img src={`https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80&sig=${index}`} alt={benefit.title} className="w-full h-full object-cover grayscale opacity-80" />
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}