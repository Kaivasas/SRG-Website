"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Scrollytelling({ sections }: { sections: any[] }) {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideHeightsRef = useRef<number[]>([]);
  const maxScrollsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const calculateHeights = () => {
      if (!boxRef.current || !containerRef.current) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const boxH = boxRef.current.clientHeight;
      let total = 0;
      const hArray: number[] = [];
      const mArray: number[] = [];
      const enterBuffer = vh * 0.2;

      sections.forEach((_: any, i: number) => {
        const ref = contentRefs.current[i];
        const sHeight = ref ? ref.scrollHeight : boxH;
        const maxS = Math.max(0, sHeight - boxH);
        mArray.push(maxS);
        const isLast = i === sections.length - 1;
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
        contentRefs.current.forEach(ref => { if (ref) ref.style.transform = `translateY(0px)`; });
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

    const resizeObserver = new ResizeObserver(() => { requestAnimationFrame(() => calculateHeights()); });
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

  return (
    <section ref={containerRef} className="relative w-full">
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col md:flex-row gap-12 items-center justify-center px-6 md:px-12 max-w-[1920px] mx-auto z-10 overflow-hidden">
        <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl bg-[#0a0f16] border border-white/10 pointer-events-none">
          {sections.map((section: any, index: number) => (
            <Image 
              key={`img-${index}`} 
              src={section.image} 
              alt={section.title || `Scrollytelling image ${index + 1}`} 
              // ใส่ fill เพื่อให้รูปขยายเต็ม relative container ด้านบน
              fill={true}
              // ใส่ sizes: มือถือเต็มจอ (100vw), คอมครึ่งจอ (50vw)
              sizes="(max-width: 768px) 100vw, 50vw"
              // คลาสเดิมเป๊ะๆ แค่เอา w-full h-full ออกเพราะ fill จัดการให้แล้ว
              className={`absolute inset-0 object-cover transition-opacity duration-[600ms] ease-in-out ${index === activeSection ? 'opacity-100' : 'opacity-0'}`} />
            ))}
        </div>
        <div className="w-full md:w-1/2 relative h-[60vh] md:h-[70vh] flex flex-col justify-center">
          <div className="relative h-20 md:h-28 w-full mb-6 pointer-events-none">
            {sections.map((section: any, index: number) => (
              <h2 key={`title-${index}`} className={`absolute inset-0 text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter text-[#004965] drop-shadow-md transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${index === activeSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                {section.title}
              </h2>
            ))}
          </div>
          <div ref={boxRef} className="relative w-full flex-1 bg-gradient-to-br from-[#001f2b] to-[#050505] border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,73,101,0.3)]">
            {sections.map((section: any, index: number) => (
              <div key={`box-wrapper-${index}`} className={`absolute inset-0 transition-opacity duration-[600ms] ease-in-out ${index === activeSection ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div ref={el => { if (el) contentRefs.current[index] = el; }} className="absolute top-0 left-0 w-full p-8 md:p-12 will-change-transform">

                  {/* 🌟 เปลี่ยนจาก <ul> เป็น <div> ธรรมดา โดยยังคงเส้นส้มด้านซ้ายไว้ */}
                  <div className="border-l-2 border-[#F48120] pl-6 md:pl-8">

                    {/* 🌟 พระเอกของเรา: แสดงผลข้อความยาวๆ 
                        - เราไม่ต้องใช้ logic complex ในการ split '\n' อีกแล้ว 
                        - ดึง section.content มาโชว์ตรงๆ ได้เลย
                        - ใส่คลาส whitespace-pre-line เพื่อจัดการเรื่องขึ้นบรรทัดใหม่และการ Wrap ข้อความ
                    */}
                    {section.content && (
                      <p className="whitespace-pre-line max-w-full break-words text-xl md:text-2xl lg:text-1xl text-gray-200 font-light leading-relaxed drop-shadow-md">
                        {section.content}
                      </p>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}