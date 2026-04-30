"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function normalizeContent(content: unknown): string[] {
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item && typeof item === "object") {
          const maybeBlock = item as { text?: string; children?: Array<{ text?: string }> };
          if (typeof maybeBlock.text === "string") return maybeBlock.text.trim();
          if (Array.isArray(maybeBlock.children)) {
            return maybeBlock.children.map((child) => child?.text?.trim() ?? "").filter(Boolean).join(" ").trim();
          }
        }
        return "";
      })
      .filter(Boolean);
  }
  if (typeof content === "string" && content.trim()) return [content.trim()];
  return [];
}

export default function Scrollytelling({ sections }: { sections: any[] }) {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sectionScrollHeights = useRef<number[]>([]);
  const maxTranslateY = useRef<number[]>([]);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const calculateHeights = () => {
      if (!boxRef.current || !containerRef.current) return;

      const vh = window.innerHeight;
      const boxHeight = boxRef.current.clientHeight;
      const isMobile = window.innerWidth < 768;
      const scrollFactor = isMobile ? 0.4 : 0.8;
      
      let totalScrollHeight = 0;
      const hArray: number[] = [];
      const mArray: number[] = [];

      sections.forEach((_, i) => {
        const contentEl = contentRefs.current[i];
        const contentHeight = contentEl ? contentEl.scrollHeight : boxHeight;
        const maxScroll = Math.max(0, contentHeight - boxHeight + 80); 
        mArray.push(maxScroll);

        const scrollDistanceForThisSection = (vh * scrollFactor) + maxScroll;
        hArray.push(scrollDistanceForThisSection);
        totalScrollHeight += scrollDistanceForThisSection;
      });

      containerRef.current.style.height = `${totalScrollHeight + vh}px`;
      sectionScrollHeights.current = hArray;
      maxTranslateY.current = mArray;

      handleScroll(); 
    };

    const handleScroll = () => {
      if (!containerRef.current || sectionScrollHeights.current.length === 0) return;

      const { top } = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -top); 

      let accumulatedScroll = 0;
      let currentIdx = 0;
      let localScrolled = 0;

      for (let i = 0; i < sectionScrollHeights.current.length; i++) {
        const sectionH = sectionScrollHeights.current[i];
        if (scrolled >= accumulatedScroll && scrolled < accumulatedScroll + sectionH) {
          currentIdx = i;
          localScrolled = scrolled - accumulatedScroll;
          break;
        }
        accumulatedScroll += sectionH;
        if (i === sectionScrollHeights.current.length - 1 && scrolled >= accumulatedScroll) {
          currentIdx = i;
          localScrolled = scrolled - (accumulatedScroll - sectionH);
        }
      }

      setActiveSection(currentIdx);

      const maxScrollForCurrent = maxTranslateY.current[currentIdx];
      const startScrollBuffer = window.innerHeight * 0.3; 
      let translateY = 0;

      if (localScrolled > startScrollBuffer) {
        translateY = localScrolled - startScrollBuffer;
        if (translateY > maxScrollForCurrent) translateY = maxScrollForCurrent; 
      }

      contentRefs.current.forEach((ref, i) => {
        if (!ref) return;
        if (i === currentIdx) {
          ref.style.transform = `translateY(-${translateY}px)`;
        } else if (i < currentIdx) {
          ref.style.transform = `translateY(-${maxTranslateY.current[i]}px)`; 
        } else {
          ref.style.transform = `translateY(0px)`;
        }
      });
    };

    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(() => calculateHeights()));
    if (boxRef.current) resizeObserver.observe(boxRef.current);
    contentRefs.current.forEach((ref) => { if (ref) resizeObserver.observe(ref); });

    window.addEventListener("scroll", handleScroll, { passive: true });
    const initialTimer = setTimeout(calculateHeights, 200);

    return () => {
      clearTimeout(initialTimer);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  if (sections.length === 1) {
    const section = sections[0];
    const contentItems = normalizeContent(section.content);
    const autoNumber = "01";

    return (
      <section className="relative w-full border-t border-white/10 bg-[#050505] py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-6 md:flex-row lg:gap-20 md:px-12 group">
          {/* รูปภาพ */}
          <div className="relative aspect-video w-full md:w-2/5 overflow-hidden rounded-md border border-white/10 bg-[#0a0f16] shadow-2xl">
            <Image
              src={section.image}
              alt={section.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-all duration-[1500ms] ease-out grayscale group-hover:grayscale-0 scale-100"
            />
          </div>

          {/* หัวข้อ + เนื้อหา */}
          <div className="relative flex w-full flex-col justify-center md:w-3/5">
            <div className="relative mb-8 w-full shrink-0">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[#F48120] font-bold tracking-[0.2em] text-sm">{autoNumber}</span>
                <div className="w-12 h-[1px] bg-white/20"></div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 pb-2">
                {section.title}
              </h2>
            </div>
            
            <div className="relative border-l border-white/10 pl-6 md:pl-10">
              {contentItems.length > 0 ? (
                <ul className="space-y-6 md:space-y-8">
                  {contentItems.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="text-lg font-light leading-[1.8] text-white/70 md:text-xl lg:text-2xl break-words whitespace-pre-line"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg font-light text-white/40">
                  No details available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative w-full border-t border-white/10 bg-[#050505]">
      
      <div className="sticky left-0 top-0 z-10 mx-auto flex h-screen w-full max-w-7xl flex-col items-center justify-center gap-12 overflow-hidden px-6 md:flex-row lg:gap-20 md:px-12 group">

        {/* ================= ฝั่งซ้าย: รูปภาพ ================= */}
        {/* 🌟 1. ใช้ aspect-video (16:9) และ md:w-2/5 (กินพื้นที่ 40%) */}
        <div className="pointer-events-none relative aspect-video w-full md:w-2/5 overflow-hidden rounded-md border border-white/10 bg-[#0a0f16] shadow-2xl">
          {sections.map((section: any, index: number) => (
            <div
              key={`img-wrap-${index}`}
              className={`absolute inset-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${index === activeSection ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-cover transition-all duration-[1500ms] ease-out grayscale group-hover:grayscale-0 ${index === activeSection ? "scale-100" : "scale-110"
                  }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-1000"></div>
            </div>
          ))}
        </div>

        {/* ================= ฝั่งขวา: หัวข้อ + กล่องเนื้อหา ================= */}
        {/* 🌟 2. ใช้ md:w-3/5 (กินพื้นที่ 60% ที่เหลือ) ให้ข้อความกางออกได้เต็มที่ */}
        <div className="relative flex h-[50vh] w-full flex-col justify-center md:h-[70vh] md:w-3/5">

          {/* หัวข้อ */}
          <div className="relative mb-10 h-24 w-full shrink-0 md:h-32">
            {sections.map((section: any, index: number) => {
               const autoNumber = String(index + 1).padStart(2, '0');
               return (
                <div
                  key={`title-${index}`}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${index === activeSection
                      ? "translate-y-0 opacity-100 pointer-events-auto"
                      : "translate-y-8 opacity-0 pointer-events-none"
                    }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[#F48120] font-bold tracking-[0.2em] text-sm">{autoNumber}</span>
                    <div className="w-12 h-[1px] bg-white/20"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 pb-2">
                    {section.title}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* กล่องเนื้อหา */}
          <div
            ref={boxRef}
            className="relative flex-1 overflow-hidden border-l border-white/10"
            style={{
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
            }}
          >
            {sections.map((section: any, index: number) => {
              const contentItems = normalizeContent(section.content);

              return (
                <div
                  key={`box-wrapper-${index}`}
                  className={`absolute inset-0 w-full transition-opacity duration-[800ms] ease-in-out ${index === activeSection
                      ? "z-10 opacity-100"
                      : "pointer-events-none z-0 opacity-0"
                    }`}
                >
                  <div
                    ref={(el) => { if (el) contentRefs.current[index] = el; }}
                    className="absolute left-0 top-0 w-full pl-6 md:pl-10 will-change-transform pb-24"
                  >
                    {contentItems.length > 0 ? (
                      <ul className="space-y-6 md:space-y-8">
                        {contentItems.map((item: string, i: number) => (
                          <li
                            key={i}
                            className="text-lg font-light leading-[1.8] text-white/70 md:text-xl lg:text-2xl break-words whitespace-pre-line"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg font-light text-white/40">
                        No details available.
                      </p>
                    )}
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