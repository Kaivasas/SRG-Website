import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { SanityServiceDetail } from "@/app/types/sanity";

interface ServicePortfolioProps {
  service: SanityServiceDetail;
}

export default function ServicePortfolio({ service }: ServicePortfolioProps) {
  if (!service.portfolios || service.portfolios.length === 0) return null;

  return (
    <section id="portfolios" className="py-24 relative z-10 bg-transparent overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-6 md:px-[10vw] w-full max-w-[1920px] mx-auto relative z-10">
        {service.portfolios.map((port, index) => (
          <Link
            href={`/works/${port.slug}`}
            key={`${port._id}-${index}`}
            className="w-full group cursor-pointer rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10 transition hover:bg-white/10 hover:border-blue-500/50 flex flex-col shadow-inner"
          >
            <div className="aspect-video bg-black/50 mb-6 overflow-hidden relative rounded-xl shrink-0">
              <Image
                src={port.image}
                alt={port.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">View Details</span>
              </div>
            </div>
            <div className="grow flex flex-col justify-between">
              <h4 className="text-xl lg:text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">{port.title}</h4>
              <div className="flex justify-between items-center mt-2">
                <p className="text-white/60 font-light uppercase text-xs tracking-widest line-clamp-1">{service.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}