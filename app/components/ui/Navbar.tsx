"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { SanityServiceBase} from "@/app/types/sanity";

const NAV_COLUMNS = [
  ["Business strategies", "Digital marketing"],
  ["E-commerce", "Media production"],
  ["Live streaming", "Event organization"],
  ["Design", "Influencer management"],
] as const;

interface NavbarProps {
  services?: SanityServiceBase[];
}

export default function Navbar({ services = [] }: NavbarProps) {
  const lastScrollY = useRef(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  if (pathname.startsWith("/studio")) return null;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-transform duration-300 ease-in-out ${
        isNavVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      } ${
        isMobileMenuOpen ? "bg-[#050505]" : "bg-black/20 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="w-full max-w-[1440px] px-6 md:px-8 py-4 flex justify-between items-center relative mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <Image src="/assets/logo_0.png" alt="Sustain Republix Logo" width={120} height={40} className="h-8 md:h-10 w-auto" priority />
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 items-center text-sm font-semibold uppercase text-white tracking-wide">
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
                                    categoryServices.map((svc, i) => (
                                      <li key={`svc-${i}`} className="hover:text-gray-900 hover:translate-x-1 transition-all">
                                        <Link href={`/services/${svc.slug}`} className="block w-full">
                                          • {svc.title}
                                        </Link>
                                      </li>
                                    ))
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
            091-773-5563
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`absolute top-full left-0 w-full h-[100vh] bg-[#050505] z-40 flex flex-col px-6 pt-8 pb-32 overflow-y-auto transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
          <ul className="flex flex-col space-y-8 text-2xl font-bold uppercase text-white tracking-wide">
            <li><Link href="/" className="hover:text-[#F48120] transition-colors">Home</Link></li>
            <li>
              <button 
                className="flex w-full items-center justify-between hover:text-[#F48120] transition-colors"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              >
                <span>Services</span>
                <svg className={`w-6 h-6 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180 text-[#F48120]' : 'text-white/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileServicesOpen ? 'max-h-[1500px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="flex flex-col gap-6 pl-4 text-base normal-case tracking-normal border-l-2 border-white/10 pb-2">
                  {NAV_COLUMNS.map((column, colIndex) => (
                    <div key={`mob-col-${colIndex}`} className="flex flex-col gap-6">
                      {column.map((categoryName) => {
                        const categoryServices = services.filter((s) => s.category === categoryName);
                        if (categoryServices.length === 0) return null;
                        return (
                          <div key={`mob-${categoryName}`}>
                            <div className="text-[#004965] font-black text-sm mb-3 block uppercase tracking-wider">
                              {categoryName}
                            </div>
                            <ul className="text-gray-400 text-sm font-medium space-y-3">
                              {categoryServices.map((svc, i) => (
                                <li key={`mob-svc-${i}`}>
                                  <Link href={`/services/${svc.slug}`} className="block w-full hover:text-white transition-colors">
                                    {svc.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li><Link href="/works" className="hover:text-[#F48120] transition-colors">Works</Link></li>
            <li><Link href="/products" className="hover:text-[#F48120] transition-colors">Product</Link></li>
            <li><Link href="/contact" className="hover:text-[#F48120] transition-colors">Contact</Link></li>
          </ul>
          <div className="mt-12 pb-12">
            <a href="tel:0917735563" className="block text-center text-sm font-bold bg-white text-gray-900 px-6 py-4 rounded-full hover:bg-[#F48120] hover:text-white transition shadow-lg uppercase tracking-widest">
              Call: 091-773-5563
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}