// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";

const EVENT_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    name,
    description,
    date,
    "imageUrl": image.asset->url
  }
`;

export default async function EventPage({ params }) {
  const event = await sanityFetch({ query: EVENT_QUERY, params: { slug: params.slug } });
  const eventData = event?.data ?? event;

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

      <p className="text-lg text-gray-700">{eventData.description || "No description available."}</p>
    </main>
  );
}
