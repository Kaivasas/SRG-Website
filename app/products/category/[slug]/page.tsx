import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/app/components/Reveal";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductCard, SanityProductCategory } from "@/app/types/sanity";

type CategoryPageData = SanityProductCategory & {
  products: SanityProductCard[];
};

const CATEGORY_PAGE_QUERY = `*[_type == "productCategory" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  coverImage,
  "products": *[_type == "product" && references(^._id)] | order(_updatedAt desc) {
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    subtitle,
    longDescription,
    thumbnail,
    "category": coalesce(productCategory->title, category),
    "categorySlug": productCategory->slug.current
  }
}`;

const CATEGORY_SLUGS_QUERY = `*[_type == "productCategory" && defined(slug.current)]{
  "slug": slug.current
}`;

const productCardClass =
  "group relative flex min-h-[31rem] overflow-hidden border border-white/12 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/30 hover:shadow-[0_18px_42px_rgba(0,0,0,0.2)] max-sm:min-h-[28rem]";

const panelClass =
  "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.58)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]";

export async function generateStaticParams() {
  return (await sanityFetchSafe<{ slug: string }[]>(CATEGORY_SLUGS_QUERY)) ?? [];
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await sanityFetchSafe<CategoryPageData>(CATEGORY_PAGE_QUERY, { slug });

  if (!category) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.1),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(0,90,114,0.14),transparent_24%),linear-gradient(180deg,#031018_0%,#022533_34%,#003045_68%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.14)),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_48%)] before:content-['']">
      <Reveal className="relative mx-auto flex min-h-[65vh] w-full max-w-[1400px] items-end px-6 pb-16 pt-32 sm:px-10 lg:px-20">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase tracking-[0.26em] text-white/64 transition hover:text-[#FAD337]"
            >
              Back to categories
            </Link>
            <p className="mt-8 text-[0.76rem] font-bold uppercase tracking-[0.32em] text-[#F48120]">
              Product Category
            </p>
            <h1 className="mt-4 text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">
              {category.title}
            </h1>
            <p className="mt-6 max-w-[48rem] text-lg leading-relaxed text-white/72">
              {category.description || "Products linked to this category from Sanity Studio."}
            </p>
          </div>

          <div className="relative min-h-[260px] overflow-hidden border border-white/10 bg-white/5">
            {category.coverImage ? (
              <Image
                src={urlFor(category.coverImage).url()}
                alt={category.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.28))]" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,57,81,0.12),rgba(0,0,0,0.34))]" />
            <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/78">
              {category.products.length} products
            </div>
          </div>
        </div>
      </Reveal>

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
              ยังไม่มีหมวดสินค้าให้เลือก
            </div>
          )}
        </section>
      </Reveal>
    </main>
  );
}
