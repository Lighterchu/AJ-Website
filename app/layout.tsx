import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SanityLive } from "@/sanity/lib/live"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MVMNT",
  description: `MVMNT Entertainment — Bringing chaos to order, bass to basements,
              and community to the concrete.  
              We throw parties that don’t ask for permission — just your presence.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
  >
    <Navbar /> {/* ⬅️ Move Navbar to the top */}
    <main className="flex-grow">{children}</main>
    <SanityLive />
    <Footer />
  </body>
</html>

  );
}
