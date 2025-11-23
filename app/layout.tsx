import type { Metadata as NextMetadata } from "next";
import Script from "next/script";

interface Metadata extends NextMetadata {
  verification?: NextMetadata["verification"] & {
    probely?: string;
  };
}
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "MVMNT",
  description: `MVMNT Entertainment — Bringing chaos to order, bass to basements,
              and community to the concrete.  
              We throw parties that don’t ask for permission — just your presence.`,
  verification: {
    probely: "6ee8e9ca-1f49-4977-bbd4-4f8e93a05c71", // ✅ Probely verification
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <SanityLive />
        <Footer />
      </body>
    </html>
    
  );
}
