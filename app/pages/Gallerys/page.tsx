import Image from "next/image";
import Link from "next/link";
import Gallery from "@/app/components/Client/GalleryList";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const GALLERY_QUERY = defineQuery(`
*[_type == "gallery"] {
    _id,
    name,
    slug,
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
  
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
        Photos Of Recent Events
      </h1>
      <Gallery photos={events} />
    
    </main>
  );
}
