import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Footer from "@/components/Footer";
import React, { Suspense } from "react";
import { siteConfig } from "@/utils/constants";
import { CircularProgress } from "@nextui-org/react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// TODO: Update implementation
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Beneficial Ownership",
    "Lexicon",
    "Lexicon Beneficial Ownership",
    "Corruption",
  ],
  authors: {
    name: siteConfig.owner,
    url: siteConfig.ownerUrl,
  },
  creator: siteConfig.owner,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body className={`${inter.className} m-0 h-full min-h-full`}>
        <Navbar />
        <Suspense fallback={<CircularProgress />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
