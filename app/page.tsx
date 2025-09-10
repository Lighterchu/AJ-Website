"use client";
import { useEffect, useState } from "react";
import SlindingImages from "./components/SilderImage";
import { nextEventQuery } from "../sanity/lib/allquries";
import { client } from "../sanity/lib/client";

export default function Home() {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await client.fetch(nextEventQuery);
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, []);

  return (
    <div>
      <main className="text-white overflow-hidden relative">
        {/* Video Background */}
        <video
          src="/video/_AHymsNz.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover z-0"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="max-w-2xl text-center">
            <p className="text-base sm:text-lg md:text-2xl mb-6 leading-relaxed">
              MVMNT Entertainment — Bringing chaos to order, bass to basements,
              and community to the concrete.  
              We throw parties that don’t ask for permission — just your presence.
            </p>

            {loading ? (
              <span className="text-gray-400">Loading next event...</span>
            ) : event ? (
              <a
                href={event.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-400 text-black font-semibold px-6 py-3 rounded-lg text-lg sm:text-xl hover:bg-teal-300 transition-colors"
              >
                See Next Event
              </a>
            ) : (
              <span className="text-gray-400">No upcoming events</span>
            )}
          </div>
        </div>
      </main>

      {/* Slider Section */}
      <SlindingImages />
    </div>
  );
}
