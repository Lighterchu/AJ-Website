// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import FullscreenImage from "@/app/components/Client/FullscreenImage";
import Link from "next/link";
export const revalidate = 60;
export const dynamic = "force-dynamic";

const EVENT_QUERY = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id,
    name,
    description,
    short,
    eventDate,
    images[] {
      "url": asset->url,
      alt
    },
    Link
  }
`;

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const slugParams = (await params).slug; 
  const event = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug: slugParams },
  });
  const eventData = event?.data ?? event;

  console.log("Event Data:", eventData);

  if (!eventData) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div>
        <Link
          href="/pages/Events"
          className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-lg font-semibold text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-lg"
        >
          ← Back to Galleries
        </Link>
      </div>
      {/* <h1 className="text-4xl font-bold mb-4">{eventData.name}</h1> */}
      <div className=" flex justify-center mb-6">
        <div>
          <div>
            <h1>{eventData.short}</h1>
          </div>
          <div className="text-center">
            <time className="block text-sm text-white mb-6">
              {new Date(eventData.eventDate).toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      {eventData.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {eventData.images.map((img, index) => (
            <div key={index} className="relative w-full h-64">
              <FullscreenImage
                src={img.url}
                alt={img.alt || `Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
