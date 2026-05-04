import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import type { SanityTestimonial } from "@/app/types/sanity";
import TestimonialCarousel from "./TestimonialCarousel";

const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(_createdAt desc)[0...10] {
  name,
  position,
  company,
  quote,
  "avatar": avatar.asset->url,
  "companyLogo": companyLogo.asset->url
}`);

export default async function TestimonialSection() {
  const { data: testimonials } = await sanityFetch({ query: TESTIMONIALS_QUERY });
  if (!testimonials || testimonials.length === 0) return null;

  return <TestimonialCarousel testimonialsData={testimonials as SanityTestimonial[]} />;
}