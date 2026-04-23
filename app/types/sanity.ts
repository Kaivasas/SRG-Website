import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// ─── Shared / Reusable ──────────────────────────────────────────

export interface SanitySlug {
  current: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

// ─── Client Logos ────────────────────────────────────────────────

export interface SanityClientLogo {
  _id: string;
  name: string;
  logo: string; // resolved URL via GROQ projection
}

// ─── Testimonials ────────────────────────────────────────────────

export interface SanityTestimonial {
  name: string;
  position?: string;
  company?: string;
  quote: string;
  avatar?: string;
  companyLogo?: string;
}

// ─── Services ────────────────────────────────────────────────────

export interface SanityServiceBase {
  title: string;
  slug: string | SanitySlug;
  category: string;
}

export interface SanityServiceCard extends SanityServiceBase{
  description: string;
  image: string;
}

export interface SanityServiceBenefit extends SanityServiceBase{
  desc: string;
  image?: string;
}

export interface SanityServicePortfolioItem extends SanityServiceBase{
  _id: string;
  image: string;
}

export interface SanityServiceDetail extends SanityServiceBase{
  description?: string;
  heroImage?: string;
  whyTitle?: string;
  benefitImage?: string;
  benefits?: string[];
  portfolios?: SanityServicePortfolioItem[];
}

// ─── Products ────────────────────────────────────────────────────

export interface SanityProductBenefit {
  title: string;
  description: string;
  image?: SanityImageSource;
}

export interface SanityProductCard {
  _id: string;
  title: string;
  slug: string;
  eyebrow?: string;
  description?: string;
  status?: string;
  year?: string;
  thumbnail?: SanityImageSource;
  isFeatured?: boolean;
  longDescription?: string;
}

export interface SanityProductDetail {
  title: string;
  slug: string;
  subtitle?: string;
  eyebrow?: string;
  category?: string;
  year?: string;
  status?: string;
  description?: string;
  longDescription?: string;
  quote?: string;
  gradient?: string;
  thumbnail?: SanityImageSource;
  heroImage?: SanityImageSource;
  storyImage?: SanityImageSource;
  motionVideoUrl?: string;
  tags?: string[];
  storyTitle?: string;
  story?: string[];
  benefits?: SanityProductBenefit[];
  certifications?: string[];
  metrics?: MetricItem[];
}

export interface SanityProductRelated {
  title: string;
  slug: string;
  category?: string;
  year?: string;
  status?: string;
  thumbnail?: SanityImageSource;
}

// ─── Works ───────────────────────────────────────────────────────

export interface SanityWorkCard {
  title: string;
  slug: string;
  thumbnail?: string;
  tags?: string[];
  client?: string;
  year?: string;
}

export interface SanityStickySection {
  title: string;
  content: string;
  image?: string;
}

export interface SanityBeforeAfter {
  before?: string;
  after?: string;
}

export interface SanityWorkDetail {
  title: string;
  slug: string;
  client?: string;
  year?: string;
  shortDesc?: string;
  description?: string;
  heroMedia?: string;
  beforeAfter?: SanityBeforeAfter;
  stickySections?: SanityStickySection[];
  gallery?: string[];
  metrics?: MetricItem[];
}
