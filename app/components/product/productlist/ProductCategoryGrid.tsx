import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductCategoryPageData } from "@/app/types/sanity";

const productCardClass =
  "group relative flex min-h-[31rem] overflow-hidden border border-white/12 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/30 hover:shadow-[0_18px_42px_rgba(0,0,0,0.2)] max-sm:min-h-[28rem]";

const panelClass =
  "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.58)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]";

export default function ProductCategoryGrid({
  category,
}: {
  category: SanityProductCategoryPageData;
}) {
  return (
    <Reveal
      delayMs={80}
      className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 sm:px-10 lg:px-20"
    >
      <section className={panelClass}>
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-[0.75rem] font-bold uppercase tracking-[0.32em] text-[#F48120]">
              Product List
            </span>
            <h2 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-black uppercase tracking-[-0.06em] text-white">
              Products In This Category
            </h2>
          </div>
        </div>

        {category.products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {category.products.map((product, index) => (
              <Reveal
                key={product._id}
                className={productCardClass}
                delayMs={index * 90}
              >
                <Link href={`/products/${product.slug}`} className="block h-full w-full">
                  <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

                  {product.thumbnail && (
                    <Image
                      src={urlFor(product.thumbnail).url()}
                      alt={product.title || "Product cover"}
                      fill
                      className="absolute inset-0 object-cover transition duration-700 group-hover:scale-[1.06]"
                    />
                  )}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.08),transparent_30%),linear-gradient(180deg,rgba(0,57,81,0.22),rgba(0,0,0,0.28))]" />

                  <div className="relative z-10 flex h-full w-full flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#FAD337]">
                          {product.eyebrow || product.category || category.title}
                        </p>
                        <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white">
                          {product.title}
                        </h3>
                      </div>
                      <span className="text-xs uppercase tracking-[0.28em] text-white/48">
                        0{index + 1}
                      </span>
                    </div>

                    {product.subtitle && (
                      <p className="mt-4 max-w-[28rem] text-sm leading-relaxed text-white/82 sm:text-base">
                        {product.subtitle}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-end gap-4 border-t border-white/12 pt-5">
                      <span className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase tracking-[0.24em] text-[#F48120]">
                        View Product
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
            No product categories are available yet.
          </div>
        )}
      </section>
    </Reveal>
  );
}
