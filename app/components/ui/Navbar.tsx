"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { SanityServiceNavItem /* , SanitySlug */ } from "@/app/types/sanity";

const NAV_COLUMNS = [
  ["Digital Marketing", "Event Organization"],
  ["Live Streaming", "Commercial"],
  ["Business Strategies", "Creator"],
  ["Design", "Media"],
] as const;

interface NavbarProps {
  services?: SanityServiceNavItem[];
}

export default function Navbar({ services = [] }: NavbarProps) {
  const lastScrollY = useRef(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY <= 80 || currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/studio")) return null;

  return (
    <nav
      className={`fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 flex justify-center transition-transform duration-300 ease-in-out ${
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-[1440px] px-8 py-4 flex justify-between items-center relative">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image src="/assets/logo_0.png" alt="Sustain Republix Logo" width={120} height={40} className="h-10 w-auto" priority />
        </Link>

        <div className="flex items-center space-x-8">
          <ul className="hidden md:flex space-x-8 items-center text-sm font-semibold uppercase text-white tracking-wide">
            <li>
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            </li>

            <li className="group">
              <button className="flex items-center gap-1 hover:text-blue-400 transition py-4 font-semibold uppercase tracking-wide">
                Service
                <svg className="w-4 h-4 text-white/70 transition-transform duration-300 group-hover:rotate-180 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full left-0 w-full opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50 cursor-default">
                <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_40px_60px_rgba(0,0,0,0.1)] w-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#004965] to-[#F48120]" />
                  <div className="max-w-7xl mx-auto px-8 py-12">
                    <div className="grid grid-cols-4 gap-12 normal-case tracking-normal">
                      {NAV_COLUMNS.map((column, colIndex) => (
                        <div key={`col-${colIndex}`} className="flex flex-col gap-8">
                          {column.map((categoryName) => {
                            const categoryServices = services.filter((s) => s.category === categoryName);
                            return (
                              <div key={categoryName}>
                                <div className="text-[#004965] font-black text-sm mb-4 block uppercase tracking-wider cursor-default">
                                  {categoryName}
                                </div>
                                <ul className="text-gray-500 text-sm font-medium space-y-3">
                                  {categoryServices.length > 0 ? (
                                    categoryServices.map((svc, i) => {
                                      const slugStr = typeof svc.slug === "string" ? svc.slug : (svc.slug as { current: string })?.current;
                                      return (
                                        <li key={`svc-${i}`} className="hover:text-gray-900 hover:translate-x-1 transition-all">
                                          <Link href={`/services/${slugStr}`} className="block w-full">• {svc.title}</Link>
                                        </li>
                                      );
                                    })
                                  ) : (
                                    <li className="text-gray-300 text-xs italic">• Coming Soon</li>
                                  )}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li><Link href="/works" className="hover:text-blue-400 transition">Works</Link></li>
            <li><Link href="/products" className="hover:text-blue-400 transition">Product</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
          <div className="text-sm font-bold bg-white text-gray-900 px-6 py-2.5 rounded-full hover:bg-blue-500 hover:text-white transition cursor-pointer shadow-lg">
            099-123-4567
          </div>
        </div>
      </div>
    </nav>
  );
}