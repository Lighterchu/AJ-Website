"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const linkClasses =
    pathname === "/" 
      ? "text-white"                // always black on home
      : "text-black dark:text-gray-100"; // regular behavior elsewhere


  return (
    <nav className="absolute top-0 z-20 w-full px-6 py-4 flex items-center justify-between text-white font-semibold bg-transparent">
      
      {/* LEFT — Logo / Home */}
      <Link href="/" className={`text-lg ${linkClasses}`}>
        Home
      </Link>

      {/* CENTER — Desktop Links */}
      <div className="hidden md:flex space-x-8 text-sm lg:text-base">
        <Link href="/pages/About" className="text-gray-900 dark:text-gray-100">About Us</Link>
        <Link href="/pages/Events" className="text-gray-900 dark:text-gray-100">Events</Link>
        <Link href="/pages/Gallerys" className="text-gray-900 dark:text-gray-100">Galleries</Link>
        <Link href="/pages/Scene-and-Heard" className="text-gray-900 dark:text-gray-100">Scene and Heard</Link>
        <Link href="/pages/Contact" className="text-gray-900 dark:text-gray-100">Contact Us</Link>
      </div>

      {/* RIGHT — Auth (Desktop) */}
      <div className="hidden md:flex items-center space-x-4 text-gray-900 dark:text-gray-100">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden text-gray-900 dark:text-gray-100 ${linkClasses}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 dark:bg-gray-950 flex flex-col items-center py-6 space-y-4 md:hidden">
          
          {/* Auth (Mobile) */}
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <Link href="/pages/About"  onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="/pages/Events"  onClick={() => setIsOpen(false)}>
            Events
          </Link>
          <Link href="/pages/Gallerys"  onClick={() => setIsOpen(false)}>
            Galleries
          </Link>
          <Link href="/pages/Scene-and-Heard"  onClick={() => setIsOpen(false)}>
            Scene and Heard
          </Link>
          <Link href="/pages/Contact"  onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
