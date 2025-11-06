"use client";

import Image from "next/image";
import { urlFor } from "../../../sanity/lib/image";

interface DjProfileProps {
  djsprofile: {
    name?: string;
    image?: {
      asset?: {
        _ref?: string;
      };
    };
  };
}

export default function DjProfiles({ djsprofile }: DjProfileProps) {
  const hasImage = !!djsprofile?.image?.asset?._ref;
  const imageUrl = hasImage
    ? urlFor(djsprofile.image).width(600).height(600).url()
    : null;

  return (
    <div className="group relative w-full sm:w-64 h-64 overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 mx-auto sm:mx-2 md:mx-4 lg:mx-6">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={djsprofile.name || "DJ profile image"}
            fill
            className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

          {/* DJ Name */}
          <div className="absolute bottom-3 left-3 text-white">
            <p className="text-lg font-semibold tracking-wide">
              {djsprofile.name || "Unnamed DJ"}
            </p>
          </div>

          {/* TIME Badge */}
          <div className="absolute bottom-3 right-3 md:top-3 md:bottom-auto bg-black/60 text-white px-2 py-1 rounded-md text-sm opacity-80 transition-all duration-300">
            <p className="">TIME: 9PM - 11PM</p>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 text-sm rounded-2xl">
          No image available
        </div>
      )}
    </div>
  );
}
