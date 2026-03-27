import { client } from "@/sanity/lib/client";
import ServiceDetailClient from "./ServiceDetailClient";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // ดึงข้อมูลบริการ + ดึงข้อมูลผลงาน (Works) ที่อ้างอิงไว้มาด้วย
  const query = `*[_type == "service" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    subtitle,
    description,
    "heroImage": heroImage.asset->url,
    whyTitle,
    benefits,
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

  // ส่งข้อมูลที่ดึงเสร็จแล้วไปให้ Client ทำแอนิเมชัน
  return <ServiceDetailClient service={service} />;
}