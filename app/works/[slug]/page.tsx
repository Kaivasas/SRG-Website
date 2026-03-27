"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { worksData } from "@/app/data/worksData";

// ==============================================================
// คอมโพเนนต์ใหม่: สำหรับทำแอนิเมชันตัวเลขวิ่ง (แยกสัญลักษณ์อัตโนมัติ)
// ==============================================================
const AnimatedMetric = ({ value, label }: { value: string; label: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ใช้ Regex แยก "ตัวเลข" และ "ตัวอักษร" ออกจากกัน (เช่น "200%" -> เลข 200, สัญลักษณ์ %)
  const numberMatch = value.match(/\d+(\.\d+)?/);
  const targetNumber = numberMatch ? parseFloat(numberMatch[0]) : 0;
  const prefix = numberMatch ? value.substring(0, value.indexOf(numberMatch[0])) : "";
  const suffix = numberMatch ? value.substring(value.indexOf(numberMatch[0]) + numberMatch[0].length) : value;
  const isFloat = numberMatch && numberMatch[0].includes('.');

  useEffect(() => {
    // ถ้าข้อความไม่มีตัวเลขเลย (เช่น "N/A") ให้ข้ามแอนิเมชันไปเลย
    if (!numberMatch) {
      setCount(targetNumber); 
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ถ้าเลื่อนมาเห็นกล่อง และยังไม่เคยเล่นแอนิเมชัน
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTime: number;
          const duration = 2000; // เวลาวิ่งทั้งหมด 2 วินาที (ปรับช้าเร็วตรงนี้ได้)

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // แอนิเมชันแบบ easeOutExpo (วิ่งพุ่งแรงตอนแรก แล้วค่อยๆ ชะลอตอนจบให้ดูพรีเมียม)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(targetNumber * easeProgress);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetNumber);
            }
          };
          
          // สั่งเริ่มวิ่ง!
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 } // ทริกเกอร์เมื่อเลื่อนมาเห็นกล่องนี้ 50% ของจอ
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNumber, hasAnimated, numberMatch]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center pt-8 md:pt-0">
      <span className="text-6xl md:text-8xl font-black text-[#FAD337] mb-4 drop-shadow-lg tracking-tighter">
        {!numberMatch ? value : (
          <>
            {prefix}
            {isFloat ? count.toFixed(1) : Math.floor(count)}
            {suffix}
          </>
        )}
      </span>
      <span className="text-lg md:text-xl font-medium tracking-[0.2em] text-white/80 uppercase">{label}</span>
    </div>
  );
};


