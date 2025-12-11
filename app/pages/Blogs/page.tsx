// pages/blog/page.tsx
import Image from "next/image";
import SimpleCalendar from "@/app/components/Client/Calendar";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import BlogCard from "@/app/components/Client/BlogCard";

// const BLOGS_QUERY = defineQuery(`
//  *[_type == "blog"] |  order(date desc) {
// name,
// slug,
// blogDate,
// shortDescription,
// description
// }

// `);

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

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "How Our Events Work Behind The Scenes",
      excerpt: "A quick breakdown of how we plan, manage and run events...",
      image: "/logos/MVMNT.png",
      date: "2025-02-01",
      slug: "behind-the-scenes",
    },
    {
      id: 2,
      title: "Top 5 Artists Performing This Month",
      excerpt: "A spotlight on some of the best talent performing soon...",
      image: "/logos/MVMNT.png",
      date: "2025-01-28",
      slug: "top-5-artists",
    },
    {
      id: 3,
      title: "What You Need To Know Before Attending A Show",
      excerpt: "Tips to make your night smooth, fun and safe...",
      image: "/logos/MVMNT.png",
      date: "2025-01-20",
      slug: "attending-a-show",
    },
    {
      id: 4,
      title: "Inside MVMNT — Artist Spotlight",
      excerpt: "Interviewing rising talent and showcasing new voices.",
      image: "/logos/MVMNT.png",
      date: "2025-01-18",
      slug: "artist-spotlight",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-white">
      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-tight mb-14">
        MVMNT News
      </h1>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <BlogCard />
      </div>
      <div className=" mt-32">
        <SimpleCalendar events={fakeEvents} />
      </div>
    </div>
  );
}
