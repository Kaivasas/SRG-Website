import Image from "next/image";
import Reveal from "../Reveal";
import { urlFor } from "@/sanity/lib/image";

const glassPanelClass = "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";

export default function ProductStory({ product }: { product: any }) {
  return (
    <Reveal className="mt-10" delayMs={60}>
      <section className={`${glassPanelClass} px-6 py-6 lg:px-8 lg:py-8`}>
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">

          <div className="border border-white/10 bg-white/5 p-4">
            <div className="relative min-h-[260px] overflow-hidden sm:min-h-[320px]">
              {/* 🌟 ใช้ storyImage */}
              {product.storyImage && (
                <Image src={urlFor(product.storyImage).url()} alt="Story image" fill className="object-cover" />
              )}
            </div>
          </div>

          <div>
            <p className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold leading-tight tracking-[-0.05em] text-white">
              {product.storyTitle}
            </p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-white/72">
              {product.story?.map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {product.quote && (
              <div className="mt-8 border-l-[3px] border-[#F48120] pl-5">
                <p className="text-sm uppercase tracking-[0.28em] text-[#F48120]">Project Note</p>
                <p className="mt-4 max-w-[34rem] text-xl leading-relaxed text-white/84">"{product.quote}"</p>
              </div>
            )}
          </div>
        </div>

        {/* 🌟 ส่วนวิดีโอ */}
        {product.motionVideoUrl && (
          <div className="mt-8 border border-white/10 bg-white/5 p-4">
            <div className="relative overflow-hidden">
              {/* 🌟 ย้าย src มาไว้ที่ <video> โดยตรง และเอา <source> ออก */}
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