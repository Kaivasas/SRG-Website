import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductDetailContent from "@/app/components/product/detail/ProductDetailContent";
import type { SanityProductDetail, SanityProductRelated } from "@/app/types/sanity";

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  ...,
  "category": coalesce(productCategory->title, category),
  "categorySlug": productCategory->slug.current,
  "motionVideoUrl": motionVideo.asset->url
}`;

const RELATED_PRODUCTS_QUERY = `*[_type == "product" && slug.current != $slug && productCategory->slug.current == $categorySlug] | order(_createdAt desc)[0...3] {
  title,
  "slug": slug.current,
  "category": coalesce(productCategory->title, category),
  thumbnail
}`;

export async function generateStaticParams() {
  try {
    return await client.fetch(`*[_type == "product"] { "slug": slug.current }`);
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: SanityProductDetail | null = null;
  let relatedProducts: SanityProductRelated[] = [];

  try {
    const fetchedProduct = await client.fetch<SanityProductDetail | null>(
      PRODUCT_QUERY,
      { slug }
    );
    product = fetchedProduct;

    if (fetchedProduct?.categorySlug) {
      relatedProducts = await client.fetch<SanityProductRelated[]>(
        RELATED_PRODUCTS_QUERY,
        {
          slug,
          categorySlug: fetchedProduct.categorySlug,
        }
      );
    }
  } catch (error) {
    console.error("Sanity Error in Product Detail Page:", error);
    throw new Error("Failed to load product data");
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} relatedProducts={relatedProducts} />;
}
