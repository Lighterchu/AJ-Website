'use client';

import Image from "next/image";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center pt-16 px-4">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/images/logo2.png"
          alt="MVMNT Logo"
          width={300}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
      <p className="text-green-200 text-center max-w-xl mb-12">
        Whether you're planning an event, want to collaborate, or just want to
        say hi — we’re here for it. Fill out the form below or reach out
        directly via email or phone.
      </p>

      {/* Contact Card */}
      <div className="bg-black border border-green-500 rounded-xl shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-green-400 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-green-400 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-green-400 mb-1">Message</label>
            <textarea
              placeholder="Your message..."
              rows={5}
              className="w-full px-4 py-2 rounded bg-black text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-green-200">
          <div>
            <h2 className="text-green-400 text-xl font-semibold mb-2">Email</h2>
            <a href="mailto:info@mvmntentertainment.com" className="hover:underline">
              info@mvmntentertainment.com
            </a>
          </div>
          <div>
            <h2 className="text-green-400 text-xl font-semibold mb-2">Phone</h2>
            <a href="tel:+1234567890" className="hover:underline">
              +1 (234) 567-890
            </a>
          </div>
          <div>
            <h2 className="text-green-400 text-xl font-semibold mb-2">Location</h2>
            <p>Naarm / Melbourne, Australia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
