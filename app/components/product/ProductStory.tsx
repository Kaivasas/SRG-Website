import Image from "next/image";
import Reveal from "../Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductDetail } from "@/app/types/sanity";

const glassPanelClass = "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";

export default function ProductStory({ product }: { product: SanityProductDetail }) {
  return (
    <Reveal className="mt-10" delayMs={60}>
      <section className={`${glassPanelClass} px-6 py-6 lg:px-8 lg:py-8`}>
        {/* 🌟 เช็คเงื่อนไขก่อนว่ามี storyTitle, story หรือ quote ไหม ถ้าไม่มีเลยจะได้ไม่ต้องโชว์ให้เว็บแหว่ง */}
        {(product.storyTitle || (product.story && product.story.length > 0) || product.quote) && (
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start relative">
            
            {/* 🌟 อัปเกรด 1: ใส่ lg:sticky และ lg:top-32 ให้รูปภาพเลื่อนตามเนื้อหาฝั่งขวาเวลาข้อความยาวๆ */}
            <div className="border border-white/10 bg-white/5 p-4 lg:sticky lg:top-32">
              <div className="relative min-h-[260px] overflow-hidden sm:min-h-[320px]">
                {product.storyImage ? (
                  <Image src={urlFor(product.storyImage).url()} alt="Story image" fill className="object-cover" />
                ) : (
                  // เผื่อแอดมินลืมใส่รูป ให้แสดงกล่องสีเทาๆ ป้องกันเว็บพัง
                  <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-white/20 text-sm">
                    No image provided
                  </div>
                )}
              </div>
            </div>

            {/* ฝั่งเนื้อหา */}
            <div className="flex flex-col h-full min-h-full pb-4">
              {product.storyTitle && (
                <p className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold leading-tight tracking-[-0.05em] text-white break-words">
                  {product.storyTitle}
                </p>
              )}
              
              {/* 🌟 อัปเกรด 2: ใส่ break-words และ whitespace-pre-wrap ให้รองรับการตัดคำและเว้นบรรทัดแบบยืดหยุ่น */}
              <div className="mt-4 space-y-4 text-base leading-relaxed text-white/72 break-words">
                {product.story?.map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-wrap">{paragraph}</p>
                ))}
              </div>

              {product.quote && (
                <div className="mt-8 border-l-[3px] border-[#F48120] pl-5 break-words">
                  <p className="text-sm uppercase tracking-[0.28em] text-[#F48120]">Project Note</p>
                  <p className="mt-4 max-w-[34rem] text-xl leading-relaxed text-white/84 whitespace-pre-wrap">
                    &quot;{product.quote}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ส่วนวิดีโอ (โชว์เฉพาะถ้ามี URL วิดีโอส่งมา) */}
        {product.motionVideoUrl && (
          <div className="mt-8 border border-white/10 bg-white/5 p-4">
            <div className="relative overflow-hidden">
              <video
                src={product.motionVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[430px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.18)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full border border-white/24 bg-[#003951]/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[#FAD337]">
                Product motion preview
              </div>
            </div>
          </div>
        )}
      </section>
    </Reveal>
  );
}
