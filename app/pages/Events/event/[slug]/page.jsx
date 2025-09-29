// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const EVENT_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    name,
    description,
    date,
    "imageUrl": image.asset->url,
    djs,
    Link
  }
`;

export default async function EventPage({ params }) {
  const event = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug: params.slug },
  });
  const eventData = event?.data ?? event;
  console.log(eventData.djs)
  const eventLink = eventData?.Link || null;

  if (!eventData) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{eventData.name}</h1>
      <time className="block text-sm text-gray-500 mb-6">
        {new Date(eventData.date).toLocaleDateString()}
      </time>

      {eventData.imageUrl && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={eventData.imageUrl}
            alt={eventData.name}
            fill
            className="object-cover rounded"
          />
        </div>
      )}

      <p className="text-lg text-gray-700 mb-6">
        {eventData.description || "No description available."}
      </p>

      <div className=" ">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-6 tracking-wide uppercase">
            The Line Up
          </h1>
          {eventData.djs && eventData.djs.length > 0 ? (
            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {eventData.djs.map((dj, index) => (
                <div>
                    <p key={index} className="text-xl font-semibold">{dj.name}</p>
                    <p>{dj.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No DJs available.</p>
          )}
        </div>

        <div className=" flex justify-center">
          {eventLink && (
            <p>
              <Link
                href={eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-400 text-black font-semibold px-6 py-3 rounded-lg text-lg sm:text-xl hover:bg-teal-300 transition-colors"
              >
                Get your tickets here
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
