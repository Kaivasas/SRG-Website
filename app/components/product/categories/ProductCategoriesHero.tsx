import Link from "next/link";
import Reveal from "@/app/components/Reveal";

const primaryButtonClass =
  "inline-flex min-w-[13rem] items-center justify-center rounded-full bg-[linear-gradient(90deg,#f48120,#fad337)] px-6 py-4 text-[0.86rem] font-bold uppercase tracking-[0.2em] text-[#003951] transition hover:-translate-y-0.5";

const secondaryButtonClass =
  "inline-flex min-w-[13rem] items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-4 text-[0.86rem] font-bold uppercase tracking-[0.2em] text-white/85 transition hover:-translate-y-0.5";

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
        <p className="mt-6 max-w-[860px] text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-white/72">
          เปิดดูประเภทสินค้าหรือประเภทร้านที่เพิ่มจาก Sanity ได้เลย
          แล้วค่อยเจาะเข้าไปดูสินค้าที่อยู่ในหมวดนั้นแบบแยกเป็นสัดส่วน
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className={primaryButtonClass}>
            Start a Project
          </Link>
          <a href="#products-grid" className={secondaryButtonClass}>
            Browse Categories
          </a>
        </div>
      </div>
    </Reveal>
  );
}
