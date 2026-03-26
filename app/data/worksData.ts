// 1. สร้าง Interface กำหนดโครงสร้างข้อมูล (ใส่ ? เพื่อบอกว่าข้อมูลนี้อาจจะไม่มีก็ได้)
export interface Work {
  slug: string;
  title: string;
  tags: string[];
  thumbnail: string;
  client: string;
  year: string;
  description?: string; // มีหรือไม่มีก็ได้
  shortDesc?: string;   // มีหรือไม่มีก็ได้
  heroMedia?: string;
  beforeAfter?: {
    before: string;
    after: string;
  };
  stickySections?: {
    id: string;
    title: string;
    content: string[];
    image: string;
  }[];
  gallery?: string[];
  metrics?: {
    value: string;
    label: string;
  }[];
}

// 2. ใส่ Type ": Work[]" ให้กับตัวแปร worksData
export const worksData: Work[] = [
  {
    slug: "techvision-ecommerce",
    title: "TechVision E-Commerce",
    tags: ["Creative", "SEO", "Development"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    client: "TechVision Corp.",
    year: "2024",
    shortDesc: "บอกเล่าสั้นๆ แบรนด์นี้อยู่มาอย่างยาวนาน แต่ต้องการปรับตัวเข้าสู่ยุคดิจิทัลเพื่อขยายฐานลูกค้า ผ่านการทำ E-Commerce เต็มรูปแบบ",
    description: "นี่คือคำอธิบายแบบยาว...", // ใส่กลับเข้ามาให้ TypeScript สบายใจ
    heroMedia: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
      after: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
    },

    stickySections: [
      {
        id: "challenge",
        title: "Challenge",
        content: [
          "เว็บไซต์เก่าโหลดช้า (5 วินาที+)",
          "Bounce Rate สูงถึง 80%",
          "Design ไม่สื่อถึงภาพลักษณ์ Luxury"
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
      },
      {
        id: "approach",
        title: "Approach",
        content: [
          "รื้อโครงสร้าง UI/UX ใหม่ทั้งหมด",
          "ใช้เทคโนโลยี Next.js เพื่อความเร็ว",
          "ทำ SEO เชิงลึกเพื่อดึง Organic Traffic"
        ],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
      },
      {
        id: "solution",
        title: "Solution",
        content: [
          "ดีไซน์สไตล์ Minimalist Brutalism",
          "ระบบ Checkout ที่จบใน 2 ขั้นตอน",
          "เชื่อมต่อระบบ Stock หลังบ้านอัตโนมัติ"
        ],
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?w=800&q=80"
      }
    ],

    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"
    ],

    metrics: [
      { value: "200%", label: "Conversion" },
      { value: "1 M+", label: "Reach" },
      { value: "5x", label: "ROI" }
    ]
  },
  
  // ผลงานตัวที่ 2 ที่ไม่มี Before/After ก็จะไม่ Error แล้ว เพราะเราตั้งเป็น Optional (?) ไว้
  {
    slug: "analytica-dashboard",
    title: "Analytica Dashboard",
    tags: ["UX/UI", "Data", "Frontend"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    client: "Analytica Systems",
    year: "2023",
    description: "แพลตฟอร์มจัดการข้อมูลสรุปผลสำหรับองค์กรขนาดใหญ่...",
  }
];