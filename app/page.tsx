import VideoSection from "@/app/components/sections/VideoSection";
import SliderSection from "@/app/components/sections/SliderSection";
import HeroText from "@/app/components/sections/HeroText";
import { client } from "../sanity/lib/client";
import { nextEventQuery } from "../sanity/lib/allquries";
import { ImagesFromEvent } from "@/sanity/lib/imagesFromEventImage";

export default async function Home() {
  console.log("Rendering Home Page");
  const event = await client.fetch(nextEventQuery);
  const imageEvent = await client.fetch(ImagesFromEvent);
  return (
    <div className="bg-black h-1/2" >
      <VideoSection
        src="/video/_AHymsNz.mp4"
        poster="/images/video-poster.jpg"
        aspectRatio="16/9"
      />
      <HeroText />
      <SliderSection data={imageEvent} event={event} />
    </div>
  );
}

