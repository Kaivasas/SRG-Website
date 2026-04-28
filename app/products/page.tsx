import ProductCategoriesGrid from "@/app/components/product/categories/ProductCategoriesGrid";
import ProductCategoriesHero from "@/app/components/product/categories/ProductCategoriesHero";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityProductCategory } from "@/app/types/sanity";

const PRODUCT_CATEGORIES_QUERY = `*[_type == "productCategory"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  coverImage,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

export default async function ProductsPage() {
  const categories =
    (await sanityFetchSafe<SanityProductCategory[]>(PRODUCT_CATEGORIES_QUERY)) ?? [];

  return (
    <main className="relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.1),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(0,90,114,0.14),transparent_24%),linear-gradient(180deg,#031018_0%,#022533_34%,#003045_68%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.14)),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_48%)] before:content-['']">
      <ProductCategoriesHero />
      <ProductCategoriesGrid categories={categories} />
    </main>
  );
}
