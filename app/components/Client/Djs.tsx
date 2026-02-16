// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const DJ_QUERY = groq`
  *[_type == "dj" && released == true] {
    _id,
    name,
    slug,
    "imageUrl": image.asset->url,
    bio,
    duration,
    released
  }
`;

export default async function OurDJs() {
  const response = await sanityFetch({ query: DJ_QUERY });

  const djs = response?.data || [];

  if (!djs) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>No DJS content found.</p>
      </div>
    );
  }
  

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* DJ Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {djs.map((dj) => (
          <div
            key={dj._id}
            className="bg-zinc-900 rounded-2xl p-4 shadow-md hover:shadow-lg transition"
          >
            {/* Image */}
            {dj.imageUrl && (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={dj.imageUrl}
                  alt={dj.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Name */}
            <h2 className="text-xl font-semibold mt-4 text-white">
              {dj.name}
            </h2>

            {/* Bio preview */}
            {dj.bio && (
              <p className="text-sm text-white/70 mt-2 line-clamp-3">
                {dj.bio}
              </p>
            )}

            {/* View Profile Button */}
            <Link
              href={`/pages/Djs/dj/${dj.slug?.current}`}
              className="mt-4 inline-block bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-white hover:bg-white/20 transition"
            >
              View Artist
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
