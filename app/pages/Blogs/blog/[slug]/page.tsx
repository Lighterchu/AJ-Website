// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

//TODO: need to hook up to real data source later

// Mock posts data (same as blog page)
const posts = [
  {
    id: 1,
    title: "How Our Events Work Behind The Scenes",
    excerpt: "A quick breakdown of how we plan, manage and run events...",
    image: "/logos/MVMNT.png",
    date: "2025-02-01",
    slug: "behind-the-scenes",
    body: `### Behind the Scenes

We plan everything meticulously. From setup to artist management, here’s a peek at our workflow.

- Schedule coordination
- Stage setup
- Artist liaising

Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  },
  {
    id: 2,
    title: "Top 5 Artists Performing This Month",
    excerpt: "A spotlight on some of the best talent performing soon...",
    image: "/logos/MVMNT.png",
    date: "2025-01-28",
    slug: "top-5-artists",
    body: `### Top Artists

This month’s top performers are bringing energy and talent you won't forget.

1. DJ Supreme
2. BeatMaster Flex
3. Rhythm King`
  },
  {
    id: 3,
    title: "What You Need To Know Before Attending A Show",
    excerpt: "Tips to make your night smooth, fun and safe...",
    image: "/logos/MVMNT.png",
    date: "2025-01-20",
    slug: "attending-a-show",
    body: `### Show Tips

Make sure you arrive early, stay hydrated, and enjoy the music!`
  },
];

export default function BlogPage({ params }) {
  const { slug } = params;

  // Find post from mock data
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
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
      <h1 className="text-5xl font-extrabold tracking-tight">{post.title}</h1>

      {/* Date */}
      <p className="text-gray-400">{new Date(post.date).toDateString()}</p>

      {/* Main Image */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      {/* Body */}
      <div className="prose prose-lg text-white mt-6">
        {post.body.split("\n\n").map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Back Link */}
      <Link
        href="/pages/Blogs"
        className="inline-block mt-10 text-indigo-500 font-semibold hover:underline"
      >
        ← Back to Blog
      </Link>
    </main>
  );
}
