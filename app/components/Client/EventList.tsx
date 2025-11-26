// components/EventList.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EventList({
  events,
  showNewEvents = true, // 👈 default value so undefined doesn't break logic
}: {
  events: {
    _id: string;
    name: string;
    date: string;
    imageUrl: string;
    short: string;
    slug: { current: string };
  }[];
  showNewEvents?: boolean;
}) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const now = new Date();

  // Clear & predictable logic
  const filteredEvents = showNewEvents
    ? sortedEvents.filter((event) => new Date(event.date) > now)
    : sortedEvents.filter((event) => new Date(event.date) < now);

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
              src={event.imageUrl}
              unoptimized
              alt={event.name || "Event Image"}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
            <time
              dateTime={new Date(event.date).toISOString()}
              className="block mb-4 text-sm text-gray-500"
            >
              {new Date(event.date).toLocaleDateString()}
            </time>
            <p className="text-gray-700">{event.short}</p>
          </div>
          {showNewEvents && (
            <Link
            href={`/pages/Events/event/${event.slug.current}`}
            className="block p-6 bg-gray-100/30 text-center mt-auto hover:bg-gray-200/40 transition-colors rounded-lg"
          >
            <div className="text-white font-medium">Check Out Line Up →</div>
          </Link>
          )}
        </article>
      ))}
    </div>
  );
}
