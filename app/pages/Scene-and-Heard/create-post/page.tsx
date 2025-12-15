// app/blog/create/page.tsx
'use client';
import { useState } from 'react';
import { toast } from 'sonner'

export default function CreateBlogPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    

    const form = e.currentTarget;
   
    const data = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      shortDescription: form.shortDescription.value,
      description: form.description.value,
    };

    const res = await fetch('/api/post/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error('Not approved or error')
    } else {
      toast.success('Blog created 🎉')
      form.reset();
    }

    setLoading(false);
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-8">Create Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input name="title" placeholder="Title" className="w-full p-3 rounded bg-black/40 border" required />
        <textarea name="shortDescription" placeholder="Short description" className="w-full p-3 rounded bg-black/40 border" />
        <textarea name="description" placeholder="Full content" rows={8} className="w-full p-3 rounded bg-black/40 border" />
        {/* <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full p-3 rounded bg-black/40 border"
        /> */}
        <button disabled={loading} className="bg-indigo-600 px-6 py-3 rounded font-semibold">
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </main>
  );
}
