import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductCategoryPageData } from "@/app/types/sanity";

// 🌟 ขยาย Type ให้รับค่า coverImageAspectRatio ได้
interface CategoryHeroProps {
  category: SanityProductCategoryPageData & { coverImageAspectRatio?: number };
}

export default function ProductCategoryHero({ category }: CategoryHeroProps) {
  return (
    <Reveal className="relative mx-auto flex min-h-[65vh] w-full max-w-[1400px] items-end px-6 pb-16 pt-32 sm:px-10 lg:px-20">
      <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        
        {/* ฝั่งซ้าย: เนื้อหาข้อความ */}
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
            {category.description || "Explore the products available in this category."}
          </p>
        </div>

        {/* 🌟 ฝั่งขวา: รูปภาพ (อัปเดตเป็น Dynamic Aspect Ratio) */}
        <div 
          className="relative flex items-center justify-center w-full max-h-[60vh] overflow-hidden border border-white/10 bg-black/40 rounded-sm"
          style={{ 
            // 🌟 ดึงค่าสัดส่วนมาใช้ ถ้าไม่มีข้อมูลให้ใช้แนวนอน 16/9 เป็นค่าเริ่มต้น
            aspectRatio: category.coverImageAspectRatio || '16 / 9' 
          }}
        >
          {category.coverImage ? (
            <Image
              src={urlFor(category.coverImage).url()}
              alt={category.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              // 🌟 เปลี่ยน object-cover เป็น object-contain
              className="object-contain z-0 drop-shadow-2xl"
            />
          ) : (
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(250,211,55,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.28))]" />
          )}
          
          {/* Layer สร้างมิติแสงเงาให้กรอบดูแพงขึ้น (pointer-events-none กันบั๊กชี้เมาส์) */}
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,57,81,0.12),rgba(0,0,0,0.34))] pointer-events-none" />
          
          {/* Badge แสดงจำนวนสินค้า */}
          <div className="absolute bottom-5 left-5 z-20 rounded-full border border-white/15 bg-black/50 backdrop-blur-md px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/90 shadow-lg">
            {category.products.length} products
          </div>
        </div>

      </div>
    </Reveal>
  );
}