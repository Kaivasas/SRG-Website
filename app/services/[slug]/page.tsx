import { client } from "@/sanity/lib/client";
import Link from "next/link";

// Import Components ที่เราเพิ่งหั่นไว้
import ServiceHero from "@/app/components/services/ServiceHero";
import WhyChooseUs from "@/app/components/services/WhyChooseUs";
import ServicePortfolio from "@/app/components/services/ServicePortfolio";
import ServiceCTA from "@/app/components/services/ServiceCTA";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `*[_type == "service" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    category,
    description,
    "heroImage": heroImage.asset->url,
    whyTitle,
    "benefitImage": benefitImage.asset->url,
    benefits,
    portfolios[]->{
      _id,
      title,
      "slug": slug.current,
      "image": thumbnail.asset->url
    }
  }`;

  const service = await client.fetch(query, { slug });

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center text-2xl bg-black text-white">ไม่พบบริการที่คุณค้นหา</div>;
  }

  return (
    <div className="bg-transparent min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Background Video (ปล่อยไว้ในหน้านี้ได้เลย) */}
      <div className="fixed inset-0 w-screen h-screen -z-10 bg-[#050505] overflow-hidden pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105 opacity-90">
          <source src="https://res.cloudinary.com/dix2vrg4g/video/upload/q_auto/f_auto/v1777283901/Videos-service-BG_cfbc21.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      {/* ประกอบร่าง Components! */}
      <ServiceHero service={service} />
      <WhyChooseUs service={service} />
      <ServicePortfolio service={service} />

      <ServiceCTA />
    </div>
  );
}