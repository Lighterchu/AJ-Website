import Image from "next/image";

export default function About() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/1080p_photos/NmGIxQo-.jpg"
        alt="Background"
        fill
        priority
        className="object-cover mb-4"
      />



      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-12">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/logo2.png"
            alt="Logo"
            width={430}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Text */}
        <div className=" mb-48  p-12 rounded-lg max-w-3xl w-full z-20">
          <p className="text-white text-center mt-40">
            About MVMNT Entertainment. Born in the back alleys of
            Naarm/Melbourne’s underground and raised on sweat, strobe lights,
            and stubborn ambition — MVMNT Entertainment isn’t just a brand. It’s
            a resistance. A rhythm. A response to a city that’s too often
            forgotten what it means to truly move.
          </p>
          <p className="text-white text-center mb-4">
            We throw events that hit harder than your ex’s closure speech.
            Blending hard techno, psytrance, DnB, and whatever other sonic
            weaponry we’ve got on hand — we don’t just curate lineups; we
            engineer chaos. The good kind.
          </p>
          <p className="text-white text-center mb-4">
            MVMNT’s ethos is simple: No elitism. No ego. Just energy. Whether
            it’s your first rave or your hundredth, if you&apos;re down to
            dance, you&apos;re family. We’ve hosted everyone from local legends
            to up-and-coming freaks with fire in their USBs — always with an eye
            toward inclusivity, intensity, and integrity.
          </p>
          <p className="text-white text-center">
            And through it all, we’ve kept one thing front and center: this
            scene survives when we build it together. So come dance with us and
            let free because this isn’t just a phase. It’s a MVMNT.
          </p>
        </div>
      </div>
    </div>
  );
}
