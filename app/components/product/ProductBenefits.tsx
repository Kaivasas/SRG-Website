import Image from "next/image";
import Reveal from "../Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductBenefit } from "@/app/types/sanity";

export default function ProductBenefits({ benefits }: { benefits: SanityProductBenefit[] }) {
  if (!benefits?.length) return null;

  // 🌟 เทคนิคการคำนวณคลาส Grid แบบ Dynamic
  const gridLayoutClass = 
    benefits.length === 1
      ? "grid-cols-1 max-w-md mx-auto" // ถ้ามี 1 อัน: โชว์ 1 คอลัมน์ ล็อกความกว้าง และจัดให้อยู่ตรงกลาง (mx-auto)
      : benefits.length === 2
      ? "md:grid-cols-2 max-w-4xl mx-auto" // ถ้ามี 2 อัน: แบ่ง 50/50 และจัดให้อยู่ตรงกลาง
      : "md:grid-cols-3"; // ถ้ามี 3 อันขึ้นไป: แบ่ง 3 คอลัมน์ตามปกติ (ส่วน 4, 5, 6 มันจะตัดขึ้นบรรทัดใหม่ให้เองสวยๆ)

  return (
    <Reveal className="mt-12" delayMs={80}>
      <section>
        <h2 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-black uppercase leading-[0.92] tracking-[-0.07em] text-white">
          Why teams choose this product
        </h2>
        
        {/* 🌟 เอาตัวแปร gridLayoutClass มาต่อท้ายคลาสเดิม */}
        <div className={`mt-6 grid gap-5 ${gridLayoutClass}`}>
          {benefits.map((benefit, index) => (
            <article key={index} className="overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),rgba(2,17,24,0.7)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/25 hover:shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
              
              <div className="relative flex h-36 items-center justify-center overflow-hidden after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.26))] after:content-['']">
                {benefit.image && (
                  <Image src={urlFor(benefit.image).url()} alt={benefit.title || "Benefit background"} fill className="object-cover absolute inset-0 z-0" />
                )}
                <span className="relative z-10 text-[3.6rem] font-extralight leading-none tracking-[-0.08em] text-[#FAD337]">
                  0{index + 1}
                </span>
              </div>

              {/* 🌟 ใส่ break-words กันเหนียว เผื่อแอดมินตั้งชื่อ Benefit ยาวติดกัน */}
              <h3 className="mt-5 text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.04em] text-white break-words">
                {benefit.title}
              </h3>
              
              {/* 🌟 ใส่ whitespace-pre-wrap และ break-words เพื่อให้เคาะบรรทัดได้ */}
              <p className="mt-2 text-base leading-relaxed text-white/68 break-words whitespace-pre-wrap">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}