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
  const aboutus = res.data;

  if (!aboutus) {
    return (
      <div className="min-h-screen text-gray-900 dark:text-gray-100 flex items-center justify-center px-4">
        <p>No About Us content found.</p>
      </div>
    );
  }

  const sections = [
    { title: "Our Mission", content: aboutus.mission },
    { title: "Our Goals", content: aboutus.goals },
    { title: "Founder Story", content: aboutus.founderStory },
    { title: "Why We Exist", content: aboutus.whyWeExist },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-gray-900 dark:text-gray-100">
      {/* Background */}
      {/* <Image
        src="/backgrounds/testingbackground.jpg"
        alt="Background"
        fill
        priority
        className="object-cover opacity-40"
      /> */}

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-start px-6 py-16 md:py-24 max-w-6xl mx-auto space-y-12 md:space-y-16">
        {/* Text Sections */}
        {sections.map(
          (section, index) =>
            section.content && (
              <section
                key={index}
                className="w-full md:w-3/4 lg:w-1/2 px-4 md:px-0 text-center space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  {section.title}
                </h2>
                <div className="text-sm md:text-base leading-relaxed">
                  <PortableText value={section.content} />
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
}
