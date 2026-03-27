import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "../data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#d9d9d9] px-6 pb-20 pt-28 text-black sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href="/products"
          className="inline-flex items-center text-sm uppercase tracking-[0.28em] text-black/55 transition hover:text-black"
        >
          Back to products
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="bg-[#f5f5f5] p-6 sm:p-8">
            <div
              className={`relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br ${product.gradient}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_45%)]" />
              <span className="relative text-[clamp(6rem,16vw,11rem)] font-extralight leading-none tracking-[-0.08em]">
                X
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-black/45">
                {product.category}
              </p>
              <h1 className="mt-4 text-[clamp(3rem,7vw,5.5rem)] font-light leading-[0.92] tracking-[-0.06em]">
                {product.title}
              </h1>
              <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-black/72">
                {product.longDescription}
              </p>
            </div>

            <div className="border-t border-black/15 pt-6">
              <p className="text-sm uppercase tracking-[0.28em] text-black/45">
                Project Note
              </p>
              <p className="mt-4 max-w-[34rem] text-xl leading-relaxed text-black/82">
                "{product.quote}"
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {product.metrics.map((metric) => (
            <div key={metric} className="bg-[#f5f5f5] p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-black/40">
                Highlight
              </p>
              <p className="mt-4 text-2xl font-light leading-snug tracking-[-0.04em]">
                {metric}
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
