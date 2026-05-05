import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import ProductDetailContent from "@/app/components/product/detail/ProductDetailContent";
import type { SanityProductDetail, SanityProductRelated } from "@/app/types/sanity";

const PRODUCT_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0] {
  ...,
  "category": coalesce(productCategory->title, category),
  "categorySlug": productCategory->slug.current,
  "motionVideoUrl": motionVideo.asset->url,
  "heroImageAspectRatio": heroImage.asset->metadata.dimensions.aspectRatio,
}`);

const RELATED_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && slug.current != $slug && productCategory->slug.current == $categorySlug] | order(_createdAt desc)[0...3] {
  title,
  "slug": slug.current,
  "category": coalesce(productCategory->title, category),
  thumbnail
}`);

const PRODUCT_SLUGS_QUERY = defineQuery(`*[_type == "product"] { "slug": slug.current }`);

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({ 
    query: PRODUCT_SLUGS_QUERY,
    perspective: 'published',
    stega: false
  });
  return slugs ?? [];
}

import type { Metadata } from "next";
import { generateDynamicMetadata } from "@/app/lib/seoHelper";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generateDynamicMetadata({ type: "product", slug });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product } = await sanityFetch({ 
    query: PRODUCT_QUERY, 
    params: { slug } 
  });

  if (!product) {
    notFound();
  }

  let relatedProducts: SanityProductRelated[] = [];
  if (product.categorySlug) {
    const { data: related } = await sanityFetch({
      query: RELATED_PRODUCTS_QUERY,
      params: {
        slug,
        categorySlug: product.categorySlug,
      }
    });
    relatedProducts = (related as SanityProductRelated[]) ?? [];
  }

  return <ProductDetailContent product={product as SanityProductDetail} relatedProducts={relatedProducts} />;
}
