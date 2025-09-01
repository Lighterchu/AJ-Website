// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const EVENT_QUERY = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id,
    name,
    description,
    date,
    images[] {
      "url": asset->url,
      alt
    },
    Link
  }
`;

export default async function EventPage({ params }) {
  const event = await sanityFetch({ query: EVENT_QUERY, params: { slug: params.slug } });
  const eventData = event?.data ?? event;
  const eventLink = eventData?.Link || null;

  if (!eventData) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{eventData.name}</h1>
      <time className="block text-sm text-gray-500 mb-6">
        {new Date(eventData.date).toLocaleDateString()}
      </time>

      {/* Image Grid */}
      {eventData.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {eventData.images.map((img, index) => (
            <div key={index} className="relative w-full h-64">
              <Image
                src={img.url}
                alt={img.alt || eventData.name}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
