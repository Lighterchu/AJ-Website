import Image from "next/image";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "@portabletext/react";

const ABOUTUS = groq`*[_type == "aboutUs"][0]{
  mission,
  goals,
  founderStory,
  whyWeExist
}`;

export default async function About() {
  const res = await sanityFetch({ query: ABOUTUS });
  const aboutus = res.data; // important

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <Image
        src="/backgrounds/aboutusPage.jpeg"
        alt="Background"
        fill
        priority
        className="object-cover opacity-40"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-start px-6 py-16 md:py-24 max-w-6xl mx-auto space-y-16">
        {/* Logo */}
        <div className="mb-6 max-w-[250px] md:max-w-[400px]">
          <Image
            unoptimized
            src="/images/logo1.png"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain w-full h-auto rotate-90"
          />
        </div>

        {/* Mission Section */}
        {aboutus.mission && (
          <section className="prose prose-lg md:prose-xl text-white text-center">
            <PortableText value={aboutus.mission} />
          </section>
        )}

        {/* Goals Section */}
        {aboutus.goals && (
          <section className="prose prose-lg md:prose-xl text-white">
            <PortableText value={aboutus.goals} />
          </section>
        )}

        {/* Founder Story */}
        {aboutus.founderStory && (
          <section className="prose prose-lg md:prose-xl text-white">
            <PortableText value={aboutus.founderStory} />
          </section>
        )}

        {/* Why We Exist */}
        {aboutus.whyWeExist && (
          <section className="prose prose-lg md:prose-xl text-white">
            <PortableText value={aboutus.whyWeExist} />
          </section>
        )}
      </div>
    </div>
  );
}
