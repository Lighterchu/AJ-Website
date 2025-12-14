'use client'

import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { toast } from 'sonner'

type BlogPost = {
  title: string
  _id: string
  imageUrl: string
  blogDate: string
  shortDescription: string
  description: string
  slug: { current: string }
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const { user, isLoaded } = useUser()
  console.log(post._id)

  if (!isLoaded) return null

  const role = user?.publicMetadata?.role
  const isAdmin = role === 'admin'

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this blog?')
  
    if (!confirmed) return
  
    const res = await fetch(`/api/blog/delete/${post.slug.current}`, {
      method: 'DELETE',
    })
  
    if (!res.ok) {
      toast.error('Failed to delete blog')
      return
    }
  
    toast.success('Blog deleted')
  }
  

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-white">
      <div
        className="
          group bg-white/5 backdrop-blur-xl rounded-2xl
          border border-white/10 p-5 shadow-lg
          hover:shadow-2xl hover:-translate-y-1
          transition duration-300
        "
      >
        {/* Image */}
        <div className="relative h-60 w-full overflow-hidden rounded-xl">
          <Image
            src={post.imageUrl}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            alt={post.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="mt-5">
          <p className="text-sm opacity-60">
            {new Date(post.blogDate).toDateString()}
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {post.title}
          </h3>

          <p className="opacity-80 mt-3 line-clamp-3">
            {post.shortDescription}
          </p>

          <div className="flex flex-col">
          <Link
            href={`/pages/Blogs/blog/${post.slug.current}`}
            className="inline-flex items-center mt-5 text-indigo-400 font-semibold hover:underline"
          >
            Read more →
          </Link>

          {/* Admin-only action */}
          {isAdmin && (
            <button
              type="button"
              className="mt-3 block rounded-md bg-red-600/80 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Delete blog
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
