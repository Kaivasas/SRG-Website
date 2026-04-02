import Link from "next/link";
import Image from "next/image"; // 🌟 นำเข้า Image สำหรับโชว์รูปปก
import Reveal from "./Reveal";

// 🌟 นำเข้า Sanity Client และ Image Builder (ปรับ path ให้ตรงกับโฟลเดอร์ในโปรเจกต์คุณนะครับ)
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const primaryButtonClass =
  "inline-flex min-w-[13rem] items-center justify-center rounded-full bg-[linear-gradient(90deg,#f48120,#fad337)] px-6 py-4 text-[0.86rem] font-bold uppercase tracking-[0.2em] text-[#003951] transition hover:-translate-y-0.5";

const secondaryButtonClass =
  "inline-flex min-w-[13rem] items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-4 text-[0.86rem] font-bold uppercase tracking-[0.2em] text-white/85 transition hover:-translate-y-0.5";

const panelClass =
  "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.58)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]";

const productCardClass =
  "group relative flex min-h-[31rem] overflow-hidden border border-white/12 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/30 hover:shadow-[0_18px_42px_rgba(0,0,0,0.2)] max-sm:min-h-[28rem]";

const tileBaseClass = "border border-white/15 bg-white/10";
const metaChipClass =
  "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/72";
const metaAccentClass =
  "inline-flex items-center justify-center rounded-full bg-[#FAD337]/12 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#FAD337]";

// 🌟 เปลี่ยน Component เป็นแบบ async เพื่อดึงข้อมูล
export default async function ProductsPage() {

  // 🌟 คำสั่ง GROQ ดึงข้อมูล Product ทั้งหมดจาก Sanity
  const query = `*[_type == "product"] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    description,
    status,
    year,
    thumbnail,
  }`;

  // 🌟 ดึงข้อมูลเข้าตัวแปร products
  const products = await client.fetch(query);

  return (
    <main className="relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.1),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(0,90,114,0.14),transparent_24%),linear-gradient(180deg,#031018_0%,#022533_34%,#003045_68%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.14)),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_48%)] before:content-['']">
      {/* ... (ส่วน Header ด้านบนเหมือนเดิม ไม่มีการเปลี่ยนแปลง) ... */}
      <Reveal className="relative mx-auto flex min-h-[78vh] w-full max-w-[1400px] items-center px-6 pb-20 pt-32 sm:px-10 lg:px-20">
        <div className="max-w-[1050px]">
          <span className="inline-flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-3 text-[0.74rem] font-bold uppercase tracking-[0.34em] text-[#FAD337]">
            Innovation Portfolio
          </span>
          <div className="mt-6 inline-block">
            <h1 className="text-[clamp(4rem,10vw,8.2rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
              <span className="block">Future-Ready</span>
              <span className="block">Product Systems</span>
            </h1>
          </div>
          <p className="mt-6 max-w-[860px] text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-white/72">
            Explore a curated line-up of digital products shaped for real-world
            growth, sustainable operations, and more expressive brand
            experiences.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className={primaryButtonClass}>
              Start a Project
            </Link>
            <a href="#products-grid" className={secondaryButtonClass}>
              Browse Products
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
                  Selected Solutions
                </span>
                <h2 className="mt-3 text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-[-0.06em] text-white">
                  Built To Move Brands Forward
                </h2>
              </div>
              <p className="max-w-[34rem] border-l-2 border-[#F48120] pl-4 text-base leading-relaxed text-white/64">
                Every product is presented as a launch-ready concept with
                clearer positioning, stronger storytelling, and a more premium
                visual rhythm that matches the rest of the site.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product: any, index: number) => (
                <Reveal
                  key={product._id} // 🌟 ใช้ _id ของ Sanity แทน
                  className={productCardClass}
                  delayMs={index * 90}
                >
                  <Link href={`/products/${product.slug}`} className="block h-full w-full">
                    <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

                    {/* 🌟 เปลี่ยนมาโชว์รูปภาพที่อัปโหลดจาก Sanity แทน CSS แบบเดิม */}
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
                            {product.eyebrow}
                          </p>
                          <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white">
                            {product.title}
                          </h3>
                        </div>
                        <span className="text-xs uppercase tracking-[0.28em] text-white/48">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-4 max-w-[28rem] text-sm leading-relaxed text-white/70 sm:text-base">
                        {product.description}
                      </p>


                      {/* 🌟 เปลี่ยน mt-8 เป็น mt-auto */}
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5">
                        {/* 🌟 เพิ่ม Label กำกับด้านหน้า และใส่เงื่อนไขเช็คว่าถ้าไม่มีข้อมูลก็ไม่ต้องโชว์กรอบ */}
                        <div className="flex flex-wrap gap-2">
                          {product.status && (
                            <span className={metaChipClass}>
                              <span className="text-white/40 mr-2 font-normal">STATUS</span> {product.status}
                            </span>
                          )}
                          {product.year && (
                            <span className={metaAccentClass}>
                              <span className="text-[#FAD337]/60 mr-2 font-normal">YEAR</span> {product.year}
                            </span>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase tracking-[0.24em] text-[#F48120]">
                          View Case Study
                          <span aria-hidden="true">+</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}