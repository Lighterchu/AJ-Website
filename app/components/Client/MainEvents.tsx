// components/EventList.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type Event = {
  _id: string;
  name: string;
  startDate?: string;
  imageUrl: string;
  short: string;
  slug: { current: string };
};

export default function MainEventList({ events }: { events: Event[] }) {
  const now = new Date();
  // ✅ Filter + sort upcoming events
  const upcomingEvents = events
    .map((event) => ({
      ...event,
      parsedDate: event.startDate ? new Date(event.startDate) : null,
    }))
    .filter(
      (event) =>
        event.parsedDate &&
        !isNaN(event.parsedDate.getTime()) &&
        event.parsedDate >= now
    )
    .sort(
      (a, b) =>
        a.parsedDate!.getTime() - b.parsedDate!.getTime()
    );

  if (upcomingEvents.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-xl font-medium">
          No upcoming events.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {upcomingEvents.map((event) => (
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
            <h2 className="text-2xl font-semibold mb-2">
              {event.name}
            </h2>

            <time
              dateTime={event.parsedDate!.toISOString()}
              className="block mb-4 text-sm text-gray-500"
            >
              {event.parsedDate!.toLocaleDateString("en-AU", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>

            <p className="text-gray-900 dark:text-gray-50">{event.short}</p>
          </div>

          <Link
            href={`/pages/Events/event/${event.slug.current}`}
            className="block p-6 bg-gray-100/30 text-center mt-auto hover:bg-gray-200/40 transition-colors rounded-lg"
          >
            <div className="text-gray-900 dark:text-gray-50 font-medium">
              More Details →
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
