export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  quote: string;
  gradient: string;
  metrics: string[];
};

export const products: Product[] = [
  {
    slug: "signal-foundry",
    title: "Signal Foundry",
    subtitle: "A modular product ecosystem for modern operational teams.",
    category: "Operations Design",
    description:
      "A central dashboard concept that turns scattered touchpoints into one guided workflow.",
    longDescription:
      "Signal Foundry imagines a workspace where reporting, escalation, and review all happen inside a single, calm interface. The structure is designed to help teams move faster without losing context.",
    quote:
      "We wanted the experience to feel measured and premium, even while handling complex technical tasks.",
    gradient: "from-[#fcfcfc] via-[#ececec] to-[#d8d8d8]",
    metrics: ["04 deployment modules", "12 connected workflows", "97% clarity score"],
  },
  {
    slug: "atelier-grid",
    title: "Atelier Grid",
    subtitle: "A visual system built for flexible storytelling across campaigns.",
    category: "Brand System",
    description:
      "An art-directed interface language that balances editorial rhythm with technical precision.",
    longDescription:
      "Atelier Grid was shaped as a reusable presentation layer for launches, showcases, and live activations. It combines restrained typography with modular content blocks that are easy to remix.",
    quote:
      "The challenge was making it expressive enough for marketing, while still disciplined enough for product teams.",
    gradient: "from-[#fafafa] via-[#e9e9e9] to-[#d3d3d3]",
    metrics: ["28 reusable layouts", "3 presentation modes", "1 shared visual language"],
  },
  {
    slug: "lattice-flow",
    title: "Lattice Flow",
    subtitle: "An internal platform concept for teams managing layered approvals.",
    category: "Workflow Product",
    description:
      "A clearer path through reviews, hand-offs, and decision trails for cross-functional teams.",
    longDescription:
      "Lattice Flow reframes approvals as a guided sequence rather than a maze of back-and-forth messages. Every surface is tuned to reduce hesitation and make the next action obvious.",
    quote:
      "The product needed enough structure to guide teams, but enough softness to remain approachable every day.",
    gradient: "from-[#ffffff] via-[#f1f1f1] to-[#d9d9d9]",
    metrics: ["8 decision checkpoints", "2.5x faster approvals", "Zero duplicated submissions"],
  },
  {
    slug: "northstar-kit",
    title: "Northstar Kit",
    subtitle: "A product framework for launching new services with a unified feel.",
    category: "Service Platform",
    description:
      "A launch-ready kit that brings alignment to messaging, user flow, and internal tools.",
    longDescription:
      "Northstar Kit packages product essentials into one adaptable system, helping teams prototype new offers without rebuilding the experience from scratch every time.",
    quote:
      "Everything was designed to feel understated, dependable, and immediately useful from the first screen.",
    gradient: "from-[#fbfbfb] via-[#ededed] to-[#d7d7d7]",
    metrics: ["6 rollout templates", "14 content variants", "Single-source component logic"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
