import BrandLoader from "./components/ui/BrandLoader";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.14),transparent_26%),radial-gradient(circle_at_82%_15%,rgba(0,90,114,0.16),transparent_22%),linear-gradient(180deg,#020d14_0%,#022331_34%,#003045_68%,#003951_100%)] px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),transparent_22%,transparent_78%,rgba(0,0,0,0.14)),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_46%)]" />
      <BrandLoader />
    </main>
  );
}
