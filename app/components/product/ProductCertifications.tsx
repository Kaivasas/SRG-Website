import Reveal from "../Reveal";

const glassPanelClass = "relative z-10 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03)),rgba(3,25,35,0.6)] shadow-[0_18px_46px_rgba(0,0,0,0.18)]";

export default function ProductCertifications({ certifications }: { certifications: string[] }) {
  if (!certifications?.length) return null;

  return (
    <Reveal className="mt-12" delayMs={100}>
      <section>
        <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-black uppercase leading-[0.92] tracking-[-0.07em] text-white">
          Certifications and readiness
        </h2>
        <div className={`${glassPanelClass} mt-6 p-6`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((item: string, index: number) => (
              <div key={index} className="flex min-h-[10rem] flex-col items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),rgba(255,255,255,0.04)] text-center transition duration-300 hover:-translate-y-1">
                <span className="text-[3rem] font-extralight leading-none tracking-[-0.08em] text-[#FAD337]">
                  0{index + 1}
                </span>
                <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}