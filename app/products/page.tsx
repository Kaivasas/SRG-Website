import Link from "next/link";
import { products } from "./data";
import styles from "./page.module.css";

export default function ProductsPage() {
  return (
    <main className="bg-[#d9d9d9] text-black">
      <section className="mx-auto flex min-h-[68vh] w-full max-w-[1400px] items-center px-6 pb-16 pt-28 sm:px-10 lg:px-20">
        <div className="max-w-[980px]">
          <div className="relative inline-block">
            <h1 className="text-[clamp(4rem,10vw,8rem)] font-light leading-[0.92] tracking-[-0.06em]">
              <span className="block">Pure Intent</span>
              <span className="relative block">
                Exceptional Craft
                <span
                  className={`${styles.heroMark} ${styles.heroMarkLeft}`}
                  aria-hidden="true"
                />
                <span
                  className={`${styles.heroMark} ${styles.heroMarkRight}`}
                  aria-hidden="true"
                />
                <span className={styles.heroLine} aria-hidden="true" />
              </span>
            </h1>
          </div>
          <p className="mt-5 max-w-[940px] text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-black/80">
            A curated selection of technical challenges solved and visions
            brought to life.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 pb-24 sm:px-10 lg:px-20">
        <div className="bg-[#d4d4d4] p-5 sm:p-8 lg:p-12">
          <div className="grid gap-5 md:grid-cols-2 lg:gap-8">
            {products.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative flex min-h-[350px] overflow-hidden bg-[#f4f4f4] text-black transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:min-h-[380px]"
              >
                <div
                  className="absolute inset-0 transition duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: product.cover }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_34%)] opacity-90 transition duration-700 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_40%,rgba(0,0,0,0.28)_100%)]" />

                <div className="relative flex h-full w-full flex-col p-5 sm:p-6">
                  <div className="relative z-10">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/72">
                      {product.eyebrow}
                    </p>
                    <p className="mt-3 text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none tracking-[-0.04em] text-white">
                      {product.title}
                    </p>
                    <p className="mt-2 max-w-[18rem] text-xs text-white/76 sm:text-sm">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="relative flex flex-1 items-center justify-center">
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/58">
                      0{index + 1}
                      <span>{product.year}</span>
                    </div>
                    <div className="grid w-full max-w-[18rem] grid-cols-2 gap-3 opacity-90 transition duration-500 group-hover:scale-[0.98] group-hover:opacity-55">
                      <div className="h-24 rounded-[1.25rem] border border-white/24 bg-white/14 backdrop-blur-[2px]" />
                      <div className="mt-10 h-28 rounded-[1.25rem] border border-white/18 bg-black/18" />
                      <div className="-mt-6 h-20 rounded-[1.25rem] border border-white/16 bg-white/10" />
                      <div className="h-16 rounded-[999px] border border-white/14 bg-white/8" />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-full bg-white/88 p-5 backdrop-blur-sm transition duration-500 group-hover:translate-y-0">
                    <p className="text-sm leading-relaxed text-black/72">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-black/45">
                      <span>{product.client}</span>
                      <span>{product.status}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
