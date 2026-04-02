import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";

// นำเข้า Components ที่เราแยกไว้ (ปรับ Path ให้ตรงกับโฟลเดอร์ที่คุณเก็บ)
import ProductHero from "@/app/components/product/ProductHero";
import ProductStory from "@/app/components/product/ProductStory";
import ProductBenefits from "@/app/components/product/ProductBenefits";
import ProductCertifications from "@/app/components/product/ProductCertifications";
import RelatedProducts from "@/app/components/product/RelatedProducts";
import ProductCTA from "@/app/components/product/ProductCTA";

const pageShellClass = "relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(0,90,114,0.1),transparent_26%),radial-gradient(circle_at_85%_12%,rgba(244,129,32,0.1),transparent_24%),linear-gradient(180deg,#020d14_0%,#022331_32%,#003045_70%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.22),transparent_18%,transparent_82%,rgba(0,0,0,0.16)),radial-gradient(circle_at_center,rgba(255,255,255,0.018),transparent_48%)] before:content-['']";

export async function generateStaticParams() {
  const query = `*[_type == "product"] { "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 🌟 1. ดึงข้อมูลทั้งหมด (...) และเจาะเอา URL ของวิดีโอออกมาโดยเฉพาะ
  const productQuery = `*[_type == "product" && slug.current == $slug][0] {
    ...,
    "motionVideoUrl": motionVideo.asset->url
  }`;

  // 🌟 2. ดึงข้อมูล Product "ทั้งหมด" ออกมา (ดึงมาเฉพาะฟิลด์ที่จำเป็น เพื่อให้โหลดไว)
  // แนะนำให้ใส่ | order(_createdAt desc) เพื่อให้โปรเจกต์ใหม่ล่าสุดอยู่บนสุดเสมอ
  const allProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    category,
    year,
    status,
    thumbnail
  }`;

  // ยิงคำสั่งดึงข้อมูลพร้อมกัน
  const [product, allProducts] = await Promise.all([
    client.fetch(productQuery, { slug }),
    client.fetch(allProductsQuery)
  ]);

  if (!product) notFound();

  // 🌟 3. ลอจิกการคำนวณหา Related Products (หน้า 2 หลัง 1 แบบวงกลม)
  let relatedProducts = [];
  const currentIndex = allProducts.findIndex((p: any) => p.slug === slug);

  // ดักบั๊ก: ถ้าทั้งเว็บมีโปรเจกต์แค่ 4 ชิ้นหรือน้อยกว่า ก็แค่ดึงอันที่เหลือมาโชว์ทั้งหมด (ไม่ต้องวนลูปให้เมื่อย)
  if (allProducts.length <= 4) {
    relatedProducts = allProducts.filter((p: any) => p.slug !== slug);
  }
  // ถ้ามีมากกว่า 4 ชิ้น ให้ใช้เวทมนตร์ Circular Array
  else if (currentIndex !== -1) {
    const len = allProducts.length;

    // สูตร (index + ความยาว) % ความยาว คือท่ามาตรฐานในการวนลูปไม่ให้ Array ติดลบหรือเกินขอบเขต
    const prev2 = allProducts[(currentIndex - 2 + len) % len]; // ย้อนหลัง 2 อัน
    const prev1 = allProducts[(currentIndex - 1 + len) % len]; // ย้อนหลัง 1 อัน
    const next1 = allProducts[(currentIndex + 1) % len];       // ถัดไป 1 อัน

    // จับยัดลง Array เรียงตามลำดับที่เราต้องการ
    relatedProducts = [prev2, prev1, next1];
  }

  return (
    <main className={`${pageShellClass} px-6 pb-20 pt-28 text-white sm:px-10 lg:px-20`}>
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Link href="/products" className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase tracking-[0.26em] text-white/64 transition hover:text-[#FAD337]">
          Back to products
        </Link>

        {/* เรียกใช้งาน Components */}
        <ProductHero product={product} />
        <ProductStory product={product} />

        {/* 🌟 3. เอา cover ออกจาก Props เพราะเดี๋ยวเราจะไปใช้รูปแยกของแต่ละ Benefit แทน */}
        <ProductBenefits benefits={product.benefits} />

        <ProductCertifications certifications={product.certifications} />
        <RelatedProducts products={relatedProducts} />
        <ProductCTA />

      </div>
    </main>
  );
}