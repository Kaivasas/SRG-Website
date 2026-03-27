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

  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#d9d9d9] px-6 pb-20 pt-28 text-black sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1240px]">
        <Link
          href="/products"
          className="inline-flex items-center text-sm uppercase tracking-[0.28em] text-black/55 transition hover:text-black"
        >
          Back to products
        </Link>

        <section className="mt-10 grid gap-8 bg-[#d2d2d2] px-6 py-8 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-10 lg:py-10">
          <div className="pr-0 lg:pr-8">
            <p className="text-sm uppercase tracking-[0.32em] text-black/45">
              {product.category}
            </p>
            <h1 className="mt-4 max-w-[10ch] text-[clamp(3.2rem,7vw,5.8rem)] font-light leading-[0.92] tracking-[-0.07em]">
              {product.title}
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-black/72">
              {product.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm uppercase tracking-[0.22em] text-black/48">
              <span>{product.client}</span>
              <span>{product.status}</span>
              <span>{product.year}</span>
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-5 sm:p-8">
            <div
              className="relative flex min-h-[320px] items-center justify-center overflow-hidden sm:min-h-[360px]"
              style={{ backgroundImage: product.cover }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.34)_100%)]" />
              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/18 px-3 py-1 text-[0.7rem] uppercase tracking-[0.26em] text-white/78 backdrop-blur-sm">
                {product.eyebrow}
              </div>
              <div className="absolute right-6 top-6 text-[0.72rem] uppercase tracking-[0.3em] text-white/68">
                {product.year}
              </div>
              <div className="grid w-full max-w-[23rem] grid-cols-2 gap-4 px-6 opacity-95">
                <div className="h-28 rounded-[1.5rem] border border-white/24 bg-white/14 backdrop-blur-[2px]" />
                <div className="mt-12 h-36 rounded-[1.5rem] border border-white/20 bg-black/16" />
                <div className="-mt-8 h-24 rounded-[1.5rem] border border-white/16 bg-white/10" />
                <div className="h-20 rounded-[999px] border border-white/14 bg-white/10" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 bg-[#d2d2d2] px-6 py-6 lg:px-8 lg:py-8">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="bg-white p-4">
              <div
                className="relative min-h-[260px] overflow-hidden sm:min-h-[320px]"
                style={{ backgroundImage: product.cover }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_32%)]" />
                <div className="absolute inset-0 flex items-center justify-center text-[4.8rem] font-extralight tracking-[-0.08em] text-white/78">
                  X
                </div>
              </div>
            </div>

            <div>
              <p className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-medium leading-tight tracking-[-0.04em]">
                {product.storyTitle}
              </p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-black/76">
                {product.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 border-t border-black/15 pt-6">
                <p className="text-sm uppercase tracking-[0.28em] text-black/45">
                  Project Note
                </p>
                <p className="mt-4 max-w-[34rem] text-xl leading-relaxed text-black/82">
                  "{product.quote}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-4">
            <div className="relative overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[430px]"
              >
                <source
                  src="/assets/7020050_Abstract_Background_3840x2160.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.18)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full border border-white/24 bg-black/18 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/78 backdrop-blur-sm">
                Product motion preview
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-light leading-none tracking-[-0.07em]">
            Why teams choose this product
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {product.benefits.map((benefit, index) => (
              <article key={benefit.title} className="bg-white p-6">
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{ backgroundImage: product.cover }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(0,0,0,0.16)_100%)]" />
                  <span className="relative text-[3.6rem] font-extralight leading-none tracking-[-0.08em] text-white/84">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-tight tracking-[-0.04em]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-black/74">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-none tracking-[-0.07em]">
            Certifications and readiness
          </h2>
          <div className="mt-6 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.certifications.map((item, index) => (
                <div
                  key={item}
                  className="flex min-h-[150px] flex-col items-center justify-center bg-[#d7d7d7] px-4 text-center"
                >
                  <span className="text-[3rem] font-extralight leading-none tracking-[-0.08em]">
                    0{index + 1}
                  </span>
                  <p className="mt-4 text-sm uppercase tracking-[0.24em] text-black/68">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group border-[3px] border-white bg-[#d3d3d3] p-4 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
              >
                <div
                  className="relative flex min-h-[220px] items-center justify-center overflow-hidden"
                  style={{ backgroundImage: item.cover }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.22)_100%)]" />
                  <span className="relative text-[4rem] font-extralight leading-none tracking-[-0.08em] text-white/84">
                    X
                  </span>
                </div>
                <div className="pt-4">
                  <p className="text-[1.9rem] font-medium leading-none tracking-[-0.05em]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-black/65">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-[#d2d2d2] px-6 py-14 text-center sm:px-10">
          <h2 className="text-[clamp(2.8rem,7vw,5.4rem)] font-light leading-[0.95] tracking-[-0.08em]">
            Ready to build something better?
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] text-lg leading-relaxed text-black/72">
            Work with us to turn a strong idea into a product experience that
            feels focused, useful, and ready for real users.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex min-w-[18rem] items-center justify-center rounded-full bg-white px-8 py-5 text-2xl font-medium tracking-[-0.03em] transition hover:bg-black hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
