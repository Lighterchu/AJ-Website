import Image from "next/image";
import Link from "next/link";

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

export default function Events() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
        Photos Of Recent Events
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map(({ id, title, date, description, image }) => (
          <div
            key={id}
            className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative h-64 w-full">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={id === 1}
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
              />
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h2 className="text-white text-xl font-semibold">{title}</h2>
              <time className="text-gray-300 text-sm mb-2">{date}</time>
              <p className="text-gray-200 text-sm line-clamp-2">{description}</p>
              <Link
                href={`/pages/UpComingEvents/event/${id}`}
                className="mt-3 inline-block text-sm font-semibold text-cyan-400 hover:text-cyan-600"
                aria-label={`More details about ${title}`}
              >
                Check out the link up →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
