// import { useRef, useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
export default function VideoSection({
  src,
  poster,
  aspectRatio = "16/9",
}) {
  // const videoRef = useRef<HTMLDivElement>(null);
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   if (!videoRef.current) return;
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //         observer.disconnect();
  //       }
  //     },
  //     { threshold: 0.25 }
  //   );
  //   observer.observe(videoRef.current);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <div
      className={"w-full relative overflow-hidden transition-opacity duration-700" }
      style={{ aspectRatio }}
    >
      <video
          src={src} // Sanity-hosted video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
    </div>
  );
}
