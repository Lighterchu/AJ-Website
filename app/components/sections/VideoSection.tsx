"use client";

import { useRef, useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";



export default function VideoSection({
  src,
  poster,
  aspectRatio = "16/9",
}) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={videoRef}
      className={`w-full relative overflow-hidden transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ aspectRatio }}
    >
      {isVisible && (
        <video
          src={src} // Sanity-hosted video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
