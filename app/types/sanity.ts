// ─── Auto-generated Type Aliases ──────────────────────────────────────────
// We are now utilizing Sanity TypeGen! 
// This file maps your old manual types to the newly generated exact types
// to prevent breaking changes across the codebase.

import type {
  CLIENTS_QUERYResult,
  TESTIMONIALS_QUERYResult,
  SERVICES_NAV_QUERYResult,
  SERVICE_CARDS_QUERYResult,
  SERVICE_QUERYResult,
  PRODUCT_CATEGORIES_QUERYResult,
  CATEGORY_PAGE_QUERYResult,
  PRODUCT_QUERYResult,
  RELATED_PRODUCTS_QUERYResult,
  WORKS_QUERYResult,
  WORK_DETAIL_QUERYResult
} from "@/sanity.types";

export type SanitySlug = { current: string };
export type MetricItem = { value: string; label: string };

export type SanityClientLogo = Exclude<NonNullable<CLIENTS_QUERYResult>[number], null>;
export type SanityTestimonial = Exclude<NonNullable<TESTIMONIALS_QUERYResult>[number], null>;

// Services
export type SanityServiceBase = Exclude<NonNullable<SERVICES_NAV_QUERYResult>[number], null>;
export type SanityServiceCard = Exclude<NonNullable<SERVICE_CARDS_QUERYResult>[number], null>;
export type SanityServiceDetail = NonNullable<SERVICE_QUERYResult>;
export type SanityServicePortfolioItem = NonNullable<SanityServiceDetail["portfolios"]>[number];

// Products
export type SanityProductCategory = Exclude<NonNullable<PRODUCT_CATEGORIES_QUERYResult>[number], null>;
export type SanityProductCategoryPageData = NonNullable<CATEGORY_PAGE_QUERYResult>;
export type SanityProductCard = NonNullable<CATEGORY_PAGE_QUERYResult>["products"][number];
export type SanityProductDetail = NonNullable<PRODUCT_QUERYResult>;
export type SanityProductRelated = Exclude<NonNullable<RELATED_PRODUCTS_QUERYResult>[number], null>;

// Generic fallbacks for older strict usages
export type SanityProductBase = { title?: string | null; slug?: string | null; category?: string | null; categorySlug?: string | null };
export type SanityProductCore = SanityProductDetail;
export type SanityProductBadgeItem = NonNullable<SanityProductDetail["awards"]>[number];

// Works
export type SanityWorkCard = Exclude<NonNullable<WORKS_QUERYResult>[number], null>;
export type SanityWorkDetail = NonNullable<WORK_DETAIL_QUERYResult>;
export type SanityBeforeAfter = NonNullable<SanityWorkDetail["beforeAfter"]>;
export type SanityStickySection = NonNullable<SanityWorkDetail["stickySections"]>[number];
export type SanityGalleryImage = NonNullable<SanityWorkDetail["gallery"]>[number];
export type SanityWorkBase = { title?: string | null; slug?: string | null; client?: string | null; year?: string | null };
