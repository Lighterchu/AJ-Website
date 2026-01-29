"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClasses = useMemo(() => 
    pathname === "/" 
      ? "text-white"
      : "text-black dark:text-gray-100"
  , [pathname]);

  const links = [
    { href: "/pages/About", label: "About Us" },
    { href: "/pages/Events", label: "Events" },
    { href: "/pages/Gallerys", label: "Galleries" },
    { href: "/pages/Scene-and-Heard", label: "Scene and Heard" },
    { href: "/pages/Contact", label: "Contact Us" }
  ];

  return (
    <nav className="absolute top-0 z-20 w-full px-6 py-4 flex items-center justify-between font-semibold bg-transparent">

      {/* LEFT — Logo / Home */}
      <Link href="/" className={`text-lg ${linkClasses}`}>Home</Link>

      {/* CENTER — Desktop Links */}
      <div className="hidden md:flex space-x-8 text-sm lg:text-base">
        {links.map(link => (
          <Link key={link.href} href={link.href} className={linkClasses}>{link.label}</Link>
        ))}
      </div>

      {/* RIGHT — Auth (Desktop) */}
      <div className={`hidden md:flex items-center space-x-4 ${linkClasses}`}>
        <SignedOut>
          <SignInButton />
          <SignUpButton signInForceRedirectUrl="/pages/Onboarding" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden ${linkClasses}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 dark:bg-gray-950 flex flex-col items-center py-6 space-y-4 md:hidden">
          <SignedOut>
            <SignInButton />
            <SignUpButton signInForceRedirectUrl="/pages/Onboarding" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
