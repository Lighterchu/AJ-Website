// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SocialLinks from "@/app/components/Client/SocialLinks";

const DJ_QUERY = groq`
  *[_type == "dj" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image,
    djsImages[]{
      "url": asset->url
    },
    soundcloud,
    instagram,
    facebook,
    tiktok,
    bio,
    duration
  }
`;

export default async function DjPage({ params }: { params: Promise<{ slug: string }> }) {
  const slugID = (await params).slug;
  const dj = await sanityFetch({
    query: DJ_QUERY,
    params: { slug: slugID },
  });

  if (!dj.data) return notFound();

  const djData = dj.data;
  const socialLinks = [
    {
      name: "SoundCloud",
      url: djData.soundcloud,
      icon: "mdi:soundcloud",
      color: "text-orange-500",
    },
    {
      name: "Instagram",
      url: djData.instagram,
      icon: "mdi:instagram",
      color: "text-pink-500",
    },
    {
      name: "Facebook",
      url: djData.facebook,
      icon: "mdi:facebook",
      color: "text-blue-700",
    },
    {
      name: "TikTok",
      url: djData.tiktok,
      icon: "ic:baseline-tiktok",
      color: "text-green-500",
    },
  ];
  

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div>
        <Link href="/pages/Gallerys">← Back</Link>
      </div>
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{djData.name}</h1>
        {djData.bio && <p className="text-white">{djData.bio}</p>}
      </header>

      {/* DJ Image */}
      {djData.djsImages?.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {djData.djsImages.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={img.url}
                alt={`${djData.name} image ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {/* Social Links */}
      <div className="flex justify-center space-x-6">
      <SocialLinks links={socialLinks} />
      </div>
    </main>
  );
}
