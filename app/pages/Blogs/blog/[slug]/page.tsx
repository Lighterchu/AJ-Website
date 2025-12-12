// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";

const BLOG_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    description,
    date,
    "imageUrl": image.asset->url,
    body
  }
`;

export default async function BlogPage({ params }) {
  const blog = await sanityFetch({
    query: BLOG_QUERY,
    params: { slug: params.slug },
  });

  const blogData = blog?.data;

  if (!blogData) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-white">
        <h1 className="text-4xl font-bold mb-6">Post not found</h1>
        <Link href="/pages/Blogs" className="text-indigo-500 hover:underline">
          ← Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-white">
      <Link href="/pages/Blogs" className="text-indigo-500 hover:underline">
        ← Back to Blog
      </Link>

      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-tight">
        {blogData.title}
      </h1>

      {/* Date */}
      <p className="text-gray-400">
        {new Date(blogData.date).toDateString()}
      </p>

      {/* Image */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={blogData.imageUrl}
          alt={blogData.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Body */}
      <div className="prose prose-lg text-white mt-6">
        {blogData.body?.split("\n\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </main>
  );
}
