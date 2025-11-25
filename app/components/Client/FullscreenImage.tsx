"use client";

import { useState } from "react";
import Image from "next/image";

export default function FullscreenImage({ src, alt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded"
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
              src={src}
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
