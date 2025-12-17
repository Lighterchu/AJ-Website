// app/blog/[slug]/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const EVENTCOMMUNITY_QUERY = groq`
  *[_type == "communityevent" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    postDate,
    startDate,
    shortDescription,
    description,
    "imageUrl": image.asset->url
  }
`;

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const slugID = (await params).slug;

  const blog = await sanityFetch({
    query: EVENTCOMMUNITY_QUERY,
    params: { slug: slugID },
  });

  const blogData = blog?.data;

  if (!blogData) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">Post not found</h1>
        <Link
          href="/pages/Scene-and-Heard"
          className="text-indigo-400 hover:text-indigo-600 font-semibold transition"
        >
          ← Back to Scene and Heard
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-white space-y-12">
      {/* Back Link */}
      <Link
        href="/pages/Scene-and-Heard"
        className="text-indigo-400 hover:text-indigo-600 font-semibold transition"
      >
        ← Back to Scene and Heard
      </Link>

      {/* Title */}
      <h1 className="text-5xl font-extrabold leading-tight">{blogData.title}</h1>

      {/* Date */}
      <p className="text-gray-400">{new Date(blogData.blogDate).toLocaleDateString()}</p>

      {/* Image */}
      {blogData.imageUrl && (
        <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={blogData.imageUrl}
            alt={blogData.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}


      {/* Body */}
      <div className="prose prose-lg prose-invert mt-6 max-w-full">
        {blogData.description.split("\n\n").map((para: string, idx: number) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </main>
  );
}
