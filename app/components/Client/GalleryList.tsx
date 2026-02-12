// "use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Gallery({ photos }: { photos: any[] }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id || photo.slug.current}
            className="group relative rounded-xl overflow-hidden shadow-lg cursor-default sm:cursor-pointer hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-64 w-full">
              <Image
                src={urlFor(photo.image)
                  .width(600) // resize for gallery
                  .height(400)
                  .auto("format") // serve WebP/AVIF automatically
                  .quality(75) // good compression
                  .url()}
                alt={photo.name} // better alt text
                fill
                unoptimized // keep unoptimized so Vercel doesn't charge extra
                className="object-cover rounded-sm group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
              />
            </div>

            {/* Overlay always visible on mobile, hover on desktop */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
                
                transition-opacity duration-300 flex flex-col justify-end p-4"
            >
              <h2 className="text-white text-xl font-semibold">{photo.name}</h2>
              {/* <time className="text-gray-300 text-sm mb-2">{date}</time> */}
              {/* <p className="text-gray-200 text-sm line-clamp-2">{photo.short}</p> */}
              <Link
                href={`/pages/Gallerys/gallery/${photo.slug.current}`}
                className="mt-3 inline-block text-sm font-semibold text-green-400 hover:text-green-600"
                aria-label={`More details about ${photo.name}`}
              >
                See More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
