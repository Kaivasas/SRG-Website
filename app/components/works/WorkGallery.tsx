import React from "react";

export default function WorkGallery({ gallery, title }: { gallery: string[]; title: string }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20 bg-[#050505]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((image: string, index: number) => {
          const total = gallery.length;
          let isWide = index % 3 === 0;
          let isOrphan = index === total - 1 && index % 3 === 1;

          if (total === 2) {
            isWide = false;
            isOrphan = false;
          }

          return (
            <div
              key={`gallery-${index}`}
              className={`${isWide || isOrphan ? 'col-span-1 md:col-span-2 aspect-video' : 'col-span-1 aspect-square md:aspect-[4/3]'} bg-[#0a0f16] rounded-xl overflow-hidden border border-white/5 shadow-lg`}
            >
              <img src={image} alt={`${title} Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms] ease-out" />
            </div>
          );
        })}
      </div>
    </section>
  );
}