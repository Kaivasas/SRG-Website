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
  
  // 🌟 2. เปลี่ยน cover เป็น thumbnail สำหรับโปรเจกต์ที่เกี่ยวข้องด้านล่าง
  const relatedQuery = `*[_type == "product" && slug.current != $slug][0...3] {
    title,
    "slug": slug.current,
    category,
    thumbnail
  }`;

  const [product, relatedProducts] = await Promise.all([
    client.fetch(productQuery, { slug }),
    client.fetch(relatedQuery, { slug })
  ]);

  if (!product) notFound();

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