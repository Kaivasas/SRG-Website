import { client } from "@/sanity/lib/client";
import Link from "next/link";

// Import Components ที่เราเพิ่งหั่นไว้
import ServiceHero from "@/app/components/services/ServiceHero";
import WhyChooseUs from "@/app/components/services/WhyChooseUs";
import Workflow from "@/app/components/services/Workflow";
import ServicePortfolio from "@/app/components/services/ServicePortfolio";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `*[_type == "service" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    subtitle,
    description,
    "heroImage": heroImage.asset->url,
    whyTitle,
    benefits[]{
    title,
    desc,
    "image": image.asset->url
    },
    workflow,
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
          <source src="https://res.cloudinary.com/ducv7yo8h/video/upload/v1774499742/GettyImages-1310479626_ppyjhi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      {/* ประกอบร่าง Components! */}
      <ServiceHero service={service} />
      <WhyChooseUs service={service} />
      <Workflow service={service} />
      <ServicePortfolio service={service} />

      {/* CTA Bottom (โค้ดสั้นๆ แปะไว้ในนี้ได้เลยไม่ต้องแยก) */}
      <section className="py-32 px-6 bg-transparent relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl">อยากเปลี่ยนแปลงและพัฒนา</h2>
          <p className="text-xl text-white/80 mb-12 font-light drop-shadow-md">ร่วมมือไปกับเรา ก้าวไปกับเรา แล้วคุณจะไม่ผิดหวัง</p>
          <Link href="/contact" className="bg-white text-[#004965] font-black py-5 px-16 rounded-full text-xl shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all hover:bg-blue-50">
            ติดต่อเรา
          </Link>
        </div>
      </section>
    </div>
  );
}