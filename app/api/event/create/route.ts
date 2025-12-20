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
const isValidDate = (value: string | number | Date | null | undefined) => {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export async function POST(req: Request) {
  const authObject = await auth();

  if (!authObject.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (!['admin', 'Poster'].includes(role as string)) {
    return NextResponse.json({ error: 'Not approved' }, { status: 403 });
  }

  const body = await req.json();
  const slug = generateSlug(body.title);


  if (!isValidDate(body.startDate)) {
    return NextResponse.json({ error: 'Invalid start date' }, { status: 400 });
  }

  interface CommunityEvent {
    _id: string;
    _type: string;
    name: string;
    genre: string;
    Link: string;
    short: string;
    description: string;
    startDate: string;
    location: string;
    approved: boolean;
    slug: {
      _type: string;
      current: string;
    };
    image?: {
      _type: string;
      asset: {
        _type: string;
        _ref: string;
      };
    };
    authorId: string;
    endDate?: string;
  }
  
 
  const doc: CommunityEvent = {
    _id: crypto.randomUUID(),
    _type: 'communityevent',
    name: body.title,
    genre: body.genre,
    Link: body.Link,
    short: body.shortDescription,
    description: body.description,
    startDate: new Date(body.startDate).toISOString(),
    location: body.location,
    approved: true,
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

  if (!['admin'].includes(role as string)) {
    doc._id =`drafts.${crypto.randomUUID()}`
    doc.approved = false;
  }


  if (isValidDate(body.endDate)) {
    doc.endDate = new Date(body.endDate).toISOString();
  }

  const created = await client.create(doc);

  return NextResponse.json({ success: true, created });
}
