import Image from "next/image";
import Link from "next/link";
import Gallery from "@/app/components/Client/GalleryList";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const events = [
  {
    id: 1,
    title: "Make It Loud",
    date: "August 15, 2025",
    description: "Let's blow the roof off the venue with the loudest beats and bass!",
    image: "/1080p_photos/NmGIxQo-.jpg",
  },
  {
    id: 2,
    title: "Summer Vibes",
    date: "July 20, 2025",
    description: "Sun, music, and good times all around!",
    image: "/1080p_photos/NmGIxQo-.jpg",
  },
  {
    id: 3,
    title: "Night Beats",
    date: "June 10, 2025",
    description: "Late night electronic sessions.",
    image: "/1080p_photos/NmGIxQo-.jpg",
  },
  {
    id: 4,
    title: "Festival Fun",
    date: "May 5, 2025",
    description: "Outdoor vibes with friends and family.",
    image: "/1080p_photos/NmGIxQo-.jpg",
  },
  {
    id: 5,
    title: "Urban Groove",
    date: "April 1, 2025",
    description: "City lights and underground sounds.",
    image: "/1080p_photos/NmGIxQo-.jpg",
  },
  {
    id: 6,
    title: "Bass Drop",
    date: "March 15, 2025",
    description: "Feel the bass shake the ground!",
    image: "/1080p_photos/NmGIxQo-.jpg",
  },
];

const GALLERY_QUERY = defineQuery(`
*[_type == "gallery"] {
    _id,
    name,
    "image": image.asset->url,
    short,
    images[]{
      asset->{
        _id,
        url
      }
    }
  }
`);

export default async function Events() {

   const res = await sanityFetch({ query: GALLERY_QUERY });
   const events = res.data; // ✅ <- important

   console.log(events)

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
        Photos Of Recent Events
      </h1>
      <Gallery photos={events} />
    
    </main>
  );
}
