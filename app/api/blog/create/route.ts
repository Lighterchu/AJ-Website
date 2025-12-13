// app/api/blog/create/route.ts
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  const authObject = await auth()
  if (!authObject.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (role !== 'blogger') {
    return NextResponse.json({ error: 'Not approved' }, { status: 403 });
  }

  const body = await req.json();

  const doc = {
    _type: 'blog',
    title: body.title,
    shortDescription: body.shortDescription,
    description: body.description,
    blogDate: new Date().toISOString(),
    slug: {
      _type: 'slug',
      current: body.slug,
    },
    authorId: authObject.userId,
  };

  const created = await client.create(doc);

  return NextResponse.json({ success: true, created });
}
