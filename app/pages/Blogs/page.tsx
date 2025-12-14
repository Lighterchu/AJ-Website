// pages/blog/page.tsx
import SimpleCalendar from "@/app/components/Client/Calendar";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import BlogCard from "@/app/components/Client/BlogCard";
import Link from "next/link";
import { allEvents } from "@/sanity/lib/allquries";


const BLOGS_QUERY = defineQuery(`
 *[_type == "blog"] |  order(date desc) {
_id,
  title,
  slug,
  "imageUrl": imageUrl.asset->url,
  blogDate,
  shortDescription,
  description
}`);

const fakeEvents = [
  {
    name: "Bass Drop Event",
    date: "2025-12-05",
    paided: true,
    description: "Lock in and shut up",
  },
  {
    name: "Stump Nation",
    date: "2025-12-05",
    paided: false,
    description: "Underground event at secret location.",
  },
  {
    name: "wild Goats",
    date: "2025-12-05",
    paided: true,
    description: "We are the new Wild Horses :P ",
  },
  {
    name: "Sent TO the ER",
    date: "2025-12-05",
    paided: false,
    description: "Bass Rape",
  },
  {
    name: "Night Crawlers",
    date: "2025-12-14",
    description: "Deep bass and late-night vibes.",
    paided: true,
  },
];

export default async function BlogPage() {
  const res = await sanityFetch({ query: BLOGS_QUERY });
  const ALLevents = await sanityFetch({ query: allEvents });
  const blogPosts = res.data; // ✅ <- important
  
 

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-white">
      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-tight mb-14">
        MVMNT News
      </h1>
      <Link
        href="/pages/Blogs/create-blog"
        className="
        inline-flex items-center gap-2
        rounded-md
        bg-green-700 px-4 py-2
        text-sm font-semibold text-white
        shadow-sm
        hover:bg-green-600
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        transition
        "
      >
        Create blog
      </Link>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((item) => (
          <BlogCard key={item._id} post={item} />
        ))}
      </div>
      <div className=" mt-32">
        <SimpleCalendar events={ALLevents.data} />
      </div>
    </div>
  );
}
