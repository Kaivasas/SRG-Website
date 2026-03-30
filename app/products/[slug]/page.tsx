import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "../data";
import styles from "../detail.module.css";

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
    <main className={`${styles.pageShell} px-6 pb-20 pt-28 text-white sm:px-10 lg:px-20`}>
      <div className={styles.backdrop}>
        <video autoPlay loop muted playsInline className={styles.videoLayer}>
          <source
            src="/assets/7020050_Abstract_Background_3840x2160.mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.videoTint} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <Link
          href="/products"
          className={styles.backLink}
        >
          Back to products
        </Link>

        <section
          className={`${styles.glassPanel} mt-10 grid gap-8 px-6 py-8 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:px-10 lg:py-10`}
        >
          <div className="pr-0 lg:pr-8">
            <p className={`${styles.label} text-sm uppercase tracking-[0.32em]`}>
              {product.category}
            </p>
            <h1 className="mt-4 max-w-[10ch] text-[clamp(3.2rem,7vw,5.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white">
              {product.title}
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-white/72">
              {product.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className={styles.metaChip}>{product.client}</span>
              <span className={styles.metaChip}>{product.status}</span>
              <span className={styles.metaAccent}>{product.year}</span>
            </div>
          </div>

          <div className="border border-white/10 bg-white/6 p-5 backdrop-blur-sm sm:p-8">
            <div
              className={`${styles.heroMedia} flex min-h-[320px] items-center justify-center sm:min-h-[360px]`}
              style={{ backgroundImage: product.cover }}
            >
              <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-black/18 px-3 py-1 text-[0.7rem] uppercase tracking-[0.26em] text-white/78 backdrop-blur-sm">
                {product.eyebrow}
              </div>
              <div className="absolute right-6 top-6 text-[0.72rem] uppercase tracking-[0.3em] text-white/68">
                {product.year}
              </div>
              <div className={styles.heroMediaInner}>
                <div className={styles.floatingCard} />
                <div className={styles.floatingCardOffset} />
                <div className={styles.floatingCardWide} />
                <div className={styles.floatingPill} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.storyPanel} mt-10 px-6 py-6 lg:px-8 lg:py-8`}>
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
              <div
                className={`${styles.storyMedia} min-h-[260px] sm:min-h-[320px]`}
                style={{ backgroundImage: product.cover }}
              />
            </div>

            <div>
              <p className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold leading-tight tracking-[-0.05em] text-white">
                {product.storyTitle}
              </p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-white/72">
                {product.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className={`${styles.quoteBar} mt-8 pl-5`}>
                <p className={`${styles.label} text-sm uppercase tracking-[0.28em]`}>
                  Project Note
                </p>
                <p className="mt-4 max-w-[34rem] text-xl leading-relaxed text-white/84">
                  "{product.quote}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
            <div className={styles.videoFrame}>
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
              <div className="absolute left-5 top-5 rounded-full border border-white/24 bg-[#003951]/60 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[#FAD337] backdrop-blur-sm">
                Product motion preview
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-[clamp(2.4rem,5.4vw,4.6rem)] font-black uppercase leading-[0.92] tracking-[-0.07em] text-white">
            Why teams choose this product
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {product.benefits.map((benefit, index) => (
              <article key={benefit.title} className={`${styles.featureCard} p-6`}>
                <div
                  className={`${styles.featureVisual} flex h-36 items-center justify-center`}
                  style={{ backgroundImage: product.cover }}
                >
                  <span className="relative z-10 text-[3.6rem] font-extralight leading-none tracking-[-0.08em] text-[#FAD337]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight tracking-[-0.04em] text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/68">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-black uppercase leading-[0.92] tracking-[-0.07em] text-white">
            Certifications and readiness
          </h2>
          <div className={`${styles.logoStrip} mt-6 p-6`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.certifications.map((item, index) => (
                <div key={item} className={styles.logoTile}>
                  <span className="text-[3rem] font-extralight leading-none tracking-[-0.08em] text-[#FAD337]">
                    0{index + 1}
                  </span>
                  <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/72">
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
                className={`${styles.relatedCard} group p-4`}
              >
                <div
                  className={`${styles.relatedVisual} flex min-h-[220px] items-center justify-center`}
                  style={{ backgroundImage: item.cover }}
                />
                <div className="pt-4">
                  <p className="text-[1.9rem] font-bold leading-none tracking-[-0.05em] text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/55">
                    {item.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.ctaPanel} mt-16 px-6 py-14 text-center sm:px-10`}>
          <h2 className="text-[clamp(2.8rem,7vw,5.4rem)] font-black uppercase leading-[0.92] tracking-[-0.08em] text-white">
            Ready to build something better?
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] text-lg leading-relaxed text-white/68">
            Work with us to turn a strong idea into a product experience that
            feels focused, useful, and ready for real users.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className={styles.ctaButton}>
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
