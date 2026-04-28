import Link from "next/link";
import ProductHero from "@/app/components/product/detail/ProductHero";
import ProductStory from "@/app/components/product/detail/ProductStory";
import ProductCertifications from "@/app/components/product/detail/ProductCertifications";
import RelatedProducts from "@/app/components/product/detail/RelatedProducts";
import ProductCTA from "@/app/components/product/detail/ProductCTA";
import type { SanityProductDetail, SanityProductRelated } from "@/app/types/sanity";

const pageShellClass =
  "relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(0,90,114,0.1),transparent_26%),radial-gradient(circle_at_85%_12%,rgba(244,129,32,0.1),transparent_24%),linear-gradient(180deg,#020d14_0%,#022331_32%,#003045_70%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.22),transparent_18%,transparent_82%,rgba(0,0,0,0.16)),radial-gradient(circle_at_center,rgba(255,255,255,0.018),transparent_48%)] before:content-['']";

export default function ProductDetailContent({
  product,
  relatedProducts,
}: {
  product: SanityProductDetail;
  relatedProducts: SanityProductRelated[];
}) {
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
        <ProductCertifications
          certifications={product.certifications ?? []}
          awards={product.awards ?? []}
        />
        <RelatedProducts products={relatedProducts} />
        <ProductCTA />
      </div>
    </main>
  );
}
