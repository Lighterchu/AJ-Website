import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";

const fadeImages = [
  "/images/_MG_1062.jpg",
  "/images/_MG_1235.jpg",
  "/images/_MG_1258.jpg",
  "/images/_MG_1282.jpg",
  "/images/IMG_3104.JPG",
  "/images/IMG_3106.JPG",
  "/images/IMG_3108.JPG",
  "/images/IMG_3110.JPG",
  "/images/IMG_3111.JPG",
  "/images/IMG_3113.JPG",
  "/images/IMG_3127.JPG",
  "/images/IMG_3128.JPG",
  "/images/IMG_3209.JPG",
  "/images/IMG_3238.JPG",
];

export default function SlindingImages() {
  
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Fade
        duration={4000}
        transitionDuration={1000}
        infinite={true}
        arrows={false}
        pauseOnHover={false}
      >
        {fadeImages.map((img, index) => (
          <div key={index} className="relative h-screen w-screen">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Fade>
    </div>
  );
}
