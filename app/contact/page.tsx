import Link from "next/link";

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#F48120,#FAD337)] px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#003951] transition hover:-translate-y-0.5 hover:brightness-105";

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white/88 transition hover:-translate-y-0.5 hover:border-[#FAD337]/40 hover:text-[#FAD337]";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-clip bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.14),transparent_26%),radial-gradient(circle_at_85%_16%,rgba(0,90,114,0.18),transparent_26%),linear-gradient(180deg,#020d14_0%,#022331_34%,#003045_68%,#003951_100%)] text-white">
      <section className="relative min-h-[calc(100svh-96px)] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.28),rgba(0,0,0,0.1)),url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,13,20,0.26),rgba(2,13,20,0.72))]" />
        <div className="absolute left-[8%] top-[16%] h-24 w-24 rounded-full bg-[#FAD337]/12 blur-3xl" />
        <div className="absolute bottom-[18%] right-[10%] h-40 w-40 rounded-full bg-[#005a72]/22 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100svh-96px)] w-full max-w-[1600px] items-end px-6 pb-16 pt-36 sm:px-10 lg:px-16">
          <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-[900px]">
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.34em] text-[#FAD337]">
                Sustain Republix
              </p>
              <h1 className="mt-6 text-[clamp(4.2rem,11vw,9.6rem)] font-black uppercase leading-[0.86] tracking-[-0.08em]">
                Contact
                <span className="block bg-[linear-gradient(90deg,#005a72,#F48120)] bg-clip-text text-transparent">
                  The Team
                </span>
              </h1>
              <p className="mt-6 max-w-[42rem] border-l-[3px] border-[#FAD337] pl-5 text-lg leading-relaxed text-white/74 sm:text-xl">
                Tell us what you are building, where the friction is, and what
                kind of outcome you need. We will help shape the next step with
                clarity and momentum.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="mailto:hello@sustainrepublix.com" className={primaryButtonClass}>
                  Email Us
                </a>
                <a href="#visit-us" className={secondaryButtonClass}>
                  Visit Our Office
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#939598]">
                  Direct Line
                </p>
                <a
                  href="tel:+66917735563"
                  className="mt-3 inline-block text-[clamp(1.8rem,3vw,2.7rem)] font-light leading-none tracking-[-0.04em] text-white transition hover:text-[#FAD337]"
                >
                  +66 91 773 5563
                </a>
              </div>

              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#939598]">
                  Email
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href="mailto:arthit.p@sustain-republix.com"
                    className="block text-lg text-white/84 transition hover:text-[#F48120]"
                  >
                    hrm@sustain-republix.com
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#939598]">
                  Office Hours
                </p>
                <p className="mt-3 text-lg leading-relaxed text-white/74">
                  Monday to Friday
                  <span className="mx-3 text-[#F48120]">/</span>
                  09:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="visit-us"
        className="mx-auto grid w-full max-w-[1600px] gap-12 border-t border-white/10 px-6 py-20 sm:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:px-16"
      >
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.32em] text-[#FAD337]">
              Headquarters
            </p>
            <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,4.6rem)] font-black uppercase leading-[0.92] tracking-[-0.06em]">
              Samrong Nuea,
              <span className="block text-white/72">Samut Prakan</span>
            </h2>
          </div>

          <div className="space-y-8 border-l-[3px] border-[#005a72] pl-5">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#939598]">
                Address
              </p>
              <p className="mt-3 text-lg leading-relaxed text-white/78">
                Sustain Republix Group Co.,Ltd.
                <br />
                888 5th floor, VGR Building,
                <br />
                Samrong Nuea, Mueang Samut Prakan,
                <br />
                Samut Prakan 10270
              </p>
            </div>

            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#939598]">
                Best for
              </p>
              <p className="mt-3 text-lg leading-relaxed text-white/78">
                Discovery calls, partner meetings, strategic workshops, and
                product planning sessions.
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden border border-white/10 bg-[#003951]">
          {/* 🌟 เปลี่ยน src ใน iframe เป็นลิงก์ด้านล่างนี้ครับ */}
          <iframe
            src="https://maps.google.com/maps?q=Sustain+Republix+Group+Co.,Ltd.+Samut+Prakan&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 h-full w-full border-0 grayscale transition duration-700 hover:grayscale-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute left-6 top-6 inline-flex items-center gap-3 border border-white/15 bg-[#021118]/70 px-4 py-3 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FAD337] animate-pulse" />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-white">
              Visit us here
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
