"use client";
// import Image from "next/image";
import SlindingImages from "./components/SilderImage";

export default function Home() {
  return (
    <div>
      <main className="relative w-screen h-screen text-white overflow-hidden">
        {/* Video Background */}
        <video
          src="https://lvhi9synhveypxnx.public.blob.vercel-storage.com/Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="max-w-2xl text-center">
            <p className="text-base sm:text-lg md:text-2xl mb-6 leading-relaxed">
              MVMNT Entertainment — Bringing chaos to order, bass to basements,
              and community to the concrete.  
              We throw parties that don’t ask for permission — just your presence.
            </p>
            <a
              href="https://www.eventbrite.com/e/blackout-because-therapy-is-expensive-tickets-1543015774719?aff=oddtdtcreator"
              className="inline-block bg-teal-400 text-black font-semibold px-6 py-3 rounded-lg text-lg sm:text-xl hover:bg-teal-300 transition-colors"
            >
              See Next Event
            </a>
          </div>
        </div>
      </main>

      {/* Slider Section */}
      <SlindingImages />
    </div>
  );
}
