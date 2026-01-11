import type { Metadata as NextMetadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";
import Countdown from "./components/Client/Countdown";

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
const LAUNCH_DATE = new Date("2026-01-11T20:25:00+11:00");

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
  // 🧠 SERVER-SIDE TIME CHECK
  const isLive = Date.now() >= LAUNCH_DATE.getTime();

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
          {!isLive ? (
            // 🔒 PRE-LAUNCH VIEW
            <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                MVMNT
              </h1>

              <p className="max-w-md text-gray-400">
                Bringing chaos to order.  
                The next movement begins in:
              </p>

              <Countdown targetDate={LAUNCH_DATE.toISOString()} />

              <p className="mt-6 text-xs uppercase tracking-widest text-gray-500">
                Victoria · Underground · Bass Culture
              </p>
            </main>
          ) : (
            // 🌍 LIVE SITE VIEW
            <>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <SanityLive />
              <SoundCloudEmbed />
              <Footer />
              <Toaster richColors position="top-right" />
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
