import React from "react";
import { client } from "@/sanity/lib/client";
import ClientCarousel from "./ClientCarousel";
import Reveal from "@/app/components/Reveal";

export default async function ClientSection() {
  const query = `*[_type == "clientLogo"] | order(_createdAt desc) {
    _id,
    name,
    "logo": logo.asset->url
  }`;
  const clients = await client.fetch(query);

  return (
    <section className="py-12 md:py-16 flex flex-col items-center z-10 relative">

      <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-lg tracking-wide">
        แบรนด์ที่ไว้วางใจกับทางเรา
      </h2>


      {/* 🌟 จุดที่แก้: เติม flex flex-col items-center เข้าไปตรงนี้ครับ */}
      <Reveal delayMs={200} className="w-full flex flex-col items-center">
        <ClientCarousel clients={clients} />
      </Reveal>
    </section>
  );
}