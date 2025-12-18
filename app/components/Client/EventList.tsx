// components/EventList.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function EventList({
  events,
  showNewEvents = true,
  EventType = "event",
}: {
  events: {
    _id: string;
    name: string;
    startDate: string;
    imageUrl: string;
    short: string;
    slug: { current: string };
  }[];
  showNewEvents?: boolean;
  EventType?: "event" | "gallery";
}) {
  const now = new Date();

  // ✅ Sort once, based on EventType
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();

    if (EventType === "gallery") {
      // Oldest → Newest
      return dateA - dateB;
    }

    // Events: Newest → Oldest
    return dateB - dateA;
  });

  // ✅ Filter after sorting
  const filteredEvents = showNewEvents
    ? sortedEvents.filter((event) => new Date(event.startDate) > now)
    : sortedEvents.filter((event) => new Date(event.startDate) < now);

  if (filteredEvents.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-xl font-medium">
          No events found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {filteredEvents.map((event) => (
        <article
          key={event._id}
          className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48 w-full">
            <Image
              src={urlFor(event.imageUrl).url()}
              unoptimized
              alt={event.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
            <time
              dateTime={new Date(event.startDate).toISOString()}
              className="block mb-4 text-sm text-gray-500"
            >
              {new Date(event.startDate).toLocaleDateString()}
            </time>
            <p className="text-gray-700">{event.short}</p>
          </div>

          {showNewEvents && (
            <Link
              href={`/pages/Events/event/${event.slug.current}`}
              className="block p-6 bg-gray-100/30 text-center mt-auto hover:bg-gray-200/40 transition-colors rounded-lg"
            >
              <div className="text-white font-medium">
                Check Out Line Up →
              </div>
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
