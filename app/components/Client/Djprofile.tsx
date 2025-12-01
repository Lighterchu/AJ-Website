"use client";

import Image from "next/image";
import { urlFor } from "../../../sanity/lib/image";
import Link from "next/link";

interface DjProfileProps {
  djsprofile: {
    _id?: string;
    name?: string;
    slug?: {
      current?: string;
    };
    bio?: string;
    duration?: {
      start?: string;
      end?: string;
    };
    imageUrl?: string
  };
}


export default function DjProfiles({ djsprofile }: DjProfileProps) {
  console.log("Rendering DjProfiles component with data:", djsprofile);
  const hasImage = !!djsprofile?.imageUrl;
  const start = djsprofile?.duration?.start || "9:00 PM";
  const end = djsprofile?.duration?.end || "11:00 PM";
  const imageUrl = hasImage
    ? urlFor(djsprofile.imageUrl).width(2000).height(3500).url()
    : null;

  return (
    <div className="group relative bg-amber-700  w-full sm:w-64 h-full overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 mx-auto sm:mx-2 md:mx-4 lg:mx-6 ">
      {imageUrl ? (
        <>
          <div className="relative w-64 aspect-[5/5]  rounded-2xl ">
            <Image
              src={imageUrl}
              alt={djsprofile.name || "DJ profile image"}
              fill
              className="object-fill"
            />
          </div>
        

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

          {/* DJ Name */}
          <div className="absolute bottom-3 left-3 text-white">
            <p className="text-lg font-semibold tracking-wide">
              {djsprofile.name || "Unnamed DJ"}
            </p>
          </div>
        
          <div className="absolute bottom-3 right-3 text-white">
            <Link href={`/pages/Djs/dj/${djsprofile.slug?.current || ""}`}>
            <p className="text-sm font-semibold tracking-wide">
              View Profile
            </p>
            </Link>
          </div>

          {/* TIME Badge */}
          <div className="absolute bottom-3 right-3 md:top-3 md:bottom-auto bg-black/60 text-white px-2 py-1 rounded-md text-sm opacity-80 transition-all duration-300">
            <p>
              {start || "Start"} - {end || "End"}
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
