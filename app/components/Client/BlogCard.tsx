import Image from "next/image";

type BlogPost = {
    title: string;
    image: string;
    blogDate: string;
    shortDescription: string;
    description: string;
    slug: { current: string };
  };    

export default function BlogCard({post}: {post: BlogPost}) {
//   const post = {
//     id: 1,
//     title: "How Our Events Work Behind The Scenes",
//     excerpt: "A quick breakdown of how we plan, manage and run events...",
//     image: "/logos/MVMNT.png",
//     date: "2025-02-01",
//     slug: "behind-the-scenes",
//   };
console.log(post);

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-white">
      <a
        href={`/pages/Blogs/blog/${post.slug.current}`}
        className="block group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
      >
        {/* Image Section */}
        <div className="relative h-60 w-full overflow-hidden rounded-xl">
          <Image
            src={post.image}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Text Section */}
        <div className="mt-5">
          <p className="text-sm opacity-60">
            {new Date(post.blogDate).toDateString()}
          </p>

          <h3 className="text-2xl font-bold mt-2 group-hover:text-indigo-400 transition">
            {post.title}
          </h3>

          <p className="opacity-80 mt-3 line-clamp-3">{post.shortDescription}</p>

          <span className="inline-block mt-5 text-indigo-400 font-semibold group-hover:underline">
            Read More →
          </span>
        </div>
      </a>
    </div>
  );
}
