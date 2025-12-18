// app/events/page.tsx
import EventList from "../../components/Client/EventList"; // <-- client component
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";

const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(startDate desc) {
    _id,
    name,
    short,  
    startDate,
    slug, 
    "imageUrl": imageUrl.asset->url
  }
`);

export default async function EventsPage() {
  const res = await sanityFetch({ query: EVENTS_QUERY });
  const events = res.data; // ✅ <- important

  if (!events) return notFound();
  console.log("Events Data:", events);

  

  return (
    <main className="w-full mx-2  px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Events</h1>
      <EventList events={events} showNewEvents={true}  />
    </main>
  );
}
