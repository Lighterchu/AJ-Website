"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

interface ImageEvent {
  _id: string;
  imageUrl: string;
}

interface SliderSectionProps {
  data: ImageEvent[];
  event: { Link?: string };
}

export default function SliderSection({ data, event }: SliderSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = useCallback((url: string) => {
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  }, []);

  useEffect(() => {
    if (!data?.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);
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
            onClick={() => handleClick(event.Link || img.imageUrl)}
          >
            <Image
              src={img.imageUrl}
              unoptimized
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-fill  cursor-pointer"
              sizes="(max-width: 640px) 100vw, 100vw"
              priority={currentIndex === 0}
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}
