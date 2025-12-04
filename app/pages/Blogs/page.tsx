// pages/blog/page.tsx
import Image from "next/image";
import SimpleCalendar from "@/app/components/Client/Calendar";

//TODO: need to hook up to real data source later
//TODO: need to implement pagination later

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
  }
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

      {/* FEATURED */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10"></div>

        <Image
          src={posts[0].image}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          alt={posts[0].title}
        />

        <div className="absolute bottom-8 left-8 z-20">
          <p className="text-sm opacity-80">
            {new Date(posts[0].date).toDateString()}
          </p>
          <h2 className="text-3xl font-bold mt-2">{posts[0].title}</h2>
          <p className="max-w-xl mt-2 opacity-90">{posts[0].excerpt}</p>

          <a
            href={`/pages/Blogs/blog/${posts[0].slug}`}
            className="inline-block mt-5 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-300 transition"
          >
            Read More →
          </a>
        </div>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.slice(1).map((post) => (
          <a
            key={post.id}
            href={`/pages/Blogs/blog/${post.slug}`}
            className="group bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-3 shadow-lg hover:shadow-2xl transition shadow-black/40 hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={post.image}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                alt={post.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="p-3 mt-2">
              <p className="text-sm opacity-60">
                {new Date(post.date).toDateString()}
              </p>

              <h3 className="text-xl font-bold mt-2 group-hover:text-indigo-400 transition">
                {post.title}
              </h3>

              <p className="opacity-80 mt-2 line-clamp-3">{post.excerpt}</p>

              <span className="inline-block mt-4 text-indigo-400 font-semibold group-hover:underline">
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className=" mt-32">
        <SimpleCalendar events={fakeEvents} />
      </div>
    </div>
  );
}
