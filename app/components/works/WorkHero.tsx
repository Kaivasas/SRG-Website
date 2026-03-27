import React from "react";
import Link from "next/link";

export default function WorkHero({ work }: { work: any }) {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-12 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row w-full gap-12 md:gap-24 items-center">
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <Link href="/works" className="text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-[#F48120] transition-colors mb-8 inline-flex items-center gap-2">
            &larr; Back to Works
          </Link>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-[#004965]">
            {work.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed border-l-4 border-[#004965] pl-6">
            {work.shortDesc || work.description}
          </p>
        </div>
        <div className="w-full md:w-7/12 aspect-[4/3] md:aspect-video bg-gray-900 rounded-lg overflow-hidden relative shadow-2xl">
          {work.heroMedia ? (
            <img src={work.heroMedia} alt={work.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">Video / Image Placeholder</div>
          )}
        </div>
      </div>
    </section>
  );
}