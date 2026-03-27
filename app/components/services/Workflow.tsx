import React from "react";

export default function Workflow({ service }: { service: any }) {
  if (!service.workflow || service.workflow.length === 0) return null;

  return (
    <section className="py-32 px-6 max-w-5xl mx-auto relative z-10 bg-transparent">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 text-white drop-shadow-2xl">เราจะทำงานกันแบบไหน?</h2>
      <div className="flex flex-col pb-32">
        {service.workflow.map((item: any, index: number) => (
          <div key={index} className={`sticky ${item.top} ${item.isDark ? 'bg-black/60' : 'bg-white/5'} backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-10 md:p-16 mb-8 flex items-center gap-8 transition-all hover:bg-white/10 hover:border-white/30`}>
            <span className={`text-6xl font-black ${item.color}`}>{item.step}.</span>
            <div>
              <h3 className="text-3xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-white/80 font-light">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}