"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export default function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // พอเห็นแล้วก็ให้หยุดคำนวณเลย (ประหยัดแรม)
        }
      },
      {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px", // ทริกเกอร์ตอนเลื่อนพ้นขอบล่างมานิดนึง
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // พระเอกของเราคือบรรทัดนี้: แปลง CSS ของเพื่อนมาเป็น Tailwind Class ให้ใช้ง่ายๆ
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}