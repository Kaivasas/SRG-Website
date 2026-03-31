"use client";

import React, { useEffect, useRef, useState } from "react";

function normalizeContent(content: unknown): string[] {
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (item && typeof item === "object") {
          const maybeBlock = item as {
            text?: string;
            children?: Array<{ text?: string }>;
          };

          if (typeof maybeBlock.text === "string") {
            return maybeBlock.text.trim();
          }

          if (Array.isArray(maybeBlock.children)) {
            return maybeBlock.children
              .map((child) => child?.text?.trim() ?? "")
              .filter(Boolean)
              .join(" ")
              .trim();
          }
        }

        return "";
      })
      .filter(Boolean);
  }

  if (typeof content === "string" && content.trim()) {
    return [content.trim()];
  }

  return [];
}

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
        const exitBuffer = isLast ? 0 : vh * 0.1;
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
        contentRefs.current.forEach((ref) => {
          if (ref) ref.style.transform = "translateY(0px)";
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
          ref.style.transform = "translateY(0px)";
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
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  return (
    <section ref={containerRef} className="relative w-full">
      <div className="sticky left-0 top-0 z-10 mx-auto flex h-screen w-full max-w-[1920px] flex-col items-center justify-center gap-12 overflow-hidden px-6 md:flex-row md:px-12">
        <div className="pointer-events-none relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0f16] shadow-2xl md:aspect-[4/3] md:w-1/2">
          {sections.map((section: any, index: number) => (
            <img
              key={`img-${index}`}
              src={section.image}
              alt={section.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-in-out ${
                index === activeSection ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="relative flex h-[60vh] w-full flex-col justify-center md:h-[70vh] md:w-1/2">
          <div className="pointer-events-none relative mb-6 h-20 w-full md:h-28">
            {sections.map((section: any, index: number) => (
              <h2
                key={`title-${index}`}
                className={`absolute inset-0 text-5xl font-black uppercase tracking-tighter text-[#004965] drop-shadow-md transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:text-7xl lg:text-[5.5rem] ${
                  index === activeSection
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                {section.title}
              </h2>
            ))}
          </div>

          <div
            ref={boxRef}
            className="relative flex-1 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#001f2b] to-[#050505] shadow-[0_0_30px_rgba(0,73,101,0.3)]"
          >
            {sections.map((section: any, index: number) => {
              const contentItems = normalizeContent(section.content);

              return (
                <div
                  key={`box-wrapper-${index}`}
                  className={`absolute inset-0 transition-opacity duration-[600ms] ease-in-out ${
                    index === activeSection
                      ? "z-10 opacity-100"
                      : "pointer-events-none z-0 opacity-0"
                  }`}
                >
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[index] = el;
                    }}
                    className="absolute left-0 top-0 w-full p-8 will-change-transform md:p-12"
                  >
                    {contentItems.length > 0 ? (
                      <ul className="space-y-6 border-l-2 border-[#F48120] pl-6 md:space-y-8 md:pl-8">
                        {contentItems.map((item: string, i: number) => (
                          <li
                            key={i}
                            className="text-xl font-light leading-relaxed text-gray-200 drop-shadow-md md:text-2xl lg:text-3xl"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="border-l-2 border-white/15 pl-6 md:pl-8">
                        <p className="text-lg text-gray-400 md:text-xl">
                          No story details available for this section yet.
                        </p>
                      </div>
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
