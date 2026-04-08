"use client";

import React, { useEffect, useRef, useState } from "react";

const BG_VIDEO_URL =
  "https://res.cloudinary.com/ducv7yo8h/video/upload/f_auto,q_auto/v1774496170/7020050_Abstract_Background_3840x2160_lzpmkg.mp4";
const MAX_BLUR_PX = 40;

export default function BlurredBackground() {
  const [bgBlur, setBgBlur] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const fraction = totalHeight > 0 ? scrollY / totalHeight : 0;
        setBgBlur(fraction * MAX_BLUR_PX);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-40 scale-105"
        style={{ filter: `blur(${bgBlur}px)`, transition: "filter 0.1s ease-out" }}
      >
        <source src={BG_VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
    </div>
  );
}