import Link from "next/link";
import Reveal from "../../Reveal";

const glassPanelClass = "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";

export default function ProductCTA() {
  return (
    <Reveal className="mt-16" delayMs={140}>
      <section className={`${glassPanelClass} px-6 py-14 text-center sm:px-10`}>
        <h2 className="text-[clamp(2.8rem,7vw,5.4rem)] font-black uppercase leading-[0.92] tracking-[-0.08em] text-white">
          Ready to build something better?
        </h2>
        <p className="mx-auto mt-4 max-w-[40rem] text-lg leading-relaxed text-white/68">
          Work with us to turn a strong idea into a product experience that feels focused, useful, and ready for real users.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/contact" className="inline-flex min-w-[18rem] items-center justify-center rounded-full bg-[linear-gradient(90deg,#f48120,#fad337)] px-8 py-4 text-base font-bold uppercase tracking-[0.16em] text-[#003951] transition hover:-translate-y-0.5 hover:brightness-105">
            Contact us
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
