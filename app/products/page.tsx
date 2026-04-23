import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductCategory } from "@/app/types/sanity";

const PRODUCT_CATEGORIES_QUERY = `*[_type == "productCategory"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  coverImage,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

const primaryButtonClass =
  "inline-flex min-w-[13rem] items-center justify-center rounded-full bg-[linear-gradient(90deg,#f48120,#fad337)] px-6 py-4 text-[0.86rem] font-bold uppercase tracking-[0.2em] text-[#003951] transition hover:-translate-y-0.5";

const secondaryButtonClass =
  "inline-flex min-w-[13rem] items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-4 text-[0.86rem] font-bold uppercase tracking-[0.2em] text-white/85 transition hover:-translate-y-0.5";

const panelClass =
  "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.58)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]";

const categoryCardClass =
  "group relative flex min-h-[31rem] overflow-hidden border border-white/12 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/30 hover:shadow-[0_18px_42px_rgba(0,0,0,0.2)] max-sm:min-h-[28rem]";

export default async function ProductsPage() {
  const categories =
    (await sanityFetchSafe<SanityProductCategory[]>(PRODUCT_CATEGORIES_QUERY)) ?? [];

  return (
    <main className="relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.1),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(0,90,114,0.14),transparent_24%),linear-gradient(180deg,#031018_0%,#022533_34%,#003045_68%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.14)),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_48%)] before:content-['']">
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

      <Reveal
        delayMs={80}
        className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 sm:px-10 lg:px-20"
      >
        <section id="products-grid" className="relative">
          <div className={panelClass}>
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="text-[0.75rem] font-bold uppercase tracking-[0.32em] text-[#F48120]">
                  Select A Type
                </span>
                <h2 className="mt-3 text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-[-0.06em] text-white">
                  Product Collections From Sanity
                </h2>
              </div>
              <p className="max-w-[34rem] border-l-2 border-[#F48120] pl-4 text-base leading-relaxed text-white/64">
                ทุกหมวดสามารถเพิ่มได้จาก Sanity Studio และแต่ละหมวดจะพาไปหน้า
                รายการสินค้าของตัวเองโดยตรง
              </p>
            </div>

            {categories.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {categories.map((category, index) => (
                  <Reveal
                    key={category._id}
                    className={categoryCardClass}
                    delayMs={index * 90}
                  >
                    <Link
                      href={`/products/category/${category.slug}`}
                      className="block h-full w-full"
                    >
                      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

                      {category.coverImage && (
                        <Image
                          src={urlFor(category.coverImage).url()}
                          alt={category.title}
                          fill
                          className="absolute inset-0 object-cover transition duration-700 group-hover:scale-[1.06]"
                        />
                      )}

                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.08),transparent_30%),linear-gradient(180deg,rgba(0,57,81,0.22),rgba(0,0,0,0.36))]" />

                      <div className="relative z-10 flex h-full w-full flex-col p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#FAD337]">
                              Product Type
                            </p>
                            <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white">
                              {category.title}
                            </h3>
                          </div>
                          <span className="text-xs uppercase tracking-[0.28em] text-white/48">
                            0{index + 1}
                          </span>
                        </div>

                        <p className="mt-4 max-w-[28rem] text-sm leading-relaxed text-white/70 sm:text-base">
                          {category.description || "Open this category to view all products."}
                        </p>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5">
                          <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/72">
                            {category.productCount ?? 0} Products
                          </span>
                          <span className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase tracking-[0.24em] text-[#F48120]">
                            View Category
                            <span aria-hidden="true">+</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-white/15 bg-white/5 px-6 py-12 text-white/70">
                ยังไม่มี Product Category ใน Sanity Studio กรุณาเพิ่มหมวดก่อน แล้วผูก
                Product แต่ละตัวกับหมวดนั้นผ่านฟิลด์ `Product Category`
              </div>
            )}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
