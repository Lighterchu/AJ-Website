"use client";
import SlindingImages from "./components/SilderImage";

export default function Home() {
  return (
    <div className="relative">
      {/* VIDEO BACKGROUND SECTION */}
      <div className="relative h-screen sm:h-dvh w-full overflow-hidden">
        {/* Fullscreen YouTube Video */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/a3AegYkLNsg?autoplay=1&mute=1&loop=1&playlist=a3AegYkLNsg&controls=0&modestbranding=1&showinfo=0&rel=0"
            title="MVMNT Logo Video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Optional gradient overlay for readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Foreground Content */}
        <div className="absolute bottom-0 w-full flex justify-center px-4 sm:px-6 pb-12 z-20">
          <div className="p-4 sm:p-6 max-w-xl text-center ">
            <p className="text-base sm:text-lg mb-4 leading-relaxed text-white">
              <strong className="font-semibold">MVMNT Entertainment</strong> —
              Bringing chaos to order, bass to basements, and community to the
              concrete. We throw parties that don’t ask for permission — just
              your presence.
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
