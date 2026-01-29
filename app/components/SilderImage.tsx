"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {  urlFor } from "@/sanity/lib/image";

interface ImageEvent {
  _id: string;
  imageUrl: string; // URL string
}

interface SlidingImagesProps {
  data: ImageEvent[];
  event: {
    Link?: string;
  };
}

const SlidingImages: React.FC<SlidingImagesProps> = ({ data, event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClick = useCallback((url?: string) => {
    if (!url) return;
    window.open(url, "_blank");
  }, []);

  // Auto slide every 4s
  useEffect(() => {
    if (!data?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  // Only keep previous + current slide in DOM
  const slides = useMemo(() => {
    if (!data?.length) return [];
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    return [data[prevIndex], data[currentIndex]];
  }, [currentIndex, data]);

  if (!data?.length) return null;

  return (
    <div className="w-full relative overflow-hidden aspect-video bg-red-700">
      <div className="bg-red-400">
        <h1>there should be something here </h1>
      </div>
      {slides.map((img, idx) => {
        const isActive = idx === 1;

        return (
          <div
            key={`${img._id}-${idx}`}
            className={`
              absolute inset-0
              transition-opacity duration-700
              ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
            onClick={() => handleClick(event.Link || img.imageUrl)}
          >
            <Image
  src={urlFor(img.imageUrl).width(1600).auto('format').quality(80).url()} 
  alt="Event slide"
  fill
  unoptimized
  className="object-cover cursor-pointer"
  sizes="(max-width: 768px) 100vw, 824px"
  priority={isActive && currentIndex === 0}
/>

          </div>
        );
      })}
    </div>
  );
};

export default React.memo(SlidingImages);
