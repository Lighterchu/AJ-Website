"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white font-medium text-base w-full py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/logos/MVMNT.png"
            width={200}
            height={100}
            alt="MVMNT Entertainment Logo"
            className="object-contain w-[200px] h-auto"
            loading="lazy"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-center">
          {[
            { href: "/", label: "Home" },
            { href: "/pages/About", label: "About Us" },
            { href: "/pages/Events", label: "Upcoming Events" },
            { href: "/pages/Gallerys", label: "Gallery" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end text-sm space-y-1">
          <a
            href="mailto:info@mvmntentertainment.com"
            className="hover:underline"
          >
            mvmnt.entertainment.melb@gmail.com
          </a>
          <a href="tel:+1234567890" className="hover:underline">
            0431383674
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

// Prevent unnecessary re-renders
export default React.memo(Footer);
