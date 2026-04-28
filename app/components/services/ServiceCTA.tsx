import React from "react";
import Link from "next/link";

export default function ServiceCTA() {
  return (
    <section className="py-32 px-6 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl">
          Want to develop and improve?
        </h2>
        <p className="text-xl text-white/80 mb-12 font-light drop-shadow-md">
          Let's work together and move forward together, and you won't be disappointed
        </p>
        <Link
          href="/contact"
          className="bg-white text-[#004965] font-black py-5 px-16 rounded-full text-xl shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all hover:bg-blue-50"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}