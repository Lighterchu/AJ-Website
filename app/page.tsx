"use client";
import SlindingImages from "./components/SilderImage";

export default function Home() {
  return (
    <div className="relative">
      {/* VIDEO BACKGROUND SECTION */}
      <div className="relative h-screen sm:h-dvh w-full">
        {/* Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/video/Video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Foreground Content */}
        <div className="absolute bottom-0 w-full flex justify-center px-4 sm:px-6 pb-12 z-20">
          <div className="p-4 sm:p-6 max-w-xl text-center bg-black/30 rounded-lg backdrop-blur-md">
            <p className="text-base sm:text-lg mb-4 leading-relaxed">
              <strong className="font-semibold">MVMNT Entertainment</strong> — Bringing chaos to order, bass to basements,
              and community to the concrete. We throw parties that don’t ask for
              permission — just your presence.
            </p>
            <a
              href="https://www.eventbrite.com/e/blackout-because-therapy-is-expensive-tickets-1543015774719?aff=oddtdtcreator"
              className="inline-block text-teal-400 hover:underline font-semibold text-base sm:text-xl"
            >
              See Next Event
            </a>
          </div>
        </div>
      </div>

      {/* SLIDING IMAGES SECTION */}
      <SlindingImages />
    </div>
  );
}
