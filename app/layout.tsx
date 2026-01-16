import type { Metadata as NextMetadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { Toaster } from "sonner";
import LaunchGate from "./components/Client/LaunchGate";
import { Analytics } from '@vercel/analytics/next';


import { ClerkProvider } from "@clerk/nextjs";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SoundCloudEmbed from "./components/Client/SoundcloudEmbed";
import { SanityLive } from "@/sanity/lib/live";

interface Metadata extends NextMetadata {
  verification?: NextMetadata["verification"] & {
    probely?: string;
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🚀 SET YOUR LAUNCH DATE (WITH TIMEZONE)
//our live date
const LAUNCH_DATE = new Date("2026-01-17T00:00:00+11:00");

// const LAUNCH_DATE = new Date("2026-01-14T16:10:50+11:00");

export const revalidate = 60; // re-check every minute

export const metadata: Metadata = {
  title: "MVMNT",
  description: `MVMNT Entertainment — Bringing chaos to order, bass to basements,
and community to the concrete.
We throw parties that don’t ask for permission — just your presence.`,
  openGraph: {
    images: [
      {
        url: "/logos/main.jpg",
        width: 1200,
        height: 630,
        alt: "MVMNT Entertainment",
      },
    ],
  },
  verification: {
    probely: "6ee8e9ca-1f49-4977-bbd4-4f8e93a05c71",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NW6HZJMBWN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NW6HZJMBWN');
          `}
        </Script>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-white`}
        >
          <Analytics />
          <LaunchGate launchDate={LAUNCH_DATE.toISOString()}>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <SanityLive />
            <SoundCloudEmbed />
            <Footer />
            <Toaster richColors position="top-right" />
          </LaunchGate>
        </body>
      </html>
    </ClerkProvider>
  );
}

