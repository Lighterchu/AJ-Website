"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function FullscreenImage({ src, alt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <Image
          unoptimized
          src={urlFor(src)
            .width(600) // resize for gallery
            .height(400)
            .auto("format") // serve WebP/AVIF automatically
            .quality(75) // good compression
            .url()}
            alt={alt} // better alt text
            fill
            className="object-cover rounded-sm group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw,
     (max-width: 1200px) 50vw,
     33vw"
        />
      </div>

      {/* Fullscreen overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <Image
              unoptimized
              src={urlFor(src).url()}
              alt={alt}
              fill
              className="object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
