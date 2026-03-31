import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" }, // สำหรับรูป Mockup ต่างๆ
      { protocol: "https", hostname: "i.pravatar.cc" }, // สำหรับรูปโปรไฟล์ลูกค้า
      { protocol: "https", hostname: "upload.wikimedia.org" }, // สำหรับโลโก้ Google
    ],
  },
};

export default nextConfig;