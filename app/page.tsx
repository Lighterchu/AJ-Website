"use client";
import { useEffect, useState } from "react";
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

  console.log(imageEvent);

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
      </main>

      {/* Slider Section */}
      {imageEvent && <SlindingImages data={imageEvent} event={event} />}
      {/* {imageEvent && <SlindingImages data={imageEvent} />} */}
      <div className=" relative z-10 flex items-center justify-center h-full px-4 p-4">
          <p> MVMNT Entertainment </p>
        </div>
      <div className=" relative z-10 flex items-center justify-center h-full px-4 p-4">
        <p className="text-sm sm:text-base md:text-lg w-full mb-6 leading-relaxed text-gray-300">
          Bringing chaos to order, bass to basements, and community to the
          concrete. We throw parties that don’t ask for permission just your
          presence.
        </p>
      </div>
    </div>
  );
}
