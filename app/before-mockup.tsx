"use client"; // จำเป็นต้องใช้สำหรับ React Hooks ใน Next.js App Router

import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  // Hook สำหรับจัดการ Horizontal Scroll ในส่วน "โปรเจคของเรา"
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const [projectScrollProgress, setProjectScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!projectSectionRef.current) return;
      const { top, height } = projectSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // คำนวณเปอร์เซ็นต์การเลื่อน (0 ถึง 1) ภายใน Section โปรเจค
      const progress = -top / (height - windowHeight);
      setProjectScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // เรียกใช้ครั้งแรกเพื่อเซ็ตค่าเริ่มต้น
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-gray-900 font-sans">
      
      {/* 1. Video Background Loop (แสดงผลเต็มจอและอยู่หลังสุดตลอดเวลา) */}
      <div className="fixed inset-0 z-[-1] bg-gray-900">
        {/* ใส่ Source ของวิดีโอคุณที่นี่ */}
        {/* <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src="/your-video-bg.mp4" type="video/mp4" />
        </video> */}
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-bold tracking-widest border-4 border-white/10 m-8">
          [ GLOBAL VIDEO BACKGROUND LOOP ]
        </div>
      </div>

      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-8 py-4 flex justify-between items-center transition-all duration-300">
        <div className="text-xl font-bold">Logo or name</div>
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
          <li><a href="#services" className="hover:text-blue-600 transition">Service</a></li>
          <li><a href="#works" className="hover:text-blue-600 transition">Works</a></li>
          <li><a href="#contact" className="hover:text-blue-600 transition">Contact</a></li>
        </ul>
        <div className="text-sm font-bold bg-black text-white px-4 py-2 rounded-full">0123456789</div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center p-12 rounded-3xl">
          <h1 className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] font-black tracking-tighter uppercase leading-none text-white">
            WE FUEL
            GROWTH
          </h1>
        </div>
      </section>

      {/* Trusted Brands */}
      {/* ลบ bg-white/90, backdrop-blur-md และ border ออกตามที่ต้องการ */}
      <section className="py-24 flex flex-col items-center z-10 relative">
        {/* เปลี่ยนสีตัวหนังสือเป็นสีขาวและใส่เงา เพื่อให้อ่านออกเมื่อชนกับวิดีโอด้านหลัง */}
        <h2 className="text-3xl font-bold mb-10 text-white drop-shadow-lg">Brands That Trust Us</h2>
        
        {/* ปรับกล่อง Grid ให้มีความโปร่งใสเข้ากับพื้นหลัง */}
        <div className="w-full max-w-5xl bg-white/5 h-64 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
          <span className="text-4xl font-bold text-white/50">Slider / Logo Grid</span>
        </div>
        
        {/* ปรับจุดไข่ปลาให้เป็นสีที่เข้ากับธีมมืด */}
        <div className="flex space-x-3">
          {[1, 2, 3, 4].map((dot, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-white/30'}`}></div>
          ))}
        </div>
      </section>

      {/* 2. Services Section (Stacking Cards) */}
      <section id="services" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20 text-white drop-shadow-md">Our Services</h2>
          
          <div className="flex flex-col gap-6 pb-32">
            {/* Card 1 - ล็อคที่ 15vh */}
            <div className="sticky top-[15vh] bg-gray-800 text-white rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 md:mb-0">
                <h3 className="text-3xl font-bold mb-4">Service 1</h3>
                <p className="mb-6 text-gray-300 max-w-sm text-lg">A short description or supporting details about this service.</p>
                <a href="#" className="underline text-blue-400 font-medium">View More Details</a>
              </div>
              <div className="w-64 h-40 bg-black/50 rounded-2xl flex items-center justify-center border border-gray-600">
                <span className="text-3xl font-bold">X</span>
              </div>
            </div>

            {/* Card 2 - ล็อคที่ 18vh (ทับการ์ดแรกนิดๆ) */}
            <div className="sticky top-[18vh] bg-blue-900 text-white rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center shadow-2xl border border-blue-800 transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 md:mb-0">
                <h3 className="text-3xl font-bold mb-4">Service 2</h3>
                <p className="mb-6 text-gray-300 max-w-sm text-lg">A different description highlighting what makes the second service unique.</p>
                <a href="#" className="underline text-blue-300 font-medium">View More Details</a>
              </div>
              <div className="w-64 h-40 bg-black/50 rounded-2xl flex items-center justify-center border border-blue-700">
                <span className="text-3xl font-bold">X</span>
              </div>
            </div>

            {/* Card 3 - ล็อคที่ 21vh */}
            <div className="sticky top-[21vh] bg-white text-gray-900 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center shadow-2xl border border-gray-200 transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 md:mb-0">
                <h3 className="text-3xl font-bold mb-4">Service 3</h3>
                <p className="mb-6 text-gray-600 max-w-sm text-lg">A final service built to answer your business needs.</p>
                <a href="#" className="underline text-blue-600 font-medium">View More Details</a>
              </div>
              <div className="w-64 h-40 bg-gray-200 rounded-2xl flex items-center justify-center border border-gray-300">
                <span className="text-3xl font-bold text-gray-400">X</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects Section (Horizontal Scroll ล็อคหน้าจอ) */}
      {/* ความสูง 300vh คือระยะทางที่เราต้องไถลูกกลิ้งลงเพื่อให้กล่องเลื่อนไปทางซ้ายจนสุด */}
      <section id="works" ref={projectSectionRef} className="h-[300vh] relative bg-white/90 backdrop-blur-md">
        {/* กล่องนี้จะ Sticky ล็อคติดหน้าจอไว้ */}
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <h2 className="text-4xl font-bold text-center mb-16">Our Projects</h2>
          
          {/* ขยับกล่องแนวนอนตามค่าเปอร์เซ็นต์โปรเกรสการ Scroll */}
          {/* 50% หมายถึงให้เลื่อนซ้ายไปครึ่งนึงของความกว้างทั้งหมด (ปรับเลขได้ตามจำนวนการ์ด) */}
          <div 
            className="flex gap-10 px-[10vw] transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: `translateX(-${projectScrollProgress * 60}%)` }}
          >
            {/* Project Card 1 */}
            <div className="min-w-[400px] md:min-w-[500px] h-[500px] bg-gray-100 rounded-3xl flex flex-col p-8 shadow-xl flex-shrink-0 border border-gray-200">
              <p className="text-sm font-bold text-gray-500 mb-auto uppercase tracking-wider">Project 1 Brand</p>
              <div className="flex-grow flex items-center justify-center text-6xl font-black text-gray-300">X</div>
            </div>
            
            {/* Project Card 2 */}
            <div className="min-w-[400px] md:min-w-[500px] h-[500px] bg-gray-100 rounded-3xl flex flex-col p-8 shadow-xl flex-shrink-0 border border-gray-200">
              <p className="text-sm font-bold text-gray-500 mb-auto uppercase tracking-wider">Project 2 Brand</p>
              <div className="flex-grow flex items-center justify-center text-6xl font-black text-gray-300">X</div>
            </div>

            {/* Project Card 3 */}
            <div className="min-w-[400px] md:min-w-[500px] h-[500px] bg-gray-100 rounded-3xl flex flex-col p-8 shadow-xl flex-shrink-0 border border-gray-200">
              <p className="text-sm font-bold text-gray-500 mb-auto uppercase tracking-wider">Project 3 Brand</p>
              <div className="flex-grow flex items-center justify-center text-6xl font-black text-gray-300">X</div>
            </div>
            
            {/* Project Card 4 */}
            <div className="min-w-[400px] md:min-w-[500px] h-[500px] bg-gray-100 rounded-3xl flex flex-col p-8 shadow-xl flex-shrink-0 border border-gray-200">
              <p className="text-sm font-bold text-gray-500 mb-auto uppercase tracking-wider">Project 4 Brand</p>
              <div className="flex-grow flex items-center justify-center text-6xl font-black text-gray-300">X</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gray-50/95 backdrop-blur-sm flex flex-col items-center border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-16 text-center w-full max-w-5xl bg-gray-200 py-6 rounded-2xl">What Our Clients Say</h2>
        <div className="flex items-center justify-center space-x-8 w-full max-w-5xl relative h-80">
          <button className="z-10 text-5xl font-light hover:scale-110 transition hover:text-blue-600">&#8592;</button>
          
          <div className="z-10 bg-white w-[500px] p-12 flex flex-col items-center text-center shadow-2xl rounded-3xl border border-gray-100 relative">
            <div className="absolute -top-10 w-20 h-20 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg">X</div>
            <h4 className="font-bold text-xl mt-6 mb-4">Brand Name</h4>
            <p className="text-lg text-gray-600 mb-8 italic">"A sample testimonial about the experience, the quality of the service, and the real results delivered."</p>
            <div>
              <p className="font-bold">Reviewer Name</p>
              <p className="text-gray-500 text-sm">Job Title</p>
            </div>
          </div>

          <button className="z-10 text-5xl font-light hover:scale-110 transition hover:text-blue-600">&#8594;</button>
        </div>
      </section>

      {/* CTA & Footer */}
      <div className="bg-white/95 backdrop-blur-md relative z-10 border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <section id="contact" className="py-32 flex flex-col items-center text-center px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Grow and Transform?</h2>
          <p className="text-xl text-gray-600 mb-12">Work with us, move forward with confidence, and build something meaningful together.</p>
          <button className="bg-black text-white font-bold py-5 px-16 rounded-full text-xl shadow-2xl hover:bg-blue-600 hover:shadow-blue-500/30 transform transition hover:-translate-y-2">
            Contact Us
          </button>
        </section>

        <footer className="bg-gray-100 py-20 px-10 md:px-24 flex flex-col md:flex-row justify-between border-t border-gray-200">
          <div className="mb-12 md:mb-0">
            <h2 className="text-4xl font-bold mb-8">Logo or name</h2>
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl hover:scale-110 transition cursor-pointer">f</div>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold text-xl hover:scale-110 transition cursor-pointer">in</div>
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl hover:scale-110 transition cursor-pointer">d</div>
            </div>
          </div>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-8">We'd Love to Hear From You</h2>
            <p className="mb-8 font-bold text-xl">Test@gmail.com</p>
            <p className="text-base leading-relaxed text-gray-600">
              Sustain Republix Group Co.,Ltd.,<br />
              Sridan 18 Alley, Samrong Nuea,<br />
              Mueang Samut Prakan District,<br />
              Samut Prakan 10270
            </p>
          </div>
        </footer>
      </div>

    </div>
  );
}
