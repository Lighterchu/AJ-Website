// components/EventList.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function EventList({
  events,
  showNewEvents = true,

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
}) {
  
  if (events.length === 0) {
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
      {events.map((event) => (
        <article
          key={event._id}
          className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48 w-full">
            <Image
             src={urlFor(event.imageUrl)
              .width(600) // resize for gallery
              .height(400)
              .auto("format") // serve WebP/AVIF automatically
              .quality(75) // good compression
              .url()}
              unoptimized
              alt={event.name}
              fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
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
            <p className=" text-gray-900 dark:text-gray-50">{event.short}</p>
          </div>

          {showNewEvents && (
            <Link
              href={`/pages/Events/event/${event.slug.current}`}
              className="block p-6 bg-gray-100/30 text-center mt-auto hover:bg-gray-200/40 transition-colors rounded-lg"
            >
              <div className="text-gray-900 dark:text-gray-50 font-medium">
                Check Out Line Up →
              </div>
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
