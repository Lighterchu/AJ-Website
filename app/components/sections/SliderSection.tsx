"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { track } from "@vercel/analytics";

interface ImageEvent {
  _id: string;
  imageUrl: string;
  Link?: string;
}

interface SliderSectionProps {
  data: ImageEvent[];
}

export default function SliderSection({ data }: SliderSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = useCallback((url?: string) => {
    track("Click event Slider");

    if (url && typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  }, []);

  useEffect(() => {
    if (!data?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);

  const slides = useMemo(() => {
    if (!data?.length) return [];

    const prevIndex = (currentIndex - 1 + data.length) % data.length;

    return [data[prevIndex], data[currentIndex]];
  }, [currentIndex, data]);

  if (!data?.length) return null;

  return (
    <div className="w-full relative overflow-hidden aspect-[16/9]">
      {slides.map((img, idx) => {
        const isActive = idx === 1;

        return (
          <div
            key={`${img._id}-${idx}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            onClick={() => handleClick(img.Link)}
          >
            <Image
              src={urlFor(img.imageUrl).url()}
              alt={`Slide ${currentIndex + 1}`}
              fill
              unoptimized
              className="object-fill cursor-pointer"
              sizes="100vw"
              priority={currentIndex === 0}
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}