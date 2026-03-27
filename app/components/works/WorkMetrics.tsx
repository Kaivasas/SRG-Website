"use client";
import React, { useState, useEffect, useRef } from "react";

// Component ย่อยสำหรับทำแอนิเมชันตัวเลขวิ่ง
const AnimatedMetric = ({ value, label }: { value: string; label: string }) => {
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
          const duration = 2000;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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
    <div ref={ref} className="flex flex-col items-center justify-center pt-8 md:pt-0">
      <span className="text-6xl md:text-8xl font-black text-[#FAD337] mb-4 drop-shadow-lg tracking-tighter">
        {!numberMatch ? value : (
          <>{prefix}{isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}</>
        )}
      </span>
      <span className="text-lg md:text-xl font-medium tracking-[0.2em] text-white/80 uppercase">{label}</span>
    </div>
  );
};

// Component หลักที่ถูก Export ออกไปใช้
export default function WorkMetrics({ metrics }: { metrics: any[] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-32 px-6 bg-[#001f2b] border-y border-white/10 relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
        {metrics.map((metric: any, index: number) => (
          <AnimatedMetric key={index} value={metric.value} label={metric.label} />
        ))}
      </div>
    </section>
  );
}