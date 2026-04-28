import Reveal from "../../Reveal";
import type { SanityProductDetail } from "@/app/types/sanity";

const glassPanelClass = "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";

export default function ProductStory({ product }: { product: SanityProductDetail }) {
  if (!product.motionVideoUrl) return null;

  return (
    <Reveal className="mt-10" delayMs={60}>
      <section className={`${glassPanelClass} px-6 py-6 lg:px-8 lg:py-8`}>
        <div className="border border-white/10 bg-white/5 p-4">
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
      </section>
    </Reveal>
  );
}
