import VideoSection from "@/app/components/sections/VideoSection";
import SliderSection from "@/app/components/sections/SliderSection";
import HeroText from "@/app/components/sections/HeroText";
import { client } from "../sanity/lib/client";
import { nextEventQuery } from "../sanity/lib/allquries";
import { ImagesFromEvent } from "@/sanity/lib/imagesFromEventImage";
import MobileSceneGate from "@/app/components/Client/MobileSceneGate";
import { homepageVideoQuery } from "@/sanity/lib/allquries";


export default async function Home() {
  const event = await client.fetch(nextEventQuery);
  const imageEvent = await client.fetch(ImagesFromEvent);
  const video = await client.fetch(homepageVideoQuery);
  console.log(video)

  return (
    <div className="bg-black" >
      {/* Needs more work on mobile */}
      {/* <MobileSceneGate /> */}
      <VideoSection
        src={video[0]?.videoFile}
        poster={video[0]?.poster ?? "/images/video-poster.jpg"} // fallback
        aspectRatio={video[0]?.aspectRatio ?? "16/9"}
      />
      {/* <HeroText /> */}
      <SliderSection data={imageEvent} event={event} />
    </div>
  );
}

