"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { urlFor } from "@/sanity/lib/image";

type ContentItem = {
  _id: string;
  title: string;
  name?: string;
  short?: string;
  imageUrl?: string;
  genre?: string;
  date?: string; 
  startDate?: string;
  shortDescription?: string;
  description?: string;
  slug: { current: string };
  _type: "posts" | "communityevent";
};

export default function BlogCard({ item }: { item: ContentItem }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const role = user?.publicMetadata?.role;
  const isAdmin = role === "admin";

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete this ${item._type}?`
    );
    if (!confirmed) return;

    const endpoint =
      item._type === "posts"
        ? `/api/post/delete/${item.slug.current}`
        : `/api/event/delete/${item.slug.current}`;

    const res = await fetch(endpoint, { method: "DELETE" });

    if (!res.ok) {
      toast.error(`Failed to delete ${item._type}`);
      return;
    }

    toast.success(
      `${item._type.charAt(0).toUpperCase() + item._type.slice(1)} deleted`
    );
  };

  const linkHref =
    item._type === "posts"
      ? `/pages/Scene-and-Heard/post/${item.slug.current}`
      : `/pages/Scene-and-Heard/event/${item.slug.current}`;

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12 text-white">
      <div
        className="
          group bg-white/5 backdrop-blur-xl rounded-2xl
          border border-white/10 p-5 shadow-lg
          hover:shadow-2xl hover:-translate-y-1
          transition duration-300
          flex flex-col h-full
        "
      >
        <div className=" absolute right-0 p-2 mb-3 text-sm text-indigo-400 font-semibold">
          <h1>{item.genre}</h1>
        </div>
        {/* Image */}
        {item.imageUrl && (
          <div className="relative h-60 w-full overflow-hidden rounded-xl flex-shrink-0">
            <Image
              src={urlFor(item.imageUrl).url()}
              unoptimized
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              alt={item.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}
        {/* Content */}
        <div className="mt-5 flex-1 flex flex-col justify-between">
          <div>
            {item.date && (
              <p className="text-sm opacity-60">
                {new Date(item.date).toDateString()}
              </p>
            )}
            {item.startDate && (
              <p className="text-sm opacity-60">
                {new Date(item.startDate).toDateString()}
              </p>
            )}

            <h3 className="text-2xl font-bold mt-2">{item.title || item.name}</h3>

            {(item.shortDescription || item.short) && (
              <p className="opacity-80 mt-3 line-clamp-3">
                {item.shortDescription || item.short}
              </p>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <Link
              href={linkHref}
              className="inline-flex items-center text-indigo-400 font-semibold hover:underline"
            >
              Read more →
            </Link>

            {isAdmin && (
              <button
                type="button"
                className="mt-3 block rounded-md bg-red-600/80 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Delete {item._type}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
