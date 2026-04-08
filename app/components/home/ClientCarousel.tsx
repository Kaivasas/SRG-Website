"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { SanityClientLogo } from "@/app/types/sanity";

const ITEMS_PER_PAGE = 16;
const AUTO_SLIDE_MS = 4000;

interface ClientCarouselProps {
  clients: SanityClientLogo[];
}

export default function ClientCarousel({ clients }: ClientCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(clients.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [totalPages]);

  if (!clients || clients.length === 0) return null;

  const currentClients = clients.slice(
    currentIndex * ITEMS_PER_PAGE,
    (currentIndex + 1) * ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="w-full max-w-5xl bg-white/10 p-10 border border-white/20 rounded-3xl mb-8 backdrop-blur-sm shadow-xl min-h-40 flex items-center justify-center">
        <div
          key={currentIndex}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center animate-pulse-short"
        >
          {currentClients.map((c) => (
            <div
              key={c._id}
              className="w-32 h-16 flex items-center justify-center text-white/40 font-bold text-sm relative group"
            >
              {c.logo ? (
                <Image
                  src={c.logo}
                  alt={c.name || "Client Logo"}
                  fill
                  sizes="128px"
                  className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm"
                />
              ) : (
                <span className="tracking-widest uppercase">{c.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex space-x-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-3 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "bg-blue-500 w-8 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  : "bg-white/30 w-3 hover:bg-white/60 cursor-pointer"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}