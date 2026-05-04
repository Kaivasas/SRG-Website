import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import TransitionLoader from "./components/ui/TransitionLoader";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import type { SanityServiceBase } from "@/app/types/sanity";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0] {
  siteTitle,
  seo {
    metaTitle,
    metaDescription
  }
}`);

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const siteTitle = settings?.siteTitle || "Sustain Republix";
  const defaultTitle = settings?.seo?.metaTitle || siteTitle;
  const defaultDesc = settings?.seo?.metaDescription || "Your Partner in Digital Growth";

  return {
    title: {
      template: `%s | ${siteTitle}`,
      default: defaultTitle,
    },
    description: defaultDesc,
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      siteName: siteTitle,
      type: "website",
    },
  };
}

const SERVICES_NAV_QUERY = defineQuery(`*[_type == "service"] | order(title asc) {
  title,
  "slug": slug.current,
  category
}`);

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: services } = await sanityFetch({ query: SERVICES_NAV_QUERY });

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TransitionLoader />
        <Navbar services={(services as SanityServiceBase[]) ?? []} />
        {children}
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}