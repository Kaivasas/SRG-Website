import Image from "next/image";
import Reveal from "../Reveal"; // ปรับ path ให้ตรงกับโปรเจกต์คุณ
import { urlFor } from "@/sanity/lib/image";

const glassPanelClass = "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";
const metaChipClass = "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/72";
const metaAccentClass = "inline-flex items-center justify-center rounded-full bg-[#FAD337]/12 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#FAD337]";
const floatingTileClass = "border border-white/20 bg-white/10";

export default function ProductHero({ product }: { product: any }) {
  return (
    <Reveal className="mt-10">
      <section className={`${glassPanelClass} grid gap-8 px-6 py-8 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-10 lg:py-10`}>
        <div className="pr-0 lg:pr-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[#F48120]">{product.category}</p>
          <h1 className="mt-4 max-w-[10ch] text-[clamp(3.2rem,7vw,5.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">
            {product.title}
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-white/72">{product.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {product.client && <span className={metaChipClass}>{product.client}</span>}
            {product.status && <span className={metaChipClass}>{product.status}</span>}
            {product.year && <span className={metaAccentClass}>{product.year}</span>}
          </div>
        </div>

        <div className="border border-white/10 bg-white/5 p-5 sm:p-8">
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden sm:min-h-[360px] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.26))] after:content-['']">
            {product.cover && (
              <Image src={urlFor(product.cover).url()} alt={product.title} fill className="object-cover absolute inset-0 z-0" />
            )}
            <div className="absolute left-6 top-6 z-10 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.26em] text-white/78">
              {product.eyebrow}
            </div>
            <div className="absolute right-6 top-6 z-10 text-[0.72rem] uppercase tracking-[0.3em] text-white/68">
              {product.year}
            </div>
            
            <div className="relative z-10 grid w-full max-w-[23rem] grid-cols-2 gap-4">
              <div className={`${floatingTileClass} h-28 rounded-[1.5rem]`} />
              <div className={`${floatingTileClass} mt-10 h-36 rounded-[1.5rem] bg-black/15`} />
              <div className={`${floatingTileClass} -mt-5 h-24 rounded-[1.5rem]`} />
              <div className={`${floatingTileClass} h-20 rounded-full`} />
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}