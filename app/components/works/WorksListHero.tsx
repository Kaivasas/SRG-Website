import React from "react";

export default function WorksHero() {
  return (
    <section className="relative min-h-[50vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-48">
      <div className="max-w-screen-2xl mx-auto w-full">
        <h1 className="text-[12vw] md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase mb-6">
          Selected <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004965] to-[#005a72]">Works.</span>
        </h1>
        
        <div className="w-full h-[1px] bg-white/10 mt-16 mb-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-lg md:text-xl text-[#939598] max-w-2xl font-light tracking-wide">
            Empowering your business with integrated solutions designed for sustainable growth and tangible results.
          </p>
          <span className="text-sm font-bold uppercase tracking-widest text-[#F48120]">Sustain Republix</span>
        </div>
      </div>
    </section>
  );
}