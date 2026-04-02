import Link from "next/link";
import Image from "next/image"; // 🌟 นำเข้า Image 
import { notFound } from "next/navigation";
import Reveal from "../Reveal";

// 🌟 นำเข้า Sanity Client และ urlFor
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const pageShellClass =
  "relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(0,90,114,0.1),transparent_26%),radial-gradient(circle_at_85%_12%,rgba(244,129,32,0.1),transparent_24%),linear-gradient(180deg,#020d14_0%,#022331_32%,#003045_70%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.22),transparent_18%,transparent_82%,rgba(0,0,0,0.16)),radial-gradient(circle_at_center,rgba(255,255,255,0.018),transparent_48%)] before:content-['']";

const glassPanelClass =
  "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";

const metaChipClass =
  "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/72";

const metaAccentClass =
  "inline-flex items-center justify-center rounded-full bg-[#FAD337]/12 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#FAD337]";

const floatingTileClass = "border border-white/20 bg-white/10";

// 🌟 1. ดึง slug ทั้งหมดจาก Sanity เพื่อไปสร้าง Static Pages
export async function generateStaticParams() {
  const query = `*[_type == "product"] { "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 🌟 2. ดึงข้อมูล Product ปัจจุบัน และดึง Related Products (3 ตัวที่ไม่ใช่ตัวนี้)
  const productQuery = `*[_type == "product" && slug.current == $slug][0]`;
  const relatedQuery = `*[_type == "product" && slug.current != $slug][0...3] {
    title,
    "slug": slug.current,
    category,
    cover
  }`;

  // ใช้ Promise.all เพื่อดึงข้อมูลทั้งสองอย่างพร้อมกัน (ประหยัดเวลาโหลด)
  const [product, relatedProducts] = await Promise.all([
    client.fetch(productQuery, { slug }),
    client.fetch(relatedQuery, { slug })
  ]);

  // ถ้าหา Product ไม่เจอ ให้โยนไปหน้า 404
  if (!product) {
    notFound();
  }

  return (
    <main className={`${pageShellClass} px-6 pb-20 pt-28 text-white sm:px-10 lg:px-20`}>
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Link
          href="/products"
          className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase tracking-[0.26em] text-white/64 transition hover:text-[#FAD337]"
        >
          Back to products
        </Link>

        <Reveal className="mt-10">
          <section className={`${glassPanelClass} grid gap-8 px-6 py-8 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-10 lg:py-10`}>
            <div className="pr-0 lg:pr-8">
              <p className="text-sm uppercase tracking-[0.32em] text-[#F48120]">
                {product.category}
              </p>
              <h1 className="mt-4 max-w-[10ch] text-[clamp(3.2rem,7vw,5.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">
                {product.title}
              </h1>
              <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-white/72">
                {product.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {product.client && <span className={metaChipClass}>{product.client}</span>}
                {product.status && <span className={metaChipClass}>{product.status}</span>}
                {product.year && <span className={metaAccentClass}>{product.year}</span>}
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 p-5 sm:p-8">
              {/* 🌟 3. เปลี่ยนการแสดงผลรูป Cover จาก CSS เป็น <Image /> */}
              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden sm:min-h-[360px] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.26))] after:content-['']">
                
                {product.cover && (
                  <Image
                    src={urlFor(product.cover).url()}
                    alt={product.title}
                    fill
                    className="object-cover absolute inset-0 z-0"
                  />
                )}

                <div className="absolute left-6 top-6 z-10 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.26em] text-white/78">
                  {product.eyebrow}
                </div>
                <div className="absolute right-6 top-6 z-10 text-[0.72rem] uppercase tracking-[0.3em] text-white/68">
                  {product.year}
                </div>
                
                {/* นี่คือกล่องสี่เหลี่ยมตกแต่ง ที่ถามไปก่อนหน้านี้ครับ ถ้าไม่ชอบลบออกได้นะ */}
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

        <Reveal className="mt-10" delayMs={60}>
          <section className={`${glassPanelClass} px-6 py-6 lg:px-8 lg:py-8`}>
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="border border-white/10 bg-white/5 p-4">
                {/* 🌟 เปลี่ยนมาใช้ <Image /> อีกจุดนึง */}
                <div className="relative min-h-[260px] overflow-hidden sm:min-h-[320px]">
                  {product.cover && (
                    <Image
                      src={urlFor(product.cover).url()}
                      alt="Cover image"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              <div>
                <p className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold leading-tight tracking-[-0.05em] text-white">
                  {product.storyTitle}
                </p>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-white/72">
                  {/* ใส่ ?. เพื่อกันพังถ้าแอดมินไม่ได้กรอก story */}
                  {product.story?.map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                
                {product.quote && (
                  <div className="mt-8 border-l-[3px] border-[#F48120] pl-5">
                    <p className="text-sm uppercase tracking-[0.28em] text-[#F48120]">
                      Project Note
                    </p>
                    <p className="mt-4 max-w-[34rem] text-xl leading-relaxed text-white/84">
                      "{product.quote}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 border border-white/10 bg-white/5 p-4">
              <div className="relative overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[430px]"
                >
                  <source
                    src="/assets/7020050_Abstract_Background_3840x2160.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.18)_100%)]" />
                <div className="absolute left-5 top-5 rounded-full border border-white/24 bg-[#003951]/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[#FAD337]">
                  Product motion preview
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-12" delayMs={80}>
          <section>
            <h2 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-black uppercase leading-[0.92] tracking-[-0.07em] text-white">
              Why teams choose this product
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {product.benefits?.map((benefit: any, index: number) => (
                <article
                  key={index}
                  className="overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),rgba(2,17,24,0.7)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/25 hover:shadow-[0_18px_42px_rgba(0,0,0,0.18)]"
                >
                  {/* 🌟 ใช้ <Image /> แทน CSS Gradient */}
                  <div className="relative flex h-36 items-center justify-center overflow-hidden after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(0,0,0,0.26))] after:content-['']">
                    {product.cover && (
                      <Image
                        src={urlFor(product.cover).url()}
                        alt="Benefit background"
                        fill
                        className="object-cover absolute inset-0 z-0"
                      />
                    )}
                    <span className="relative z-10 text-[3.6rem] font-extralight leading-none tracking-[-0.08em] text-[#FAD337]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.04em] text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-white/68">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-12" delayMs={100}>
          <section>
            <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-black uppercase leading-[0.92] tracking-[-0.07em] text-white">
              Certifications and readiness
            </h2>
            <div className={`${glassPanelClass} mt-6 p-6`}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {product.certifications?.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="flex min-h-[10rem] flex-col items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),rgba(255,255,255,0.04)] text-center transition duration-300 hover:-translate-y-1"
                  >
                    <span className="text-[3rem] font-extralight leading-none tracking-[-0.08em] text-[#FAD337]">
                      0{index + 1}
                    </span>
                    <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/72">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal className="mt-12" delayMs={120}>
          <section>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts?.map((item: any) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="group overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),rgba(2,17,24,0.7)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/25 hover:shadow-[0_18px_42px_rgba(0,0,0,0.18)]"
                >
                  {/* 🌟 ใช้ <Image /> สำหรับรูปโปรเจกต์ที่เกี่ยวข้อง */}
                  <div className="relative min-h-[220px] overflow-hidden">
                    {item.cover && (
                      <Image
                        src={urlFor(item.cover).url()}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="pt-4">
                    <p className="text-[1.9rem] font-bold leading-none tracking-[-0.05em] text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/55">
                      {item.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ส่วน Contact Us ด้านล่างคงเดิม */}
        <Reveal className="mt-16" delayMs={140}>
          <section className={`${glassPanelClass} px-6 py-14 text-center sm:px-10`}>
            <h2 className="text-[clamp(2.8rem,7vw,5.4rem)] font-black uppercase leading-[0.92] tracking-[-0.08em] text-white">
              Ready to build something better?
            </h2>
            <p className="mx-auto mt-4 max-w-[40rem] text-lg leading-relaxed text-white/68">
              Work with us to turn a strong idea into a product experience that
              feels focused, useful, and ready for real users.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex min-w-[18rem] items-center justify-center rounded-full bg-[linear-gradient(90deg,#f48120,#fad337)] px-8 py-4 text-base font-bold uppercase tracking-[0.16em] text-[#003951] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Contact us
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}