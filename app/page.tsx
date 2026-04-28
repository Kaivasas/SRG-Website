import React from "react";

import BlurredBackground from "./components/home/BlurredBackground";
import HeroSection from "./components/home/HeroSection";
import ClientSection from "./components/home/ClientSection";
import ServiceSection from "./components/home/ServiceSection";
import ProductsSection from "./components/home/ProductsSection";
import WorksSection from "./components/home/WorksSection";
import TestimonialSection from "./components/home/TestimonialSection";
import CtaSection from "./components/home/CtaSection";

export default async function Home() {
  return (
    <div className="relative min-h-screen text-gray-900 font-sans">
      <BlurredBackground />
      <HeroSection />
      <ClientSection />
      <ServiceSection />
      <ProductsSection />
      <WorksSection />
      <TestimonialSection />
      <CtaSection />
    </div>
  );
}