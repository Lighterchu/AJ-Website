// pages/blog/page.tsx
import SimpleCalendar from "@/app/components/Client/Calendar";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import BlogCard from "@/app/components/Client/BlogCard";
import Link from "next/link";
import { allEvents, allCommunityEvents } from "@/sanity/lib/allquries";
import CreateDropdown from "@/app/components/Client/CreateDropdown";
import ExploreFullSiteButton from "@/app/components/Client/GohomeButton";

import { notFound } from "next/navigation";
import { link } from "fs";

const POSTS_QUERY = defineQuery(`
 *[_type == "posts"] |  order(PostDate desc,  _createdAt desc) {
  _id,
  _createdAt,
  _type,
  PostDate,
  title,
  slug,
  "image": image.asset->url,
  blogDate,
  shortDescription,
  description
}`);

interface Event {
  name: string;
  date: string | Date;
  startDate?: string | Date;
  paided: boolean;
  genre?: string;
  _type?: string;
  description?: string;
}

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const res = await sanityFetch({ query: POSTS_QUERY });
  const ALLevents = await sanityFetch({ query: allEvents });
  const AllCommunityEvents = await sanityFetch({ query: allCommunityEvents });
  const blogPosts = res.data; // ✅ <- important
  if (!blogPosts) {
    return notFound();
  }

  const allCommunityEventsData = AllCommunityEvents.data;

  const normalizeAllOurEvents = ALLevents.data.map((event: Event) => ({
    title: event.name,
    date: new Date(event.startDate),
    genre: event.genre,
    type: "official",
    description: event.description,
  }));

  const normalizeAllCommunity = AllCommunityEvents.data.map((event: Event) => ({
    title: event.name,
    date: new Date(event.startDate),
    genre: event.genre,
    type: "community",
    description: event.description,
  }));

  const calendarEvents = [...normalizeAllOurEvents, ...normalizeAllCommunity];

  calendarEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-gray-900 dark:text-gray-50">
      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-tight mb-14">
        MVMNT & News
      </h1>
      <div className=" flex justify-between mb-10">
      <CreateDropdown />
      {/* <ExploreFullSiteButton /> */}
      </div>
    
      

      {/* Blog Posts Grid */}
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((item) => (
          <BlogCard key={item._id} item={item} />
        ))}
      </div>
      <div className=" mt-32">
        <SimpleCalendar events={calendarEvents} />
      </div>
      <h1 className="text-5xl font-extrabold tracking-tight mt-10">
        Community Events
      </h1>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {allCommunityEventsData.map((item) => (
          <BlogCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
