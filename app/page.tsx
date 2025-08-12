"use client";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Oversized iframe container */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 min-w-[177.77vh] min-h-[100vw] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/a3AegYkLNsg?autoplay=1&mute=1&loop=1&playlist=a3AegYkLNsg&controls=0&modestbranding=1&showinfo=0&rel=0&playsinline=1"
          title="MVMNT Logo Video"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Foreground content */}
      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-12 px-4 sm:px-6 text-center">
        <div className="bg-black/30 rounded-lg backdrop-blur-md p-4 sm:p-6 max-w-xl text-white">
          <p className="text-base sm:text-lg mb-4 leading-relaxed">
            <strong className="font-semibold">MVMNT Entertainment</strong> — Bringing chaos to order, bass to basements,
            and community to the concrete. We throw parties that don’t ask for permission — just your presence.
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
  );
}
