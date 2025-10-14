import { sanityFetch } from "@/sanity/lib/live"
import { allEvents } from "@/sanity/lib/allquries"

export default async function Page() {
  const { data: liveData } = await sanityFetch({ query: allEvents })
  console.log(liveData)

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Live Sanity Test</h1>
      {liveData?.map((post: any) => (
        <p className=" text-white" key={post._id}>{post.name}</p>
      ))}
    </div>
  )
}
