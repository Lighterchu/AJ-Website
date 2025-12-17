// app/api/blog/create/route.ts
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { client } from '@/sanity/lib/client';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-')     // replace spaces with dashes
    .replace(/--+/g, '-')     // replace multiple dashes with single dash
}

export async function POST(req: Request) {
  const authObject = await auth()
  if (!authObject.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  const allowedRoles = ['admin', 'Poster']

  if (!allowedRoles.includes(role as string)) {
    return NextResponse.json({ error: 'Not approved' }, { status: 403 })
  }


  const body = await req.json();
  const slug = generateSlug(body.title);

  const doc = {
    _type: 'posts',
    title: body.title,
    shortDescription: body.shortDescription,
    description: body.description,
    postDate: new Date().toISOString(),
    slug: {
      _type: 'slug',
      current: slug,
    },
    authorId: authObject.userId,
  };

  const created = await client.create(doc);

  return NextResponse.json({ success: true, created });
}
