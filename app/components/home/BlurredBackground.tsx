"use client"; // ไฟล์นี้มีแอนิเมชัน ต้องใช้ use client!

import React, { useEffect, useState } from "react";

export default function BlurredBackground() {
  const [bgBlur, setBgBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = totalScrollHeight > 0 ? currentScrollY / totalScrollHeight : 0;
      const maxBlurPx = 40;
      setBgBlur(scrollFraction * maxBlurPx);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-40 scale-105"
        style={{ filter: `blur(${bgBlur}px)`, transition: 'filter 0.1s ease-out' }}
      >
        <source src="https://res.cloudinary.com/ducv7yo8h/video/upload/v1774496170/7020050_Abstract_Background_3840x2160_lzpmkg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
    </div>
  );
}