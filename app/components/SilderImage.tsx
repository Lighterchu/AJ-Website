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
  if (!data || data.length === 0) return null; // optional: hide slider if no images

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Fade
        duration={4000}
        transitionDuration={1000}
        infinite
        arrows={false}
        pauseOnHover={false}
      >
        {data.map((img, index) => (
          <div key={img._id} className="relative h-screen w-screen">
            <Image
              src={img.imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              className="w-full h-full object-fit"
            />
          </div>
        ))}
      </Fade>
    </div>
  );
}
