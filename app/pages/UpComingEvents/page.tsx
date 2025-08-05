// app/events/page.tsx
import EventList from "../../components/Client/EventList"; // <-- client component
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date desc) {
    _id,
    name,
    short,  
    date,
    slug, 
    "imageUrl": imageUrl.asset->url
  }
`);

export default async function EventsPage() {
  const res = await sanityFetch({ query: EVENTS_QUERY });
  const events = res.data; // ✅ <- important

  console.log(events)

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>
      <EventList events={events} />
    </main>
  );
}
