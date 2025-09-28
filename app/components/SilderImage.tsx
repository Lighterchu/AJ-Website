import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";

interface ImageEvent {
  _id: string;
  imageUrl: string;
}

interface SlindingImagesProps {
  data: ImageEvent[];
}

export default function SlindingImages({ data }: SlindingImagesProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full overflow-hidden">
      <Fade
        duration={4000}
        transitionDuration={1000}
        infinite
        arrows={false}
        pauseOnHover={false}
      >
        {data.map((img, index) => (
          <div
            key={img._id}
            className="relative w-full"
            style={{ aspectRatio: "16/9" }} // maintain aspect ratio
          >
            <Image
              src={img.imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 100vw"
            />
          </div>
        ))}
      </Fade>
    </div>
  );
}
