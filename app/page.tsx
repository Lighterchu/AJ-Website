"use client";
// import Image from "next/image";
import SlindingImages from "./components/SilderImage";

export default function Home() {
  return (
    <div>
      <main className="w-screen text-white overflow-hidden relative">
        {/* Video Background */}
        <video
          src="/video/Video.mp4" // Path to your video file
          autoPlay
          loop
          muted
        />
        {/* Overlay */}
        
        <div className=" w-full flex justify-center">
          <div className=" p-6 max-w-xl text-center">
            <p className="text-lg mb-4">
              MVMNT Entertainment Bringing chaos to order, bass to basements,
              and community to the concrete. We throw parties that don’t ask for
              permission — just your presence.
            </p>
            <a
              href="https://www.eventbrite.com/e/blackout-because-therapy-is-expensive-tickets-1543015774719?aff=oddtdtcreator"
              className="text-teal-400 hover:underline font-semibold text-xl"
            >
              See Next Event
            </a>
          </div>
        </div>
      </main>
      <SlindingImages />
    </div>
  );
}
