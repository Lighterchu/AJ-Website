// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DjProfiles from "../../../../components/Client/Djprofile"; // <-- client component

const EVENT_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    name,
    description,
    date,
    "imageUrl": image.asset->url,
    djs[]->{
      _id,
      slug,
      name,
      "imageUrl": image.asset->url,
      bio
    },
    Link
  }
`;

export default async function EventPage({ params }) {
  const event = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug: params.slug },
  });
  const eventData = event?.data ?? event;
  const eventLink = eventData?.Link || null;
  console.log("Event Data:", eventData);
  

  if (!eventData) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Event Header */}
      <header className="space-y-2 text-center">
        <h1 className="text-5xl font-extrabold text-white">{eventData.name}</h1>
        <time className="block text-gray-400 text-sm">
          {new Date(eventData.date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      {/* Event Image */}
      {eventData.imageUrl && (
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={eventData.imageUrl}
            alt={eventData.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Description */}
      {eventData.description && (
        <p className="text-lg text-gray-200 leading-relaxed">{eventData.description}</p>
      )}

      {/* Lineup */}
      <section className="space-y-6 ">
        <h2 className="text-3xl font-bold text-white text-center">The Lineup</h2>
        {eventData.djs && eventData.djs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {eventData.djs.map((dj) => (
              <DjProfiles key={dj._id || dj.name} djsprofile={dj} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No DJs available.</p>
        )}
      </section>

      {/* Ticket Button */}
      {eventLink && (
        <div className="flex justify-center">
          <Link
            href={eventLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-black font-semibold px-6 py-3 rounded-lg text-lg sm:text-xl hover:bg-green-400 transition-colors"
          >
            Get Tickets
          </Link>
        </div>
      )}
    </main>
  );
}
