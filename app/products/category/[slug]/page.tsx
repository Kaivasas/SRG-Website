import { notFound } from "next/navigation";
import ProductCategoryGrid from "@/app/components/product/productlist/ProductCategoryGrid";
import ProductCategoryHero from "@/app/components/product/productlist/ProductCategoryHero";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityProductCategoryPageData } from "@/app/types/sanity";

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

export async function generateStaticParams() {
  return (await sanityFetchSafe<{ slug: string }[]>(CATEGORY_SLUGS_QUERY)) ?? [];
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await sanityFetchSafe<SanityProductCategoryPageData>(
    CATEGORY_PAGE_QUERY,
    { slug }
  );

  if (!category) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.1),transparent_28%),radial-gradient(circle_at_82%_15%,rgba(0,90,114,0.14),transparent_24%),linear-gradient(180deg,#031018_0%,#022533_34%,#003045_68%,#003951_100%)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0.18),transparent_18%,transparent_82%,rgba(0,0,0,0.14)),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_48%)] before:content-['']">
      <ProductCategoryHero category={category} />
      <ProductCategoryGrid category={category} />
    </main>
  );
}
