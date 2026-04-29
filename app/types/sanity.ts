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
  slug: string;
  category: string;
}

export interface SanityServicePortfolioItem {
  _id: string;
  title: string;
  slug: string;
  image: string;
}

export interface SanityServiceCard extends SanityServiceBase {
  description: string;
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

export interface SanityProductBase {
  title: string;
  slug: string;
  category?: string;
  categorySlug?: string;
}

export interface SanityProductCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: SanityImageSource;
  productCount?: number;
}

export interface SanityProductCore extends SanityProductBase {
  eyebrow?: string;
  subtitle?: string;
  thumbnail?: SanityImageSource;
  longDescription?: string;
}

export interface SanityProductBadgeItem {
  name: string;
  image?: SanityImageSource;
}

export interface SanityProductCard extends SanityProductCore {
  _id: string;
  isFeatured?: boolean;
}

export interface SanityProductCategoryPageData extends SanityProductCategory {
  products: SanityProductCard[];
}

export interface SanityProductDetail extends SanityProductCore {
  heroImage?: SanityImageSource;
  motionVideoUrl?: string;
  certifications?: SanityProductBadgeItem[];
  awards?: SanityProductBadgeItem[];
}

export interface SanityProductRelated extends SanityProductBase {
  thumbnail?: SanityImageSource;
}

// ─── Works ───────────────────────────────────────────────────────

export interface SanityWorkBase {
  title: string;
  slug: string;
  client?: string;
  year?: string;
}

export interface SanityWorkCard extends SanityWorkBase {
  thumbnail?: string;
  tags?: string[];
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

export interface SanityWorkDetail extends SanityWorkBase {
  shortDesc?: string;
  description?: string;
  heroMedia?: string;
  beforeAfter?: SanityBeforeAfter;
  stickySections?: SanityStickySection[];
  gallery?: string[];
  metrics?: MetricItem[];
}
