"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className={`${
        isHome ? "absolute" : "relative"
      } top-0 z-20 w-full px-6 py-4 flex justify-between items-center text-green-400 font-semibold text-lg bg-transparent`}
    >
      <Link href="/">Home</Link>
      <div className="space-x-4 sm:space-x-8 text-sm sm:text-lg">
        <Link href="/pages/About">About Us</Link>
        <Link href="/pages/UpComingEvents">Upcoming Events</Link>
        <Link href="/pages/Gallery">Gallery</Link>
      </div>
    </nav>
  );
}
