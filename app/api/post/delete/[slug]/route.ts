import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { client } from '@/sanity/lib/client'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth()
  const slugParams = (await params).slug;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await currentUser()
  if (user?.publicMetadata?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Get the _id from the slug
  const blog = await client.fetch(
    `*[_type=="post" && slug.current==$slug][0]{_id}`,
    { slug: slugParams}
  )

  if (!blog?._id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await client.delete(blog._id)

  return NextResponse.json({ success: true })
}
