import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import TransitionLoader from "./components/ui/TransitionLoader";
import { sanityFetchSafe } from "@/app/lib/sanityFetch";
import type { SanityServiceBase } from "@/app/types/sanity";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  siteTitle,
  seo {
    metaTitle,
    metaDescription
  }
}`;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetchSafe<any>(SITE_SETTINGS_QUERY);
  
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

const SERVICES_NAV_QUERY = `*[_type == "service"] | order(title asc) {
  title,
  "slug": slug.current,
  category
}`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const services = await sanityFetchSafe<SanityServiceBase[]>(SERVICES_NAV_QUERY);

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