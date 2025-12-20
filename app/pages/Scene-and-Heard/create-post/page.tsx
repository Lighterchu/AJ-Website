"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { client } from "@/sanity/lib/client"; // your Sanity client

interface BlogForm {
  title: string;
  shortDescription: string;
  description: string;
  image: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateBlogPage() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const isAdmin = role === "admin";

  const [form, setForm] = useState<BlogForm>({
    title: "",
    shortDescription: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof BlogForm, value: string | File | null) => {
    if (field === "title" && typeof value === "string") {
      return value.trim().length < 3 ? "Title is too short" : "";
    }
    if (field === "description" && typeof value === "string") {
      return value.trim().length < 10 ? "Content is too short" : "";
    }
    return "";
  };

  const handleChange = (field: keyof BlogForm, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    form.title &&
    form.description;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    let imageRef = null;
    if (form.image) {
      try {
        const uploaded = await client.assets.upload('image', form.image, {
          contentType: form.image.type,
          filename: form.image.name,
        });
        imageRef = uploaded; // contains _id, url, etc.
      } catch (err) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }
    }

    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageRef }),
    });

    if (!res.ok) {
      toast.error("You are not approved to post");
    } else {
      toast.success(
        isAdmin
          ? "Post published 🎉"
          : "Post submitted for admin approval ✅"
      );
      setForm({ title: "", shortDescription: "", description: "", image: null });
    }

    setLoading(false);
  };

  const renderInput = (
    field: keyof BlogForm,
    label: string,
    textarea = false
  ) => {
    const value = form[field];
    const error = errors[field];
    const borderClass = error
      ? "border-red-500 shadow-[0_0_10px_#f87171,0_0_20px_#f87171]"
      : value
      ? "border-green-400 shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80]"
      : "border-white";

    if (field === "image") {
      return (
        <div>
          <label className="block text-green-400 mb-1">{label}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(field, e.target.files?.[0] || null)}
            className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${borderClass}`}
          />
          {value && <p className="mt-1 text-sm text-white">{(value as File).name}</p>}
        </div>
      );
    }

    return (
      <div>
        <label className="block text-green-400 mb-1">{label}</label>
        {textarea ? (
          <textarea
            rows={6}
            value={value as string}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${borderClass}`}
          />
        ) : (
          <input
            value={value as string}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${borderClass}`}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center pt-16 px-4">
      <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
        Create Post
      </h1>

      <p className="text-white text-center max-w-xl mb-12">
        Share news, updates, or stories with the community.
      </p>

      <div className="bg-black border rounded-xl max-w-2xl w-full p-8">
        {!isAdmin && (
          <div className="mb-6 rounded-lg border border-yellow-400 bg-yellow-400/10 p-4 text-yellow-300">
            <p className="font-semibold">Approval Required</p>
            <p className="text-sm mt-1">
              This post will be reviewed by an admin before it is published.
            </p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {renderInput("title", "Post Title")}
          {renderInput("shortDescription", "Short Description")}
          {renderInput("description", "Post Content", true)}
          {renderInput("image", "Upload Image")}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
