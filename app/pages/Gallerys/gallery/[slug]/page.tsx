// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import FullscreenImage from "@/app/components/Client/FullscreenImage";
import Link from "next/link";
export const revalidate = 60;
export const dynamic = "force-dynamic";
import { PortableText } from "@portabletext/react";

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
  if (!eventData) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div>
        <Link
          href="/pages/Gallerys"
          className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-lg font-semibold text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-lg"
        >
          ← Back to Galleries
        </Link>
      </div>
      {/* <h1 className="text-4xl font-bold mb-4">{eventData.name}</h1> */}
      <div className=" flex justify-center mb-6">
        <div>
          {/* <div>
            <h1>{eventData.short}</h1>
          </div> */}
          <div className="text-sm md:text-base leading-relaxed">
        <PortableText
          value={eventData.short}
          components={{
            types: {},
            marks: {},
            block: ({ children, value }) => {
              switch (value.style) {
                case "h1":
                  return (
                    <h1 className="text-4xl font-bold text-center my-6">
                      {children}
                    </h1>
                  );
                case "h2":
                  return (
                    <h2 className="text-3xl font-semibold my-4">
                      {children}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 className="text-2xl font-medium my-3">
                      {children}
                    </h3>
                  );
                default:
                  return <p className="mb-4">{children}</p>;
              }
            },
          }}
        />
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