// ==============================================================
// หน้าเพจหลัก
// ==============================================================
export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const work = worksData.find((w) => w.slug === slug);

  const [sliderPos, setSliderPos] = useState(50);
  const [activeSection, setActiveSection] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const slideHeightsRef = useRef<number[]>([]);
  const maxScrollsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!work?.stickySections) return;

    const calculateHeights = () => {
      if (!boxRef.current || !containerRef.current) return;
      
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const boxH = boxRef.current.clientHeight;
      let total = 0;
      const hArray: number[] = [];
      const mArray: number[] = [];

      const enterBuffer = vh * 0.2; 

      work.stickySections!.forEach((_, i) => {
        const ref = contentRefs.current[i];
        const sHeight = ref ? ref.scrollHeight : boxH;

        const maxS = Math.max(0, sHeight - boxH);
        mArray.push(maxS);

        const isLast = i === work.stickySections!.length - 1;
        const exitBuffer = isLast ? 0 : (vh * 0.1);
        
        const allocated = Math.max(vh * 0.5, enterBuffer + maxS + exitBuffer);

        hArray.push(allocated);
        total += allocated;
      });

      containerRef.current.style.height = `${total + vh}px`;
      
      slideHeightsRef.current = hArray;
      maxScrollsRef.current = mArray;
      
      handleScroll();
    };

    const handleScroll = () => {
      if (!containerRef.current || slideHeightsRef.current.length === 0) return;

      const { top } = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -top);

      if (scrolled === 0) {
        setActiveSection(0);
        contentRefs.current.forEach(ref => {
          if (ref) ref.style.transform = `translateY(0px)`;
        });
        return;
      }

      let cumSum = 0;
      let currentIndex = 0;
      let localScrolled = 0;

      for (let i = 0; i < slideHeightsRef.current.length; i++) {
        const h = slideHeightsRef.current[i];
        if (scrolled >= cumSum && scrolled < cumSum + h) {
          currentIndex = i;
          localScrolled = scrolled - cumSum; 
          break;
        }
        cumSum += h;
        if (i === slideHeightsRef.current.length - 1 && scrolled >= cumSum) {
          currentIndex = i;
          localScrolled = scrolled - (cumSum - h);
        }
      }

      setActiveSection(currentIndex);

      const vh = window.innerHeight || document.documentElement.clientHeight;
      const enterBuffer = vh * 0.2;

      contentRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const maxS = maxScrollsRef.current[i];

        if (i === currentIndex) {
          let y = 0;
          if (localScrolled < enterBuffer) {
            y = 0; 
          } else if (localScrolled < enterBuffer + maxS) {
            y = localScrolled - enterBuffer; 
          } else {
            y = maxS; 
          }
          ref.style.transform = `translateY(${-y}px)`;
        } else if (i < currentIndex) {
          ref.style.transform = `translateY(${-maxS}px)`;
        } else {
          ref.style.transform = `translateY(0px)`;
        }
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => calculateHeights());
    });

    if (boxRef.current) resizeObserver.observe(boxRef.current);
    contentRefs.current.forEach((ref) => {
      if (ref) resizeObserver.observe(ref);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    const initialTimer = setTimeout(calculateHeights, 200);

    return () => {
      clearTimeout(initialTimer);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [work]);

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white text-2xl">ไม่พบผลงานที่คุณค้นหา</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F48120] selection:text-white pb-0">
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-12 md:gap-24 items-center">
          <div className="w-full md:w-5/12 flex flex-col justify-center">
            <Link href="/works" className="text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-[#F48120] transition-colors mb-8 inline-flex items-center gap-2">
              &larr; Back to Works
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#004965]">
              {work.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed border-l-4 border-[#004965] pl-6">
              {work.shortDesc || work.description}
            </p>
          </div>
          <div className="w-full md:w-7/12 aspect-[4/3] md:aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl">
            {work.heroMedia ? (
               <img src={work.heroMedia} alt={work.title} className="w-full h-full object-cover" />
            ) : (
               <div className="flex items-center justify-center h-full text-gray-600">Video / Image Placeholder</div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Before / After Slider Section */}
      {work.beforeAfter && (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-widest text-[#FAD337]">Transformation</h2>
          </div>
          <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <img src={work.beforeAfter.after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
            <img 
              src={work.beforeAfter.before} alt="Before" 
              className="absolute inset-0 w-full h-full object-cover grayscale" 
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} draggable="false"
            />
            <input 
              type="range" min="0" max="100" value={sliderPos} 
              onChange={(e) => setSliderPos(Number(e.target.value))} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" 
            />
            <div className="absolute top-0 bottom-0 w-1 bg-[#F48120] pointer-events-none z-10 flex items-center justify-center" style={{ left: `${sliderPos}%` }}>
              <div className="w-8 h-8 bg-[#F48120] rounded-full flex items-center justify-center shadow-lg text-black font-bold text-xs">&lt;&gt;</div>
            </div>
            <span className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest font-bold uppercase border border-white/10 pointer-events-none">Before</span>
            <span className="absolute top-6 right-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-xs tracking-widest font-bold uppercase border border-white/10 pointer-events-none text-[#FAD337]">After</span>
          </div>
        </section>
      )}

      {/* 3. DYNAMIC SCROLLYTELLING */}
      {work.stickySections && (
        <section ref={containerRef} className="relative w-full">
          <div className="sticky top-0 left-0 w-full h-screen flex flex-col md:flex-row gap-12 items-center justify-center px-6 md:px-12 max-w-[1920px] mx-auto z-10 overflow-hidden">
            <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl bg-[#0a0f16] border border-white/10 pointer-events-none">
              {work.stickySections.map((section, index) => (
                <img 
                  key={`img-${section.id}`}
                  src={section.image} 
                  alt={section.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] ease-in-out ${index === activeSection ? 'opacity-100' : 'opacity-0'}`} 
                />
              ))}
            </div>

            <div className="w-full md:w-1/2 relative h-[60vh] md:h-[70vh] flex flex-col justify-center">
              <div className="relative h-20 md:h-28 w-full mb-6 pointer-events-none">
                {work.stickySections.map((section, index) => (
                  <h2 
                    key={`title-${section.id}`}
                    className={`absolute inset-0 text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter text-[#004965] drop-shadow-md transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${index === activeSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                  >
                    {section.title}
                  </h2>
                ))}
              </div>

              <div ref={boxRef} className="relative w-full flex-1 bg-gradient-to-br from-[#001f2b] to-[#050505] border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,73,101,0.3)]">
                 {work.stickySections.map((section, index) => (
                    <div 
                      key={`box-wrapper-${section.id}`}
                      className={`absolute inset-0 transition-opacity duration-[600ms] ease-in-out ${index === activeSection ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                    >
                      <div 
                        ref={el => { if (el) contentRefs.current[index] = el; }}
                        className="absolute top-0 left-0 w-full p-8 md:p-12 will-change-transform" 
                      >
                        <ul className="space-y-6 md:space-y-8 border-l-2 border-[#F48120] pl-6 md:pl-8">
                          {section.content.map((item, i) => (
                            <li key={i} className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed drop-shadow-md">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                 ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. Gallery Section (Dynamic Bento Grid) */}
      {work.gallery && work.gallery.length > 0 && (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {work.gallery.map((image, index) => {
              const total = work.gallery!.length;
              let isWide = index % 3 === 0;
              let isOrphan = index === total - 1 && index % 3 === 1;

              if (total === 2) {
                isWide = false;
                isOrphan = false;
              }

              return (
                <div 
                  key={`gallery-${index}`} 
                  className={`${isWide || isOrphan ? 'col-span-1 md:col-span-2 aspect-video' : 'col-span-1 aspect-square md:aspect-[4/3]'} bg-[#0a0f16] rounded-xl overflow-hidden border border-white/5 shadow-lg`}
                >
                  <img 
                    src={image} 
                    alt={`${work.title} Gallery ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. Metrics / Results Section (พร้อมลูกเล่นตัวเลขวิ่ง) */}
      {/* ------------------------------------------------------------- */}
      {work.metrics && (
        <section className="py-32 px-6 bg-[#001f2b] border-y border-white/10 relative z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {work.metrics.map((metric, index) => (
              // THE FIX: เปลี่ยนมาเรียกใช้คอมโพเนนต์ AnimatedMetric แทนการเขียน Span ตรงๆ
              <AnimatedMetric key={index} value={metric.value} label={metric.label} />
            ))}
          </div>
        </section>
      )}

      <div className="py-24 text-center relative z-20 bg-[#050505]">
        <Link href="/works" className="inline-block border border-white/20 px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
          View All Works
        </Link>
      </div>

    </div>
  );
}