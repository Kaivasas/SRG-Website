import Image from "next/image";
import Reveal from "../../Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProductBadgeItem } from "@/app/types/sanity";

function BadgeGrid({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: SanityProductBadgeItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(3,25,35,0.42)] px-5 py-6 sm:px-7 sm:py-8">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[0.74rem] font-bold uppercase tracking-[0.3em] text-[#F48120]">
            {eyebrow}
          </p>
          <h3 className="mt-3 text-[clamp(1.7rem,4vw,2.5rem)] font-black uppercase leading-[0.95] tracking-[-0.05em] text-white">
            {title}
          </h3>
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-[#F48120]/80 via-white/10 to-transparent" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article key={`${title}-${item.name}-${index}`} className="p-1">
            <div className="flex min-h-[13rem] items-center justify-center overflow-hidden bg-white/5 p-3 sm:min-h-[14rem]">
              {item.image ? (
                <div className="relative h-36 w-full sm:h-40">
                  <Image
                    src={urlFor(item.image).fit("max").url()}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-[3rem] font-extralight leading-none tracking-[-0.08em] text-[#FAD337]">
                  0{index + 1}
                </span>
              )}
            </div>
            <p className="mt-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-white/82 break-words">
              {item.name}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ProductCertifications({
  certifications,
  awards,
}: {
  certifications: SanityProductBadgeItem[];
  awards: SanityProductBadgeItem[];
}) {
  if (!certifications?.length && !awards?.length) return null;

  return (
    <Reveal className="mt-12" delayMs={100}>
      <section>
        <div className="mt-6 space-y-8">
          <BadgeGrid
            title="Certificates"
            eyebrow="Verified Standards"
            items={certifications ?? []}
          />
          <BadgeGrid
            title="Recognition & Awards"
            eyebrow="Product Achievements"
            items={awards ?? []}
          />
          </div>
      </section>
    </Reveal>
  );
}
