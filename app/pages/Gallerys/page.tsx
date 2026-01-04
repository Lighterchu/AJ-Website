import Gallery from "@/app/components/Client/GalleryList";
import EventList from "@/app/components/Client/EventList"; // <-- client component
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";


const GALLERY_QUERY = defineQuery(`
*[_type == "gallery"]  | order(eventDate desc) {
    _id,
    name,
    eventDate,
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

const EVENTS_QUERY = defineQuery(`
  *[
    _type == "event" &&
    startDate < now()
  ]
  | order(startDate desc) {
    _id,
    name,
    short,
    startDate,
    slug,
    "imageUrl": imageUrl.asset->url
  }
`);


export const revalidate = 60;
export const dynamic = "force-dynamic";




export default async function Events() {

   const res = await sanityFetch({ query: GALLERY_QUERY });
   const eventsRes = await sanityFetch({ query: EVENTS_QUERY });
   const events = res.data; // ✅ <- important
   const eventsResData = eventsRes.data;
  if (!eventsResData) return notFound();
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
        Photos Of Recent Events
      </h1>
      <Gallery photos={events} />
      <h1 className="text-4xl font-extrabold my-12 text-center text-gray-900 dark:text-gray-100">
        Past Events
      </h1>
      <EventList events={eventsResData} showNewEvents={false}/>
    </main>
  );
}

