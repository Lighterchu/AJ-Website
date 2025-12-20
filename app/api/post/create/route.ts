import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { client } from '@/sanity/lib/client';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

export async function POST(req: Request) {
  const authObject = await auth();
  if (!authObject.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role;
  const allowedRoles = ['admin', 'Poster'];

  if (!allowedRoles.includes(role as string)) {
    return NextResponse.json({ error: 'Not approved' }, { status: 403 });
  }

  const body = await req.json(); // JSON now, no FormData
  const slug = generateSlug(body.title);

  interface PostDocument {
    _id: string;
    _type: string;
    title: string;
    shortDescription: string;
    description: string;
    postDate: string;
    approved: boolean;
    slug: {
      _type: string;
      current: string;
    };
    authorId: string;
    image?: {
      _type: string;
      asset: {
        _type: string;
        _ref: string;
      };
    };
  }

  const doc: PostDocument = {
    _id: crypto.randomUUID(),
    _type: 'posts',
    title: body.title,
    shortDescription: body.shortDescription,
    description: body.description,
    postDate: new Date().toISOString(),
    approved: role === 'admin',
    slug: {
      _type: 'slug',
      current: slug,
    },
    authorId: authObject.userId,
  };

  if (body.image) {
    // body.image should be a Sanity image reference object
    doc.image = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: body.image._id, // the ID returned from Sanity upload
      },
    };
  }

  if (!role || role !== 'admin') {
    doc._id = `drafts.${crypto.randomUUID()}`;
    doc.approved = false;
  }

  const created = await client.create(doc);
  return NextResponse.json({ success: true, created });
}
