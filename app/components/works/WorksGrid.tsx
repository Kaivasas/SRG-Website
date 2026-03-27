import React from "react";
import Link from "next/link";

export default function WorksGrid({ works }: { works: any[] }) {
  if (!works || works.length === 0) {
    return <div className="text-center py-20 text-gray-500">No works found.</div>;
  }

  return (
    <section className="w-full relative z-10 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {works.map((work: any, index: number) => (
          <Link 
            key={work.slug} 
            href={`/works/${work.slug}`}
            className={`group block relative overflow-hidden aspect-square md:aspect-[4/3] border-b border-white/10 ${index % 2 === 0 ? 'md:border-r' : ''}`}
          >
            <div className="absolute inset-0 bg-black z-10 opacity-50 group-hover:opacity-20 transition-opacity duration-700 ease-in-out"></div>
            
            {work.thumbnail ? (
              <img 
                src={work.thumbnail} 
                alt={work.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] z-0" 
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-800 z-0"></div>
            )}
            
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-20">
              <div className="flex justify-between items-start overflow-hidden">
                <p className="text-xs md:text-sm text-white/70 font-medium tracking-[0.2em] uppercase">
                  {work.tags && work.tags.length > 0 
                    ? `${work.tags.slice(0, 3).join(" • ")}${work.tags.length > 3 ? " ..." : ""}`
                    : "No Tags"
                  }
                </p>
                <span className="text-3xl font-light transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] text-[#F48120]">
                  ↗
                </span>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#FAD337] transition-colors duration-500">
                  {work.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}