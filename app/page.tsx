"use client";

import { useEffect, useState, useRef } from "react";
import SlindingImages from "./components/SilderImage";
import { nextEventQuery } from "../sanity/lib/allquries";
import { ImagesFromEvent } from "../sanity/lib/imagesFromEventImage";
import { client } from "../sanity/lib/client";

export default function Home() {
  interface Event {
    Link: string;
  }

  const [event, setEvent] = useState<Event | null>(null);
  const [imageEvent, setImageEvent] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await client.fetch(nextEventQuery);
        const imagesEventData = await client.fetch(ImagesFromEvent);
        setEvent(data);
        setImageEvent(imagesEventData);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, []);

  // Lazy-load video when it enters viewport
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 } // 25% of video visible triggers load
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Video Section */}
      <div
        ref={videoRef}
        className="w-full aspect-[16/9] relative overflow-hidden"
      >
        {isVideoVisible ? (
          <video
            src="/video/_AHymsNz.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/video-poster.jpg"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
          </>
        )}
      </div>

      {/* Slider Section */}
      <div className="h-1/2">
        {imageEvent && <SlindingImages data={imageEvent} event={event} />}
      </div>

      {/* Hero Text */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 py-4">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
          MVMNT Entertainment
        </p>
      </div>
      <div className="relative flex items-center justify-center h-full px-4 py-4">
        <p className="text-sm sm:text-base md:text-lg w-full mb-6 leading-relaxed text-gray-300 text-center">
          Bringing chaos to order, bass to basements, and community to the
          concrete. We throw parties that don’t ask for permission, just your
          presence.
        </p>
      </div>
    </div>
  );
}
