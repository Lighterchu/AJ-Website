// app/events/[slug]/page.jsx

import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const DJ_QUERY = groq`
  *[_type == "dj"]  {
    _id,
    name,
    slug,
    image,
    soundcloud,
    instagram,
    facebook,
    tiktok,
    bio,
    duration
  }
`;

export default async function DjPage() {
  const dj = await sanityFetch({
    query: DJ_QUERY,
  });

  if (!dj.data) return notFound();

  const djData = dj.data;

  const socialLinks = [
    { name: "SoundCloud", url: djData.soundcloud, color: "text-blue-500" },
    { name: "Instagram", url: djData.instagram, color: "text-pink-500" },
    { name: "Facebook", url: djData.facebook, color: "text-blue-700" },
    { name: "TikTok", url: djData.tiktok, color: "text-green-500" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{djData.name}</h1>
        {djData.bio && <p className="text-white">{djData.bio}</p>}
      </header>

      {/* DJ Image */}
      {djData.image?.asset?.url && (
        <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={djData.image.asset.url}
            alt={djData.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Social Links */}
      <div className="flex justify-center space-x-6">
        {socialLinks.map(
          (link) =>
            link.url && (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium hover:underline ${link.color}`}
              >
                {link.name}
              </Link>
            )
        )}
      </div>
    </main>
  );
}
