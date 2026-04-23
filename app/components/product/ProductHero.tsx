import Image from "next/image";
import Reveal from "../Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductDetail } from "@/app/types/sanity";

const glassPanelClass = "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";
const floatingTileClass = "border border-white/20 bg-white/10";

export default function ProductHero({ product }: { product: SanityProductDetail }) {
  return (
    <Reveal className="mt-10">
      <section className={`${glassPanelClass} grid gap-8 px-6 py-8 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-10 lg:py-10`}>

        {/* ฝั่งซ้าย: ข้อมูล */}
        <div className="pr-0 lg:pr-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[#F48120]">{product.category}</p>
          <h1 className="mt-4 max-w-[10ch] text-[clamp(3.2rem,7vw,5.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white break-words">
            {product.title}
          </h1>

          {/* Subtitle (เน้นให้สว่างหน่อย) */}
          {product.subtitle && (
            <p className="mt-5 max-w-[34rem] text-xl font-medium leading-relaxed text-white/90">
              {product.subtitle}
            </p>
          )}

          {/* 🌟 1. เพิ่ม Long Description (สีจางลงมานิดนึง + รองรับการขึ้นบรรทัดใหม่) */}
          {product.longDescription && (
            <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-white/60 whitespace-pre-wrap break-words">
              {product.longDescription}
            </p>
          )}

        </div>

        {/* ฝั่งขวา: รูปภาพ Hero */}
        <div className="border border-white/10 bg-white/5 p-5 sm:p-8">
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden sm:min-h-[360px] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.26))] after:content-['']">

            {product.heroImage && (
              <Image src={urlFor(product.heroImage).url()} alt={product.title} fill className="object-cover absolute inset-0 z-0" />
            )}

            {product.category && (
              <div className="absolute left-6 top-6 z-10 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.26em] text-white/78">
                {product.category}
              </div>
            )}

            {/* กล่องสี่เหลี่ยมตกแต่ง (Floating Tiles) */}
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
