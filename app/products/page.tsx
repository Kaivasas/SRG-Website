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
                className="group relative flex min-h-[350px] overflow-hidden bg-[#f4f4f4] p-5 text-black transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:min-h-[380px] sm:p-6"
              >
                <div className="flex h-full w-full flex-col">
                  <div>
                    <p className="text-[clamp(1.4rem,2.2vw,2rem)] font-medium leading-none tracking-[-0.04em]">
                      {product.title}
                    </p>
                    <p className="mt-2 max-w-[18rem] text-xs text-black/55 sm:text-sm">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="relative mt-8 flex flex-1 items-center justify-center overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80 transition duration-500 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_48%)] opacity-90" />
                    <span className="relative text-[4.5rem] font-extralight leading-none tracking-[-0.08em] transition duration-500 group-hover:scale-90 group-hover:opacity-30 sm:text-[5.5rem]">
                      X
                    </span>
                    <span className="absolute left-4 top-4 text-[0.65rem] uppercase tracking-[0.3em] text-black/35">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-white/88 p-5 backdrop-blur-sm transition duration-500 group-hover:translate-y-0">
                    <p className="text-sm leading-relaxed text-black/72">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.24em] text-black/45">
                      <span>{product.category}</span>
                      <span>Open Project</span>
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

function SocialIcon({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`${styles.socialIcon} ${
        dark ? styles.socialIconDark : styles.socialIconBlue
      }`}
    >
      {label}
    </span>
  );
}
