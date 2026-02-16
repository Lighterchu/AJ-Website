"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/lib/image";

interface DjProfileProps {
  djsprofile: {
    _id?: string;
    released?: boolean;
    name?: string;
    slug?: {
      current?: string;
    };
    bio?: string;
    duration?: {
      start?: string;
      end?: string;
    };
    imageUrl?: string;
  };
}

export default function DjProfiles({ djsprofile }: DjProfileProps) {
  const { name, slug, duration, imageUrl, released } = djsprofile;

  const start = duration?.start 
  const end = duration?.end

  const finalImage = imageUrl
    ? urlFor(imageUrl).width(2000).height(2500).url()
    : null;

  return (
    <div className="group relative w-full sm:w-64 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg transition hover:scale-[1.03] mx-auto">
      {/* Image */}
      {finalImage && (
        <div className="relative w-full aspect-[4/5]">
          <Image
            src={finalImage}
            unoptimized
            alt={name ?? "DJ profile image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text content */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        {/* Name */}
        <div>
          <h3 className="text-white text-lg font-semibold drop-shadow">
            {name ?? "Unnamed DJ"}
          </h3>
          {start && end && (
            <p className="text-white/80 text-sm">
              {start} – {end}
            </p>
          )}
        </div>

        {/* View Profile Link */}
        {released && slug?.current && (
          <Link
            href={`/pages/Djs/dj/${slug.current}`}
            className="text-sm text-white bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20 hover:bg-white/20 transition"
          >
            View Artist
          </Link>
        )}
      </div>
    </div>
  );
}
