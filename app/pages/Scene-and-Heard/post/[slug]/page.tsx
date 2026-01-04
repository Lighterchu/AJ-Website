// app/blog/[slug]/page.tsx
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const POST_QUERY = groq`
  *[_type == "posts" && slug.current == $slug][0] {
    _id,
    title,
    date,
    "slug": slug.current,
    postDate,
    shortDescription,
    description,
    "imageUrl": image.asset->url
  }
`;

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const slugID = (await params).slug;

  const blog = await sanityFetch({
    query: POST_QUERY,
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
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-900 dark:text-gray-50 space-y-12">
      {/* Back Link */}
      <Link
        href="/pages/Scene-and-Heard"
        className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-lg font-semibold text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-lg"
      >
        ← Back to Scene and Heard
      </Link>

      {/* Title */}
      <h1 className="text-5xl font-extrabold leading-tight">{blogData.title}</h1>

      {/* Date */}
      <p className="text-gray-400">{new Date(blogData.postDate).toLocaleDateString()}</p>

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
