import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import TransitionLoader from "./components/ui/TransitionLoader";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityServiceNavItem } from "@/app/types/sanity";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sustain Republix",
  description: "Your Partner in Digital Growth",
};

const SERVICES_NAV_QUERY = `*[_type == "service"] | order(title asc) {
  title,
  slug,
  category
}`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const services = await sanityFetchSafe<SanityServiceNavItem[]>(SERVICES_NAV_QUERY);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TransitionLoader />
        <Navbar services={services ?? []} />
        {children}
        <Footer />
      </body>
    </html>
  );
}