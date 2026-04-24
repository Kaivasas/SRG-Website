import React from "react";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityClientLogo } from "@/app/types/sanity";
import ClientCarousel from "./ClientCarousel";
import Reveal from "@/app/components/Reveal";

const CLIENTS_QUERY = `*[_type == "clientLogo"] | order(_createdAt desc) {
  _id,
  name,
  "logo": logo.asset->url
}`;

export default async function ClientSection() {
  const clients = await sanityFetchSafe<SanityClientLogo[]>(CLIENTS_QUERY);
  if (!clients || clients.length === 0) return null;

  return (
    <section className="py-12 md:py-16 flex flex-col items-center z-10 relative">
      <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-lg tracking-wide">
        Brands Trust Our Solutions
      </h2>
      <Reveal delayMs={200} className="w-full flex flex-col items-center">
        <ClientCarousel clients={clients} />
      </Reveal>
    </section>
  );
}