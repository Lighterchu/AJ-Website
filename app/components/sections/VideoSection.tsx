"use client";

import { useRef, useState, useEffect } from "react";

interface VideoSectionProps {
  src: string;
  poster?: string;
  aspectRatio?: string; // e.g., "16/9"
}

export default function VideoSection({
  src,
  poster = "/images/video-poster.jpg",
  aspectRatio = "16/9",
}: VideoSectionProps) {
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
      className="w-full relative overflow-hidden"
      style={{ aspectRatio }}
    >
      {isVisible ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className="w-full h-full object-cover"
        />
      ) : (
        <> </>
      )}
    </div>
  );
}
