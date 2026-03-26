"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { servicesData } from "@/app/data/servicesData";

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const service = servicesData[slug as keyof typeof servicesData];

  // -------------------------------------------------------------
  // ระบบ Scroll Progress (หารระยะเลื่อนให้เท่ากันเป๊ะ)
  // -------------------------------------------------------------
  const whySectionRef = useRef<HTMLDivElement>(null);
  const [whyScrollProgress, setWhyScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (whySectionRef.current) {
        const { top, height } = whySectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // คำนวณเป็นเปอร์เซ็นต์ (0.0 ถึง 1.0)
        const progress = -top / (height - windowHeight);
        setWhyScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center text-2xl bg-black text-white">ไม่พบบริการที่คุณค้นหา</div>;
  }

  // คำนวณว่าตอนนี้ควรโชว์การ์ดใบไหน (หาร 3 ส่วนเท่าๆ กัน)
  const totalCards = service.benefits.length;
  let activeCardIndex = Math.floor(whyScrollProgress * totalCards);
  if (activeCardIndex >= totalCards) {
    activeCardIndex = totalCards - 1;
  }

  return (
    // THE FIX: เอา relative และ z-10 ออกจากกล่องนอกสุด เพื่อไม่ให้มันไปกดทับ Footer
    <div className="bg-transparent min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white">

      {/* ------------------------------------------------------------- */}
      {/* THE FIX: ปรับ z-index เป็นติดลบเยอะๆ (z-[-10]) และเพิ่ม pointer-events-none */}
      {/* เพื่อให้วิดีโอมุดลงไปอยู่ล่างสุดของเว็บ และไม่ขัดขวางการคลิกใดๆ */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed inset-0 w-screen h-screen -z-10 bg-[#050505] overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-50"
        >
          <source src="https://res.cloudinary.com/ducv7yo8h/video/upload/v1774496170/7020050_Abstract_Background_3840x2160_lzpmkg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Section */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto min-h-[80vh] flex items-center relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full">
          <div className="w-full md:w-1/2 aspect-square md:aspect-4/3 bg-gray-900 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10 relative group">
            <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent pointer-events-none"></div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
              {service.title}
            </h1>
            <p className="text-2xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-[#F48120] font-bold mb-6">
              {service.subtitle}
            </p>
            <p className="text-lg text-white/80 leading-relaxed font-light border-l-4 border-blue-500 pl-6">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. Why Choose Us Section (Equal Distance Scroll + Glassmorphism) */}
      {/* ------------------------------------------------------------- */}
      <section ref={whySectionRef} className="relative bg-transparent" style={{ height: `${service.benefits.length * 100}vh` }}>

        <div className="sticky top-0 h-screen flex flex-col pt-32 pb-16 overflow-hidden">

          <div className="w-full px-6 md:px-[10vw] mb-12 shrink-0 relative z-10">
            <h2 className="text-3xl md:text-5xl font-light text-white/60 drop-shadow-lg">
              {service.whyTitle}
            </h2>
          </div>

          <div className="grow w-full px-6 md:px-[10vw] relative z-20 pb-12">

            {service.benefits.map((benefit, index) => {
              const translateX = index <= activeCardIndex ? "0%" : "150vw";
              const zIndex = index;

              return (
                <div
                  key={index}
                  className="absolute inset-x-6 md:inset-x-[10vw] top-0 bottom-12 bg-white/5 backdrop-blur-2xl rounded-4xl p-8 md:p-16 flex flex-col md:flex-row items-stretch gap-12 border border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  style={{
                    transform: `translateX(${translateX})`,
                    zIndex,
                  }}
                >
                  <div className="w-full md:w-[45%] flex flex-col justify-center shrink-0">
                    <span className="text-6xl md:text-[8rem] font-black text-white/10 mb-6 leading-none tracking-tight drop-shadow-md">{benefit.id}</span>
                    <h4 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight tracking-tight drop-shadow-md">{benefit.title}</h4>
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light border-l-4 border-blue-500 pl-6">{benefit.desc}</p>
                  </div>

                  <div className="grow w-full md:w-[55%] h-60 md:h-auto bg-black/50 rounded-3xl overflow-hidden relative border border-white/5 shadow-inner">
                    <img
                      src={`https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80&sig=${index}`}
                      alt={benefit.title}
                      className="w-full h-full object-cover grayscale opacity-80"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. Workflow Section (Dynamic Mode) */}
      {/* ------------------------------------------------------------- */}
      {/* ตรวจสอบก่อนว่า Service นี้มีข้อมูล workflow หรือไม่ */}
      {service.workflow && service.workflow.length > 0 && (
        <section className="py-32 px-6 max-w-5xl mx-auto relative z-10 bg-transparent">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 text-white drop-shadow-2xl">เราจะทำงานกันแบบไหน?</h2>
          <div className="flex flex-col pb-32">
            {/* วนลูปสร้างการ์ด Workflow */}
            {service.workflow.map((item, index) => (
              <div
                key={index}
                className={`sticky ${item.top} ${item.isDark ? 'bg-black/60' : 'bg-white/5'} backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-10 md:p-16 mb-8 flex items-center gap-8 transition-all hover:bg-white/10 hover:border-white/30`}
              >
                <span className={`text-6xl font-black ${item.color}`}>{item.step}.</span>
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-white/80 font-light">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. Portfolio Section */}
      {/* ------------------------------------------------------------- */}
      <section id="portfolios" className="py-24 relative z-10 bg-transparent overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-6 md:px-[10vw] w-full max-w-480 mx-auto relative z-10">
          {service.portfolios.map((port) => (
            <div key={port.id} className="w-full group cursor-pointer rounded-2xl bg-white/5 backdrop-blur-xl p-6 border border-white/10 transition hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_20px_60px_-15px_rgba(30,144,255,0.3)] flex flex-col shadow-inner shadow-white/5">
              <div className="aspect-video bg-black/50 mb-6 overflow-hidden relative rounded-xl shrink-0">
                <img src={port.image} alt={`Portfolio ${port.id}`} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">View Details</span>
                </div>
              </div>
              <div className="grow flex flex-col justify-between">
                <h4 className="text-xl lg:text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">Project Title 0{port.id}</h4>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-white/60 font-light uppercase text-xs tracking-widest line-clamp-1">{service.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. CTA Bottom */}
      {/* ------------------------------------------------------------- */}
      <section className="py-32 px-6 bg-transparent relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl">อยากเปลี่ยนแปลงและพัฒนา</h2>
          <p className="text-xl text-white/80 mb-12 font-light drop-shadow-md">ร่วมมือไปกับเรา ก้าวไปกับเรา แล้วคุณจะไม่ผิดหวัง</p>
          <Link
            href="/contact"
            className="bg-white text-[#004965] font-black py-5 px-16 rounded-full text-xl shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] hover:scale-105 transition-all hover:bg-blue-50"
          >
            ติดต่อเรา
          </Link>
        </div>
      </section>

    </div>
  );
}