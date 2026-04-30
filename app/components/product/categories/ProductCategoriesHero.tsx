import Reveal from "@/app/components/Reveal";

export default function ProductCategoriesHero() {
  return (
    <Reveal className="relative mx-auto flex min-h-[78vh] w-full max-w-[1400px] items-center px-6 pb-20 pt-32 sm:px-10 lg:px-20">
      <div className="max-w-[1050px]">
        <span className="inline-flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-3 text-[0.74rem] font-bold uppercase tracking-[0.34em] text-[#FAD337]">
          Product Categories
        </span>
        <div className="mt-6 inline-block">
          <h1 className="text-[clamp(4rem,10vw,8.2rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
            <span className="block">Choose</span>
            <span className="block">A Category</span>
          </h1>
        </div>
      </div>
    </Reveal>
  );
}
