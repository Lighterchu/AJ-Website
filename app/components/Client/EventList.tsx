// components/EventList.tsx
'use client';

import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EventList({ events }: { events: any[] }) {

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="grid gap-8 md:grid-cols-3 ">
      {sortedEvents.map((event) => (
        <article
        key={event._id}
        className="flex flex-col rounded-lg  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-48 w-full">
          <Image
            src={event.imageUrl}
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
      
        {/* push this section to the bottom */}
        <div className="p-6 bg-gray-100/30 text-center mt-auto">
          <Link
            href={`/pages/Events/event/${event.slug.current}`}
            className="text-white hover:underline font-medium"
          >
            Check Out Line Up →
          </Link>
        </div>
      </article>
      
      ))}
    </div>
  );
}
