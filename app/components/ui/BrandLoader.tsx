export default function BrandLoader() {
  return (
    <div className="relative flex w-full max-w-5xl flex-col items-center">
      <div className="loading-aura absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#005a72]/18 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="mt-8 px-4">
          <h1 className="loading-wordmark text-[clamp(3.2rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-white">
            <span className="block">Sustain</span>
            <span className="block pr-[0.08em] bg-[linear-gradient(90deg,#005a72,#F48120)] bg-clip-text text-transparent">
              Republix
            </span>
            <span className="block text-white/74">Group</span>
          </h1>
        </div>

        <span className="loading-kicker mt-8 text-[0.76rem] font-bold uppercase tracking-[0.42em] text-[#FAD337]">
          Loading...
        </span>

        <div className="mt-8 flex items-center gap-4">
         
          <span className="loading-dot h-2.5 w-2.5 rounded-full bg-[#FAD337]" />
          <div className="relative h-px w-[min(52vw,16rem)] overflow-hidden bg-white/12">
            <div className="loading-line h-full w-1/3 bg-[linear-gradient(90deg,transparent,#FAD337,#F48120,transparent)]" />
          </div>
          <span className="loading-dot h-2.5 w-2.5 rounded-full bg-[#F48120]" />
        </div>

        <p className="loading-subtext mt-7 max-w-xl text-sm uppercase tracking-[0.26em] text-white/54 sm:text-[0.8rem]">
          Preparing strategy, design, digital growth
        </p>
      </div>
    </div>
  );
}
