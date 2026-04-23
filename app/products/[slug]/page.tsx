import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";

import ProductHero from "@/app/components/product/ProductHero";
import ProductStory from "@/app/components/product/ProductStory";
import ProductBenefits from "@/app/components/product/ProductBenefits";
import ProductCertifications from "@/app/components/product/ProductCertifications";
import RelatedProducts from "@/app/components/product/RelatedProducts";
import ProductCTA from "@/app/components/product/ProductCTA";
import type { SanityProductDetail, SanityProductRelated } from "@/app/types/sanity";

const pageShellClass = "relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(0,90,114,0.1),transparent_26%),radial-gradient(circle_at_85%_12%,rgba(244,129,32,0.1),transparent_24%),linear-gradient(180deg,#020d14_0%,#022331_32%,#003045_70%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.22),transparent_18%,transparent_82%,rgba(0,0,0,0.16)),radial-gradient(circle_at_center,rgba(255,255,255,0.018),transparent_48%)] before:content-['']";

export async function generateStaticParams() {
  try {
    const query = `*[_type == "product"] { "slug": slug.current }`;
    const slugs = await client.fetch(query);
    return slugs;
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // ถ้าพังตอน Build ก็คืนค่า Array ว่างไปก่อน
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const productQuery = `*[_type == "product" && slug.current == $slug][0] {
    ...,
    "category": coalesce(productCategory->title, category),
    "categorySlug": productCategory->slug.current,
    "motionVideoUrl": motionVideo.asset->url
  }`;

  const allProductsQuery = `*[_type == "product" && slug.current != $slug && productCategory->slug.current == $categorySlug] | order(_createdAt desc)[0...3] {
    title,
    "slug": slug.current,
    "category": coalesce(productCategory->title, category),
    thumbnail
  }`;

  let product: SanityProductDetail | null = null;
  let relatedProducts: SanityProductRelated[] = [];

  // 🌟 ใส่เกราะ try...catch ครอบการดึงข้อมูล
  try {
    const fetchedProduct = await client.fetch<SanityProductDetail | null>(
      productQuery,
      { slug }
    );
    product = fetchedProduct;

    if (fetchedProduct?.categorySlug) {
      relatedProducts = await client.fetch<SanityProductRelated[]>(allProductsQuery, {
        slug,
        categorySlug: fetchedProduct.categorySlug,
      });
    }
  } catch (error) {
    console.error("🔥 Sanity Error in Product Detail Page:", error);
    // ถ้าพังรุนแรง โยนไปหาหน้า error.tsx ของ Next.js ได้เลย
    throw new Error("Failed to load product data"); 
  }

  // ถ้าดึงข้อมูลสำเร็จ แต่หาโปรเจกต์นี้ไม่เจอ (เช่น แอดมินลบไปแล้ว) ก็ให้เด้งไปหน้า 404
  if (!product) notFound();

  return (
    <main className={`${pageShellClass} px-6 pb-20 pt-28 text-white sm:px-10 lg:px-20`}>
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Link
          href={product.categorySlug ? `/products/category/${product.categorySlug}` : "/products"}
          className="inline-flex items-center gap-3 text-[0.76rem] font-bold uppercase tracking-[0.26em] text-white/64 transition hover:text-[#FAD337]"
        >
          {product.categorySlug ? "Back to category" : "Back to products"}
        </Link>

        <ProductHero product={product} />
        <ProductStory product={product} />
        <ProductBenefits benefits={product.benefits ?? []} />
        <ProductCertifications certifications={product.certifications ?? []} />
        <RelatedProducts products={relatedProducts} />
        <ProductCTA />

      </div>
    </main>
  );
}
