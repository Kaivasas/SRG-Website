import React from "react";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityTestimonial } from "@/app/types/sanity";
import TestimonialCarousel from "./TestimonialCarousel";

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc)[0...10] {
  name,
  position,
  company,
  quote,
  "avatar": avatar.asset->url,
  "companyLogo": companyLogo.asset->url
}`;

export default async function TestimonialSection() {
  const testimonials = await sanityFetchSafe<SanityTestimonial[]>(TESTIMONIALS_QUERY);
  if (!testimonials || testimonials.length === 0) return null;

  return <TestimonialCarousel testimonialsData={testimonials} />;
}