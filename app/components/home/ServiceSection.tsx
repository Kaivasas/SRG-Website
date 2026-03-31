"use client";
import React, { useEffect, useRef, useState } from "react";
import Reveal from "@/app/components/Reveal";
import Image from "next/image";

export default function ServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  // 🌟 ฟังก์ชันคำนวณความคืบหน้าของการ Scroll (จาก 0 ถึง 1)
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // คำนวณระยะทางทั้งหมดที่ Section นี้สามารถ Scroll ได้
        const scrollableDistance = height - windowHeight;
        // progress จะเป็น 0 ตอนเริ่มเข้า Section และเป็น 1 ตอนจบ Section
        const progress = -top / scrollableDistance;
        setScrollYProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ข้อมูลการ์ดทั้ง 3 ใบ
  const services = [
    {
      id: "01 / Marketing",
      title: "Digital Marketing",
      desc: "ยกระดับแบรนด์ของคุณด้วยกลยุทธ์การตลาดออนไลน์ที่วัดผลได้จริง เข้าถึงกลุ่มเป้าหมายอย่างแม่นยำและยั่งยืน",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      bgClass: "from-[#002a3a]/90 to-black/90",
      overlayClass: "bg-blue-500/20",
    },
    {
      id: "02 / Development",
      title: "Web & App Dev",
      desc: "ออกแบบและพัฒนาเว็บไซต์และแอปพลิเคชันที่ทันสมัย ใช้งานง่าย ตอบโจทย์ทุกธุรกิจของคุณด้วยเทคโนโลยีล่าสุด",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      bgClass: "from-[#001f2b]/95 to-black/95",
      overlayClass: "bg-blue-500/20",
    },
    {
      id: "03 / Strategy",
      title: "Brand Strategy",
      desc: "สร้างตัวตนของแบรนด์ให้แข็งแกร่งและเป็นที่จดจำ พร้อมเติบโตอย่างยั่งยืนในระยะยาวท่ามกลางการแข่งขัน",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      bgClass: "from-black to-gray-900",
      overlayClass: "bg-gray-500/20",
    }
  ];

  const totalCards = services.length;
  // 🌟 หัวใจหลักของคณิตศาสตร์: แบ่งช่วงการ Scroll ตามจำนวนการ์ด
  // ถ้ามี 3 ใบ segment จะวิ่งจาก 0 ไปถึง 2
  const segment = scrollYProgress * (totalCards - 1);

  return (
    // 🌟 1. กำหนดความสูงให้ Section นี้ = (จำนวนการ์ด * 100vh) เพื่อสร้างพื้นที่สำหรับการ Scroll
    <section id="services" ref={sectionRef} className="relative z-10" style={{ height: `${totalCards * 100}vh` }}>
      
      {/* 🌟 2. ถังหลักที่ติดหนึบ (Sticky) อยู่บนหน้าจอ */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-6 overflow-hidden">
        
        <div className="max-w-5xl mx-auto w-full relative z-20">
          
          {/* หัวข้อ Section (อยู่นิ่งๆ ด้านบนเสมอ) */}
          <div className="text-center mb-10 md:mb-16 relative">
            <Reveal delayMs={0}>
              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-2xl">our services</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-6"></div>
            </Reveal>
          </div>

          {/* คอนเทนเนอร์ที่เก็บการ์ดทั้งหมด (ซ้อนกันอยู่ตรงกลาง) */}
          <div className="relative w-full h-[65vh] md:h-[60vh]">
            {services.map((svc, index) => {
              
              let translateY = 0;
              let scale = 1;
              let opacity = 1;
              let brightness = 1;

              // 🌟 3. คำนวณสถานะของการ์ดแต่ละใบตามระยะ Scroll
              if (segment < index) {
                // กรณีที่ 1: การ์ดที่กำลังจะเลื่อนขึ้นมา (ยังไม่ถึงคิว)
                // ดันลงไปอยู่ด้านล่างหน้าจอ (100vh) แล้วค่อยๆ เลื่อนขึ้นมาหา 0
                translateY = (index - segment) * 100;
              } else {
                // กรณีที่ 2: การ์ดที่อยู่ตรงกลางแล้ว (กำลังโดนใบอื่นทับ)
                // หดขนาดลง มืดลง และจางลงตามระยะที่โดนทับ
                const past = segment - index; // ตัวเลขวิ่งจาก 0 -> 1 -> 2
                scale = 1 - (past * 0.05); // หดลงเรื่อยๆ (เช่น 1 -> 0.95 -> 0.90)
                opacity = 1 - (past * 1); // จางลง
                brightness = 1 - (past * 0.2); // มืดลง
              }

              // จัดการเงา: ทิ้งเงาเฉพาะตอนอยู่บนสุด ถ้าโดนทับปุ๊บ (past > 0.1) ให้ตัดเงาทิ้งเลย
              const isCovered = segment - index > 0.1;
              const shadowClass = isCovered 
                ? "shadow-none border-white/5" 
                : "shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border-white/20";

              return (
                <div 
                  key={index}
                  className="absolute inset-0 w-full h-full will-change-transform"
                  style={{ 
                    // 🌟 4. ผูกค่าคณิตศาสตร์เข้ากับ CSS Transform โดยตรง
                    transform: `translateY(${translateY}vh) scale(${scale})`, 
                    opacity: opacity,
                    zIndex: index, // เรียงเลเยอร์ 0, 1, 2 ตามลำดับ
                    filter: `brightness(${brightness})`,
                  }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${svc.bgClass} backdrop-blur-xl text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center border transition-all duration-300 ${shadowClass}`}>
                    
                    {/* เนื้อหาด้านซ้าย */}
                    <div className="mb-8 md:mb-0 md:pr-12 w-full md:w-1/2">
                      <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">{svc.id}</span>
                      <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{svc.title}</h3>
                      <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 line-clamp-3 md:line-clamp-none">{svc.desc}</p>
                      <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition duration-300 font-semibold text-sm tracking-wide uppercase">Discover More</button>
                    </div>
                    
                    {/* รูปภาพด้านขวา */}
                    <div className="w-full md:w-1/2 h-48 md:h-full rounded-3xl overflow-hidden relative group shrink-0">
                      <div className={`absolute inset-0 ${svc.overlayClass} group-hover:bg-transparent transition duration-500 z-10`}></div>
                      <Image 
                        src={svc.image} 
                        alt={svc.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                        className="object-cover group-hover:scale-110 transition duration-700" 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}