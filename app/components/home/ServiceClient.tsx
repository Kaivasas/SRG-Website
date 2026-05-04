"use client";

import React, { useRef } from "react";
import Reveal from "@/app/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import type { SanityServiceCard } from "@/app/types/sanity";

const UI_CONFIGS = [
  { bgClass: "from-[#002a3a]/90 to-black/90", overlayClass: "bg-blue-500/20" },
  { bgClass: "from-[#001f2b]/95 to-black/95", overlayClass: "bg-blue-500/20" },
  { bgClass: "from-black to-gray-900", overlayClass: "bg-gray-500/20" },
] as const;

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";

interface ServiceClientProps {
  servicesData?: SanityServiceCard[];
}

function ServiceCard({
  svc,
  index,
  totalCards,
  scrollYProgress,
}: {
  svc: any;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = useTransform(scrollYProgress, (v) => v * (totalCards - 1));

  const y = useTransform(segment, (s) => (s < index ? `${(index - s) * 100}vh` : "0vh"));
  const scale = useTransform(segment, (s) => (s < index ? 1 : Math.max(0, 1 - (s - index) * 0.05)));
  const opacity = useTransform(segment, (s) => (s < index ? 1 : Math.max(0, 1 - (s - index) * 1)));
  const brightness = useTransform(segment, (s) => (s < index ? 1 : Math.max(0, 1 - (s - index) * 0.2)));
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  const boxShadow = useTransform(
    segment,
    [index, index + 0.1],
    ["0 30px 60px -15px rgba(0,0,0,0.8)", "0 0px 0px 0px rgba(0,0,0,0)"]
  );
  
  const borderColor = useTransform(
    segment,
    [index, index + 0.1],
    ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.05)"]
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full will-change-transform"
      style={{
        y,
        scale,
        opacity,
        filter,
        zIndex: index,
      }}
    >
      <motion.div
        className={`w-full h-full bg-gradient-to-br ${svc.bgClass} backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center border`}
        style={{
          boxShadow,
          borderColor,
        }}
      >
        <div className="mb-8 md:mb-0 md:pr-12 w-full md:w-1/2">
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">{svc.id}</span>
          <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{svc.title}</h3>
          <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 line-clamp-3 md:line-clamp-none">{svc.desc}</p>

          {svc.slug ? (
            <Link href={`/services/${svc.slug}`} className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase inline-block">
              Discover More
            </Link>
          ) : (
            <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase cursor-not-allowed opacity-50">
              Coming Soon
            </button>
          )}
        </div>

        <div className="w-full md:w-1/2 h-48 md:h-full rounded-3xl overflow-hidden relative group shrink-0">
          <div className={`absolute inset-0 ${svc.overlayClass} group-hover:bg-transparent transition duration-500 z-10`} />
          <Image
            src={svc.image}
            alt={svc.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-110 transition duration-700"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServiceClient({ servicesData = [] }: ServiceClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const validServices = servicesData.filter(Boolean);
  if (validServices.length === 0) return null;

  const services = validServices.map((svc, index) => {
    const config = UI_CONFIGS[index] ?? UI_CONFIGS[2];
    return {
      id: `0${index + 1} / ${svc.category}`,
      title: svc.title,
      desc: svc.description,
      image: svc.image || FALLBACK_IMAGE,
      slug: svc.slug,
      ...config,
    };
  });

  const totalCards = services.length;

  return (
    <section id="services" ref={sectionRef} className="relative z-10" style={{ height: `${totalCards * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full relative z-20">
          <div className="text-center mb-10 md:mb-16 relative">
            <Reveal delayMs={0}>
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-2xl">our services</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-6" />
            </Reveal>
          </div>

          <div className="relative w-full h-[65vh] md:h-[60vh]">
            {services.map((svc, index) => (
              <ServiceCard
                key={index}
                svc={svc}
                index={index}
                totalCards={totalCards}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}