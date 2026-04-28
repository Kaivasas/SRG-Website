import React from "react";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityServiceCard } from "@/app/types/sanity";
import ServiceClient from "./ServiceClient";

const SERVICE_CARDS_QUERY = `[
  *[_type == "service" && category == "Business strategies"] | order(_createdAt asc)[0],
  *[_type == "service" && category == "E-commerce"] | order(_createdAt asc)[0],
  *[_type == "service" && category == "Digital marketing"] | order(_createdAt asc)[0]
] {
  title,
  description,
  category,
  "slug": slug.current,
  "image": heroImage.asset->url
}`;

export default async function ServiceSection() {
  const servicesData = await sanityFetchSafe<SanityServiceCard[]>(SERVICE_CARDS_QUERY);
  if (!servicesData || servicesData.length === 0) return null;

  return <ServiceClient servicesData={servicesData} />;
}