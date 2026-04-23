import Link from "next/link";
import Image from "next/image";
import Reveal from "../Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductRelated } from "@/app/types/sanity";

export default function RelatedProducts({ products }: { products: SanityProductRelated[] }) {
  if (!products?.length) return null;

  return (
    <Reveal className="mt-12" delayMs={120}>
      <section>
        {/* ใส่หัวข้อบอกคนดูสักหน่อย */}
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.07em] text-white mb-8">
          More Products
        </h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((item) => (
            <Link key={item.slug} href={`/products/${item.slug}`} className="group overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),rgba(2,17,24,0.7)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#FAD337]/25 hover:shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
              <div className="relative min-h-[220px] overflow-hidden">
                {item.thumbnail && (
                  <Image src={urlFor(item.thumbnail).url()} alt={item.title} fill className="object-cover" />
                )}
              </div>
              <div className="pt-4 flex justify-between items-end">
                <div>
                  <p className="text-[1.9rem] font-bold leading-none tracking-[-0.05em] text-white">{item.title}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/55">{item.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
