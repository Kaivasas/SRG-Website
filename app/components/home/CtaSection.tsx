import React from "react";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";

export default function CtaSection() {
  return (
    <div className="relative z-10">
      <section id="contact" className="py-16 md:py-24 flex flex-col items-center text-center px-6">
        <Reveal delayMs={0}>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-lg">
            พร้อมที่จะเติบโตไปกับเรา?
          </h2>
        </Reveal>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl font-light tracking-wide">
          ร่วมมือไปกับเรา ก้าวไปกับเรา ให้เราเป็นส่วนหนึ่งในการขับเคลื่อนธุรกิจของคุณให้ประสบความสำเร็จ
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#004965] text-white font-bold py-5 px-16 rounded-full text-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-black hover:shadow-xl transform transition hover:-translate-y-2"
        >
          ติดต่อเราเลยตอนนี้
        </Link>
      </section>
    </div>
  );
}