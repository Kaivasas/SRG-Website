"use client";
import React, { useState, useEffect, useRef } from "react";

const AnimatedMetric = ({ value, label, index, total }: { value: string; label: string; index: number; total: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numberMatch = value.match(/\d+(\.\d+)?/);
  const targetNumber = numberMatch ? parseFloat(numberMatch[0]) : 0;
  const prefix = numberMatch ? value.substring(0, value.indexOf(numberMatch[0])) : "";
  const suffix = numberMatch ? value.substring(value.indexOf(numberMatch[0]) + numberMatch[0].length) : value;
  const isFloat = numberMatch && numberMatch[0].includes('.');

  useEffect(() => {
    if (!numberMatch) {
      setCount(targetNumber);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const duration = 2500;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 5);
            setCount(targetNumber * easeProgress);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetNumber);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNumber, hasAnimated, numberMatch]);

  return (
    <div 
      ref={ref} 
      className={`flex flex-col items-start justify-center p-8 md:p-12 relative group w-full sm:w-1/2 md:w-1/3 min-w-[300px] ${
        index % 3 === 1 ? "md:translate-y-12 md:border-x md:border-white/5" : ""
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-1000"></div>

      <div className="relative z-10">
        <span className="block text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 uppercase">
          {!numberMatch ? value : (
            <>{prefix}{isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}</>
          )}
        </span>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-blue-500/50"></div>
          <span className="text-xs md:text-sm font-bold tracking-[0.4em] text-white/40 uppercase whitespace-nowrap group-hover:text-blue-400 transition-colors duration-500">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function WorkMetrics({ metrics }: { metrics: any[] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-32 md:py-48 px-6 bg-[#050505] relative z-20 overflow-hidden border-t border-white/10">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, 
           backgroundSize: '100px 100px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold tracking-[0.5em] text-blue-500 uppercase mb-4">Measurable Success</span>
          <h3 className="text-2xl md:text-3xl font-light text-white/80 tracking-tight">
            Impact <span className="italic font-serif">by the numbers.</span>
          </h3>
        </div>

        {/* 🌟 1. เปลี่ยนจาก Grid เป็น Flexbox พร้อม justify-center */}
        {/* ท่านี้จะทำให้ถ้าเหลือเศษ 1 ข้อมูลในแถวสุดท้าย มันจะมาอยู่ตรงกลางทันที */}
        <div className="flex flex-wrap justify-center gap-y-12 md:gap-y-0 border-y border-white/5">
          {metrics.map((metric: any, index: number) => (
            <AnimatedMetric 
              key={index} 
              index={index}
              total={metrics.length}
              value={metric.value} 
              label={metric.label} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}