'use client';

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-green-400 font-medium text-base w-full py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/logos/MVMNT.png"
            width={200}
            height={10}
            alt="MVMNT Entertainment Logo"
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/pages/About" className="hover:underline">About Us</Link>
          <Link href="/pages/UpComingEvents" className="hover:underline">Upcoming Events</Link>
          <Link href="/pages/Gallary" className="hover:underline">Gallery</Link>
        </nav>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end text-sm space-y-1">
          <a href="mailto:info@mvmntentertainment.com" className="hover:underline">
            info@mvmntentertainment.com
          </a>
          <a href="tel:+1234567890" className="hover:underline">
            +1 (234) 567-890
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 border-t border-green-700 pt-4 text-center text-xs text-green-500">
        &copy; 2025 MVMNT Entertainment — All rights reserved.
      </div>
    </footer>
  );
}
