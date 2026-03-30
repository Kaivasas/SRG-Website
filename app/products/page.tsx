import Link from "next/link";
import { products } from "./data";
import styles from "./page.module.css";
import Reveal from "./Reveal";

export default function ProductsPage() {
  return (
    <main className={styles.pageShell}>
      <Reveal className={`${styles.reveal} relative mx-auto flex min-h-[78vh] w-full max-w-[1400px] items-center px-6 pb-20 pt-32 sm:px-10 lg:px-20`}>
        <div className="max-w-[1050px]">
          <span className={styles.kicker}>Innovation Portfolio</span>
          <div className="relative mt-6 inline-block">
            <h1 className="text-[clamp(4rem,10vw,8.2rem)] font-black uppercase leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.28)]">
              <span className="block">Future-Ready</span>
              <span className="block">Product Systems</span>
            </h1>
          </div>
          <p className="mt-6 max-w-[860px] text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-white/72">
            Explore a curated line-up of digital products shaped for real-world
            growth, sustainable operations, and more expressive brand
            experiences.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className={styles.primaryButton}>
              Start a Project
            </Link>
            <a href="#products-grid" className={styles.secondaryButton}>
              Browse Products
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal
        delayMs={80}
        className={`${styles.reveal} relative mx-auto w-full max-w-[1400px] px-6 pb-24 sm:px-10 lg:px-20`}
      >
        <section
        id="products-grid"
        className="relative"
      >
        <div className={styles.panelShell}>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className={styles.sectionEyebrow}>Selected Solutions</span>
              <h2 className="mt-3 text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-[-0.06em] text-white">
                Built To Move Brands Forward
              </h2>
            </div>
            <p className="max-w-[34rem] border-l-2 border-[#F48120] pl-4 text-base leading-relaxed text-white/64">
              Every product is presented as a launch-ready concept with clearer
              positioning, stronger storytelling, and a more premium visual
              rhythm that matches the rest of the site.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product, index) => (
              <Reveal
                key={product.slug}
                className={styles.productCard}
                delayMs={index * 90}
              >
                <Link href={`/products/${product.slug}`} className="block h-full w-full">
                  <div className={styles.cardNoise} />
                  <div
                    className={styles.cardBackdrop}
                    style={{ backgroundImage: product.cover }}
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardInner}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#FAD337]">
                          {product.eyebrow}
                        </p>
                        <h3 className="mt-3 text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white">
                          {product.title}
                        </h3>
                      </div>
                      <span className="text-xs uppercase tracking-[0.28em] text-white/48">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-4 max-w-[28rem] text-sm leading-relaxed text-white/70 sm:text-base">
                      {product.description}
                    </p>

                    <div className="mt-8 grid flex-1 grid-cols-2 gap-3 sm:max-w-[20rem]">
                      <div className={styles.mockTileLarge} />
                      <div className={styles.mockTileOffset} />
                      <div className={styles.mockTileWide} />
                      <div className={styles.mockTilePill} />
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-5">
                      <div className="flex flex-wrap gap-2">
                        <span className={styles.metaChip}>{product.client}</span>
                        <span className={styles.metaChip}>{product.status}</span>
                        <span className={styles.metaChipAccent}>{product.year}</span>
                      </div>
                      <span className={styles.cardLink}>
                        View Case Study
                        <span aria-hidden="true">+</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        </section>
      </Reveal>
    </main>
  );
}
