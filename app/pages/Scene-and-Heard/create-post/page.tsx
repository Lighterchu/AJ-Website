"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface BlogForm {
  title: string;
  shortDescription: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateBlogPage() {
  const [form, setForm] = useState<BlogForm>({
    title: "",
    shortDescription: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof BlogForm, value: string) => {
    switch (field) {
      case "title":
        return value.trim().length < 3 ? "Title is too short" : "";
      case "description":
        return value.trim().length < 10 ? "Content is too short" : "";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof BlogForm, value: string) => {
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

    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      toast.error("Not approved or error");
    } else {
      toast.success("Post created 🎉");
      setForm({ title: "", shortDescription: "", description: "" });
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

    return (
      <div>
        <label className="block text-green-400 mb-1">{label}</label>

        {textarea ? (
          <textarea
            rows={6}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${borderClass}`}
          />
        ) : (
          <input
            value={value}
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

      {/* Blog Card */}
      <div className="bg-black border rounded-xl max-w-2xl w-full p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {renderInput("title", "Post Title")}
          {renderInput("shortDescription", "Short Description")}
          {renderInput("description", "Post Content", true)}

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
