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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 z-20 w-full px-6 py-4 flex items-center justify-between text-white font-semibold bg-transparent">
      
      {/* LEFT — Logo / Home */}
      <Link href="/" className="text-lg">
        Home
      </Link>

      {/* CENTER — Desktop Links */}
      <div className="hidden md:flex space-x-8 text-sm lg:text-base">
        <Link href="/pages/About">About Us</Link>
        <Link href="/pages/Events">Events</Link>
        <Link href="/pages/Gallerys">Galleries</Link>
        <Link href="/pages/Scene-and-Heard">Scene and Heard</Link>
        <Link href="/pages/Contact">Contact Us</Link>
      </div>

      {/* RIGHT — Auth (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
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
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 flex flex-col items-center py-6 space-y-4 md:hidden">
          
          {/* Auth (Mobile) */}
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <Link href="/pages/About" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="/pages/Events" onClick={() => setIsOpen(false)}>
            Events
          </Link>
          <Link href="/pages/Gallerys" onClick={() => setIsOpen(false)}>
            Galleries
          </Link>
          <Link href="/pages/Scene-and-Heard" onClick={() => setIsOpen(false)}>
            Scene and Heard
          </Link>
          <Link href="/pages/Contact" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
