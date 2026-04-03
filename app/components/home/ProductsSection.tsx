import React from "react";
import Reveal from "@/app/components/Reveal";
import Image from "next/image";
import Link from "next/link"; // 🌟 นำเข้า Link สำหรับกดไปหน้าอื่น

// 🌟 นำเข้า Sanity Client และ urlFor
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// 🌟 เปลี่ยน Component ให้เป็น async เพื่อ Fetch ข้อมูล
export default async function ProductsSection() {

  // 🌟 ใช้ coalesce เพื่อจัดการค่าว่าง (null) ให้เป็น false ก่อนนำไปเรียง
  // และใช้ _updatedAt เพื่อให้ "แก้ล่าสุด" มีผลต่อลำดับภายในกลุ่ม
  const query = `*[_type == "product"] | order(coalesce(isFeatured, false) desc, _updatedAt desc)[0...3] {
  title,
  "slug": slug.current,
  description,
  thumbnail,
  isFeatured
}`;
  try {
    const products = await client.fetch(query);

    // สีของลิงก์ที่วนลูปไปเรื่อยๆ (ฟ้า -> ส้ม -> เขียว) เพื่อให้เหมือนดีไซน์เดิม
    const linkColors = [
      "text-blue-400 hover:text-blue-300",
      "text-[#F48120] hover:text-orange-300",
      "text-green-400 hover:text-green-300"
    ];

    return (
      <section id="products" className="py-16 md:py-20 relative z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">

          {/* หัวข้อ Section */}
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Reveal delayMs={0}>
              <div>
                <span className="text-blue-500 font-bold uppercase tracking-widest block mb-4 text-sm">Innovation</span>
                <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-md">Our Products</h2>
              </div>
            </Reveal>
            <p className="max-w-md text-gray-300 text-lg font-light tracking-wide leading-relaxed border-l-[3px] border-[#F48120] pl-4">
              นวัตกรรมและโซลูชันพร้อมใช้งานที่เราพัฒนาขึ้นมาเพื่อตอบสนองความต้องการในยุคดิจิทัล
            </p>
          </div>

          <div className="flex flex-col border border-white/10 bg-black shadow-2xl">

            {/* 🌟 วนลูปสร้างการ์ด Product อัตโนมัติ */}
            {products.map((product: any, index: number) => {
              // เช็คว่าเป็นเลขคู่หรือคี่ เพื่อสลับ Layout ซ้าย/ขวา
              const isEven = index % 2 === 0;
              const colorClass = linkColors[index % linkColors.length];

              return (
                <Reveal key={product.slug} delayMs={index * 100 + 100}>
                  {/* สลับ flex-row และ flex-row-reverse อัตโนมัติ */}
                  <div className={`group flex flex-col items-stretch min-h-100 border-b border-white/10 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors duration-500 hover:bg-white/5">
                      {/* เลขขนาดใหญ่ (01, 02, 03) */}
                      <span className="absolute -left-4 -top-10 text-[10rem] font-black text-white/5 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                        0{index + 1}
                      </span>

                      <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide break-words">
                          {product.title}
                        </h3>
                        <p className="mb-8 text-gray-400 text-lg leading-relaxed font-light break-words whitespace-pre-wrap">
                          {product.longDescription}
                        </p>

                        {/* ลิงก์ไปยังหน้า Product Detail */}
                        <Link
                          href={`/products/${product.slug}`}
                          className={`inline-flex items-center gap-4 font-bold uppercase tracking-wider group/link transition-colors ${colorClass}`}
                        >
                          ดูรายละเอียด <span className="transform group-hover/link:translate-x-2 transition-transform">&rarr;</span>
                        </Link>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 relative bg-gray-900 min-h-[300px] md:min-h-75 overflow-hidden">
                      {/* ดึงรูป thumbnail จาก Sanity */}
                      {product.thumbnail && (
                        <Image
                          src={urlFor(product.thumbnail).url()}
                          alt={product.title}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                      )}
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* 🌟 กดปุ่มนี้แล้วไปหน้า Products รวม */}
          <div className="flex justify-center mt-12 md:mt-16">
            <Link href="/products" className="bg-transparent border border-white/30 text-white font-bold py-4 px-12 md:py-4 md:px-16 rounded-full text-sm tracking-widest uppercase hover:bg-white hover:text-black transition duration-300">
              View All Products
            </Link>
          </div>

        </div>
      </section>
    );
  } catch (error) {
    // 🌟 ถ้า Sanity ล่ม หรือเน็ตหลุด จะเข้าเงื่อนไขนี้
    console.error("🔥 Sanity Error in ProductsSection:", error);

    // คืนค่า null เพื่อให้ Section นี้ซ่อนตัวไปเงียบๆ เว็บส่วนอื่นจะได้ทำงานต่อได้
    return null;
  }
}