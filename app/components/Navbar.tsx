"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // 🔹 Add state for mobile menu

  return (
    <nav
      className={`${"absolute"} top-0 z-20 w-full px-6 py-4 flex justify-between items-center text-white font-semibold text-lg bg-transparent`}
    >
      <Link href="/">Home</Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4 sm:space-x-8 text-sm sm:text-lg">
        <Link href="/pages/About">About Us</Link>
        <Link href="/pages/Events">Events</Link>
        <Link href="/pages/Gallerys">Galleries</Link>
        <Link href="/pages/Scene-and-Heard">Scene and Heard</Link>
        <Link href="/pages/Contact">Contact Us</Link>
      </div>
      <div className=" flex justify-center items-center space-x-4"> 
      <SignedOut>
        <SignInButton />
        <SignUpButton>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
  

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 text-white flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link
            href="/pages/About"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/pages/Events"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/pages/Gallerys"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Galleries
          </Link>
          <Link
            href="/pages/Contact"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
