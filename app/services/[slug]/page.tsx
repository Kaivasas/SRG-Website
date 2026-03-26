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
    return <div className="min-h-screen flex items-center justify-center text-2xl">ไม่พบบริการที่คุณค้นหา</div>;
  }

  // คำนวณว่าตอนนี้ควรโชว์การ์ดใบไหน (หาร 3 ส่วนเท่าๆ กัน)
  const totalCards = service.benefits.length;
  // Progress 0.0-0.33 = ใบที่ 1, 0.33-0.66 = ใบที่ 2, 0.66-1.0 = ใบที่ 3
  let activeCardIndex = Math.floor(whyScrollProgress * totalCards);
  if (activeCardIndex >= totalCards) {
    activeCardIndex = totalCards - 1; // กันไม่ให้ index เกิน
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans selection:bg-blue-500 selection:text-white">

      {/* ------------------------------------------------------------- */}
      {/* 1. Hero Section */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto min-h-[80vh] flex items-center">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full">
          <div className="w-full md:w-1/2 aspect-square md:aspect-4/3 bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative">
            <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900">
              {service.title}
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mb-6">
              {service.subtitle}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light border-l-4 border-gray-900 pl-6">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. Why Choose Us Section (Equal Distance Scroll) */}
      {/* ------------------------------------------------------------- */}
      {/* CHANGE: ปรับเป็น 300vh เพื่อให้พอดีกับ 3 การ์ด (การ์ดละ 100vh) */}
      <section
        ref={whySectionRef}
        className="relative bg-gray-50 border-y border-gray-200"
        style={{ height: `${service.benefits.length * 100}vh` }} // <--- บรรทัดนี้คือเวทมนตร์ครับ! การ์ด 5 ใบมันจะยาว 500vh ให้เอง
      >

        <div className="sticky top-0 h-screen flex flex-col pt-32 pb-16 overflow-hidden">

          <div className="w-full px-6 md:px-[10vw] mb-12 shrink-0">
            <h2 className="text-3xl md:text-5xl font-light text-gray-400">
              {service.whyTitle}
            </h2>
          </div>

          <div className="grow w-full px-6 md:px-[10vw] relative z-10 pb-12">

            {service.benefits.map((benefit, index) => {
              // ดึงค่ามาจากที่เราหารเป๊ะๆ ด้านบน
              const translateX = index <= activeCardIndex ? "0%" : "150vw";
              const shadowEffect = index > 0 ? "-30px 0 60px rgba(0,0,0,0.15)" : "0 20px 50px rgba(0,0,0,0.05)";
              const zIndex = index;

              return (
                <div
                  key={index}
                  className="absolute inset-x-6 md:inset-x-[10vw] top-0 bottom-12 bg-white rounded-4xl p-8 md:p-16 flex flex-col md:flex-row items-stretch gap-12 border border-gray-100 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    transform: `translateX(${translateX})`,
                    zIndex,
                    boxShadow: shadowEffect
                  }}
                >
                  <div className="w-full md:w-[45%] flex flex-col justify-center shrink-0">
                    <span className="text-6xl md:text-[8rem] font-black text-gray-100 mb-6 leading-none tracking-tight drop-shadow-sm">{benefit.id}</span>
                    <h4 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight tracking-tight">{benefit.title}</h4>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light border-l-4 border-gray-200 pl-6">{benefit.desc}</p>
                  </div>

                  <div className="grow w-full md:w-[55%] h-60 md:h-auto bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-100 shadow-inner">
                    <img
                      src={`https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80&sig=${index}`}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply"></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. Workflow Section */}
      {/* ------------------------------------------------------------- */}
      <section className="py-32 px-6 max-w-5xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-24">เราจะทำงานกันแบบไหน?</h2>
        <div className="flex flex-col pb-32">
          <div className="sticky top-[20vh] bg-white border border-gray-200 shadow-xl rounded-3xl p-10 md:p-16 mb-8 flex items-center gap-8 transition-all hover:shadow-2xl">
            <span className="text-6xl font-black text-blue-600">1.</span>
            <div>
              <h3 className="text-3xl font-bold mb-2">เก็บข้อมูลและศึกษาเป้าหมาย</h3>
              <p className="text-gray-500">พูดคุยรายละเอียด ทำความเข้าใจธุรกิจและกลุ่มเป้าหมายของคุณอย่างเจาะลึก</p>
            </div>
          </div>
          <div className="sticky top-[23vh] bg-gray-50 border border-gray-200 shadow-xl rounded-3xl p-10 md:p-16 mb-8 flex items-center gap-8 transition-all hover:shadow-2xl">
            <span className="text-6xl font-black text-[#F48120]">2.</span>
            <div>
              <h3 className="text-3xl font-bold mb-2">วางแผนการทำงานและคุยกับทีม</h3>
              <p className="text-gray-500">จัดทำแผนกลยุทธ์ (Strategy) และ Timeline ที่ชัดเจน พร้อมนำเสนอให้คุณพิจารณา</p>
            </div>
          </div>
          <div className="sticky top-[26vh] bg-white border border-gray-200 shadow-xl rounded-3xl p-10 md:p-16 mb-8 flex items-center gap-8 transition-all hover:shadow-2xl">
            <span className="text-6xl font-black text-gray-900">3.</span>
            <div>
              <h3 className="text-3xl font-bold mb-2">ลงมือทำตามแผนและเป้าหมาย</h3>
              <p className="text-gray-500">ทีมผู้เชี่ยวชาญเริ่มลงมือปฏิบัติงานตามแผนที่วางไว้ พร้อมอัปเดตความคืบหน้าอย่างใกล้ชิด</p>
            </div>
          </div>
          <div className="sticky top-[29vh] bg-gray-900 text-white shadow-xl rounded-3xl p-10 md:p-16 flex items-center gap-8 transition-all hover:shadow-2xl">
            <span className="text-6xl font-black text-blue-400">4.</span>
            <div>
              <h3 className="text-3xl font-bold mb-2">สรุปผล และ บำรุงรักษาระบบ</h3>
              <p className="text-gray-400">ส่งมอบงาน วัดผลลัพธ์ (KPIs) และให้บริการดูแลหลังการขายอย่างต่อเนื่อง</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. Portfolio Section */}
      {/* ------------------------------------------------------------- */}
      <section id="portfolios" className="py-24 relative z-10 bg-[#070707] border-y border-white/5 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 px-6 md:px-[10vw] w-full max-w-480 mx-auto relative z-10">
          {service.portfolios.map((port) => (
            <div key={port.id} className="w-full group cursor-pointer rounded-2xl bg-[#0a0f16] p-6 border border-white/5 transition hover:border-blue-500/30 hover:shadow-[0_20px_60px_-15px_rgba(30,144,255,0.15)] flex flex-col">
              <div className="aspect-video bg-gray-900 mb-6 overflow-hidden relative rounded-xl shrink-0">
                <img src={port.image} alt={`Portfolio ${port.id}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">View Details</span>
                </div>
              </div>
              <div className="grow flex flex-col justify-between">
                <h4 className="text-xl lg:text-2xl font-bold text-white mb-2 uppercase group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">Project Title 0{port.id}</h4>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-400 font-light uppercase text-xs tracking-widest line-clamp-1">{service.title}</p>
                </div>  
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. CTA Bottom */}
      {/* ------------------------------------------------------------- */}
      <section className="py-32 bg-gray-200 px-6">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">อยากเปลี่ยนแปลงและพัฒนา</h2>
          <p className="text-xl text-gray-600 mb-12">ร่วมมือไปกับเรา ก้าวไปกับเรา แล้วคุณจะไม่ผิดหวัง</p>
          <Link
            href="/contact"
            className="bg-white text-gray-900 font-bold py-5 px-16 rounded-full text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            ติดต่อเรา
          </Link>
        </div>
      </section>

    </div>
  );
}