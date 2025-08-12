'use client';

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 z-20 w-full px-6 py-4 flex justify-between items-center text-green-400 font-semibold text-lg bg-black/70 backdrop-blur">
      {/* Logo / Home Link */}
      <Link href="/" className="hover:underline">
        Home
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        <Link href="/pages/About" className="hover:underline">
          About Us
        </Link>
        <Link href="/pages/UpComingEvents" className="hover:underline">
          Upcoming Events
        </Link>
        <Link href="/pages/Gallery" className="hover:underline">
          Gallery
        </Link>
        <Link href="/pages/Contact" className="hover:underline">
          Contact
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-green-400 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 text-green-400 flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link href="/pages/About" className="hover:underline" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="/pages/UpComingEvents" className="hover:underline" onClick={() => setIsOpen(false)}>
            Upcoming Events
          </Link>
          <Link href="/pages/Gallery" className="hover:underline" onClick={() => setIsOpen(false)}>
            Gallery
          </Link>
        </div>
      )}
    </nav>
  );
}
