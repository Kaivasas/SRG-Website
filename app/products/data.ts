export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  year: string;
  status: string;
  description: string;
  longDescription: string;
  quote: string;
  gradient: string;
  cover: string;
  eyebrow: string;
  tags: string[];
  metrics: string[];
  storyTitle: string;
  story: string[];
  benefits: Array<{
    title: string;
    description: string;
  }>;
  certifications: string[];
};

export const products: Product[] = [
  {
    slug: "signal-foundry",
    title: "Signal Foundry",
    subtitle: "A modular product ecosystem for modern operational teams.",
    category: "Operations Design",
    client: "Apex Logistics",
    year: "2025",
    status: "Launched",
    description:
      "A central dashboard concept that turns scattered touchpoints into one guided workflow.",
    longDescription:
      "Signal Foundry imagines a workspace where reporting, escalation, and review all happen inside a single, calm interface. The structure is designed to help teams move faster without losing context.",
    quote:
      "We wanted the experience to feel measured and premium, even while handling complex technical tasks.",
    gradient: "from-[#fcfcfc] via-[#ececec] to-[#d8d8d8]",
    cover:
      "linear-gradient(140deg, rgba(10,10,10,0.72), rgba(10,10,10,0.1)), radial-gradient(circle at 18% 24%, rgba(255,255,255,0.52), transparent 26%), linear-gradient(135deg, #f6f0e7 0%, #d8d7d2 34%, #8da3b6 64%, #344050 100%)",
    eyebrow: "Control Tower Platform",
    tags: ["Dashboards", "Ops tooling", "Enterprise UX"],
    metrics: ["04 deployment modules", "12 connected workflows", "97% clarity score"],
    storyTitle: "Built from a need for calmer operations",
    story: [
      "Signal Foundry started with a simple observation: teams were spending too much time stitching together updates from chat threads, spreadsheets, and dashboards that did not speak to each other.",
      "The idea evolved into a product that makes operational visibility feel immediate. Every layer was designed to help teams see what matters, understand what changed, and decide what should happen next.",
      "What began as a cleanup of messy internal tooling became a more thoughtful product system that now supports day-to-day coordination with far less friction.",
    ],
    benefits: [
      {
        title: "Faster team alignment",
        description:
          "Shared views, clear statuses, and guided actions reduce the back-and-forth that usually slows operations down.",
      },
      {
        title: "Stronger decision visibility",
        description:
          "Approvals, escalations, and ownership are surfaced in one place so teams can act with more confidence.",
      },
      {
        title: "Built to scale cleanly",
        description:
          "The system is modular enough to grow across departments without losing clarity or consistency.",
      },
    ],
    certifications: ["ISO 9001", "SOC 2 Ready", "Internal QA", "Security Reviewed"],
  },
  {
    slug: "atelier-grid",
    title: "Atelier Grid",
    subtitle: "A visual system built for flexible storytelling across campaigns.",
    category: "Brand System",
    client: "Maison Parallel",
    year: "2024",
    status: "In Market",
    description:
      "An art-directed interface language that balances editorial rhythm with technical precision.",
    longDescription:
      "Atelier Grid was shaped as a reusable presentation layer for launches, showcases, and live activations. It combines restrained typography with modular content blocks that are easy to remix.",
    quote:
      "The challenge was making it expressive enough for marketing, while still disciplined enough for product teams.",
    gradient: "from-[#fafafa] via-[#e9e9e9] to-[#d3d3d3]",
    cover:
      "linear-gradient(155deg, rgba(8,8,8,0.58), rgba(8,8,8,0.12)), radial-gradient(circle at 76% 18%, rgba(255,240,212,0.75), transparent 22%), linear-gradient(135deg, #efe1d3 0%, #d2b69f 30%, #9e765d 65%, #35251c 100%)",
    eyebrow: "Campaign Story System",
    tags: ["Editorial", "Brand rollout", "Content system"],
    metrics: ["28 reusable layouts", "3 presentation modes", "1 shared visual language"],
    storyTitle: "A system for expressive brand storytelling",
    story: [
      "Atelier Grid grew out of a challenge many brand teams face: the need to move fast without making every launch look disconnected from the last.",
      "We approached it as a design language rather than a one-off campaign page, creating a flexible framework that could hold strong visual identity while still supporting product updates and editorial content.",
      "The result is a toolkit that feels art-directed, but stays practical enough for internal teams to keep using after the first launch goes live.",
    ],
    benefits: [
      {
        title: "Editorial quality at speed",
        description:
          "Teams can assemble rich layouts quickly without sacrificing visual rhythm or brand consistency.",
      },
      {
        title: "Reusable across launches",
        description:
          "Templates, spacing rules, and content patterns make each new story easier to publish and maintain.",
      },
      {
        title: "Consistent premium feel",
        description:
          "Typography, pacing, and modular assets work together to keep the experience intentional on every screen.",
      },
    ],
    certifications: ["Brand Approved", "Accessibility Checked", "Content QA", "Launch Ready"],
  },
  {
    slug: "lattice-flow",
    title: "Lattice Flow",
    subtitle: "An internal platform concept for teams managing layered approvals.",
    category: "Workflow Product",
    client: "Nova Health Group",
    year: "2025",
    status: "Pilot",
    description:
      "A clearer path through reviews, hand-offs, and decision trails for cross-functional teams.",
    longDescription:
      "Lattice Flow reframes approvals as a guided sequence rather than a maze of back-and-forth messages. Every surface is tuned to reduce hesitation and make the next action obvious.",
    quote:
      "The product needed enough structure to guide teams, but enough softness to remain approachable every day.",
    gradient: "from-[#ffffff] via-[#f1f1f1] to-[#d9d9d9]",
    cover:
      "linear-gradient(160deg, rgba(255,255,255,0.16), rgba(0,0,0,0.26)), radial-gradient(circle at 72% 20%, rgba(255,255,255,0.42), transparent 24%), linear-gradient(135deg, #dfe9e2 0%, #b4ccbb 33%, #67857d 66%, #1d2c2d 100%)",
    eyebrow: "Approval Workflow Suite",
    tags: ["Internal tools", "Compliance", "Process design"],
    metrics: ["8 decision checkpoints", "2.5x faster approvals", "Zero duplicated submissions"],
    storyTitle: "Designed for complex approvals without the noise",
    story: [
      "Lattice Flow began as a response to approval chains that were slow, fragmented, and hard to trust. Critical decisions were happening across too many channels with too little context.",
      "We rebuilt the experience around progress visibility. Instead of forcing users to chase updates, the product makes each review stage legible and every pending action easier to understand.",
      "That clarity turned a stressful internal process into a more dependable product experience for the teams managing risk, compliance, and operations.",
    ],
    benefits: [
      {
        title: "Clearer review stages",
        description:
          "People immediately understand where an item sits, who owns it, and what must happen before it can move on.",
      },
      {
        title: "Reduced submission errors",
        description:
          "Built-in structure helps users provide the right information the first time, cutting avoidable loops.",
      },
      {
        title: "Lower cognitive load",
        description:
          "Interfaces are calmer and more guided, making dense operational work feel easier to manage every day.",
      },
    ],
    certifications: ["Compliance Ready", "Audit Friendly", "Process Tested", "Internal Pilot"],
  },
  {
    slug: "northstar-kit",
    title: "Northstar Kit",
    subtitle: "A product framework for launching new services with a unified feel.",
    category: "Service Platform",
    client: "Fieldhouse Capital",
    year: "2026",
    status: "Rolling Out",
    description:
      "A launch-ready kit that brings alignment to messaging, user flow, and internal tools.",
    longDescription:
      "Northstar Kit packages product essentials into one adaptable system, helping teams prototype new offers without rebuilding the experience from scratch every time.",
    quote:
      "Everything was designed to feel understated, dependable, and immediately useful from the first screen.",
    gradient: "from-[#fbfbfb] via-[#ededed] to-[#d7d7d7]",
    cover:
      "linear-gradient(150deg, rgba(0,0,0,0.54), rgba(0,0,0,0.08)), radial-gradient(circle at 22% 78%, rgba(255,255,255,0.35), transparent 24%), linear-gradient(135deg, #ece6d7 0%, #c8baa0 36%, #7f7c78 64%, #222329 100%)",
    eyebrow: "Launch Framework",
    tags: ["Service design", "Templates", "Go-to-market"],
    metrics: ["6 rollout templates", "14 content variants", "Single-source component logic"],
    storyTitle: "A steadier way to launch new service ideas",
    story: [
      "Northstar Kit was shaped around a familiar problem: teams needed to launch new offers quickly, but every launch required too much rebuilding from scratch.",
      "Rather than making another rigid template, we designed a flexible product framework with enough structure to keep launches aligned and enough freedom to adapt to different service types.",
      "The system now acts as a foundation for new initiatives, helping teams move from concept to rollout with less duplicated effort and a stronger overall impression.",
    ],
    benefits: [
      {
        title: "Launches feel more unified",
        description:
          "Shared components and messaging patterns bring consistency across touchpoints from day one.",
      },
      {
        title: "Teams move with more confidence",
        description:
          "A ready-made framework removes uncertainty and gives cross-functional teams a clearer starting point.",
      },
      {
        title: "Less reinvention every cycle",
        description:
          "Reusable structures mean future launches become faster, cheaper, and easier to maintain over time.",
      },
    ],
    certifications: ["Framework Verified", "Service Ready", "UX Reviewed", "Rollout Approved"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
