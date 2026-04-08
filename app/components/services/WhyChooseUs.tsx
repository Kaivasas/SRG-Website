import React from "react";
import Image from "next/image";
import type { SanityServiceDetail } from "@/app/types/sanity";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80";

interface WhyChooseUsProps {
  service: SanityServiceDetail;
}

export default function WhyChooseUs({ service }: WhyChooseUsProps) {
  if (!service.benefits || service.benefits.length === 0) return null;

  return (
    <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Sticky heading */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-40">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-blue-500" />
            <span className="text-blue-500 uppercase tracking-widest text-xs font-bold">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
            {service.whyTitle}
          </h2>
        </div>

        {/* Benefits list */}
        <div className="w-full lg:w-2/3 flex flex-col gap-16 md:gap-24">
          {service.benefits.map((benefit, index) => {
            const autoNumber = String(index + 1).padStart(2, "0");
            return (
              <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-12 group">
                <div className="w-full md:w-1/2 flex flex-col justify-start">
                  <span className="text-5xl md:text-6xl font-black text-white/10 mb-4 tracking-tighter">{autoNumber}.</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">{benefit.title}</h3>
                  <p className="text-white/50 font-light leading-relaxed">{benefit.desc}</p>
                </div>
                <div className="w-full md:w-1/2 aspect-[4/3] bg-[#0a0a0a] relative overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                  <Image
                    src={benefit.image || `${FALLBACK_IMAGE}&sig=${index}`}
                    alt={benefit.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] scale-110 group-hover:scale-100"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}