"use client";

import { useState } from "react";
import { toast } from "sonner";

interface EventForm {
  title: string;
  shortDescription: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  ticketUrl: string;
  genre: string;
}

interface FormErrors {
  [key: string]: string;
}

const GENRE_OPTIONS = [
  { title: "RnB / Hip Hop", value: "rnb" },
  { title: "House", value: "house" },
  { title: "Tech House", value: "tech house" },
  { title: "Trance / Techno", value: "trance tech" },
  { title: "Hard Dance / Groove", value: "hard dance - groove" },
  { title: "Hard Techno", value: "hard tech" },
  { title: "DnB", value: "dnb" },
  { title: "Psy", value: "psy" },
  { title: "Hardstyle", value: "hardstyle" },
  { title: "Bass", value: "bass" },
  { title: "Minimal", value: "minimal" },
];

export default function CreateEventPage() {
  const [form, setForm] = useState<EventForm>({
    title: "",
    shortDescription: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    ticketUrl: "",
    genre: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof EventForm, value: string) => {
    switch (field) {
      case "title":
        return value.trim().length < 3 ? "Title is too short" : "";
      case "location":
        return value.trim().length < 2 ? "Location is required" : "";
      case "startDate":
        return !value ? "Start date required" : "";
      case "description":
        return value.trim().length < 10 ? "Description is too short" : "";
      case "genre":
        return !value ? "Please select a genre" : "";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof EventForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    form.title &&
    form.startDate &&
    form.location &&
    form.genre;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    const res = await fetch("/api/event/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      toast.error("Error creating event");
    } else {
      toast.success("Event submitted 🎉");
      setForm({
        title: "",
        shortDescription: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        ticketUrl: "",
        genre: "",
      });
    }

    setLoading(false);
  };

  const getBorderClass = (field: keyof EventForm) => {
    const value = form[field];
    const error = errors[field];

    return error
      ? "border-red-500 shadow-[0_0_10px_#f87171,0_0_20px_#f87171]"
      : value
      ? "border-green-400 shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80]"
      : "border-white";
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center pt-16 px-4">
      <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
        Submit an Event
      </h1>

      <p className="text-white text-center max-w-xl mb-12">
        Share your upcoming event with the community.
      </p>

      <div className="bg-black border rounded-xl max-w-2xl w-full p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-green-400 mb-1">Event Title</label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "title"
              )}`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Genre Select */}
          <div>
            <label className="block text-green-400 mb-1">Genre</label>
            <select
              value={form.genre}
              onChange={(e) => handleChange("genre", e.target.value)}
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "genre"
              )}`}
            >
              <option value="">Select genre</option>
              {GENRE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.title}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
            )}
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-green-400 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={form.shortDescription}
              onChange={(e) =>
                handleChange("shortDescription", e.target.value)
              }
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "shortDescription"
              )}`}
            />
          </div>

          <div>
            <label className="block text-green-400 mb-1">
              Full Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "description"
              )}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Dates */}
          <div>
            <label className="block text-green-400 mb-1">Start Date</label>
            <input
              type="datetime-local"
              value={form.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "startDate"
              )}`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-green-400 mb-1">End Date</label>
            <input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "endDate"
              )}`}
            />
          </div>

          {/* Location & Ticket */}
          <div>
            <label className="block text-green-400 mb-1">Location</label>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "location"
              )}`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location}
              </p>
            )}
          </div>

          <div>
            <label className="block text-green-400 mb-1">Ticket Link</label>
            <input
              value={form.ticketUrl}
              onChange={(e) => handleChange("ticketUrl", e.target.value)}
              className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(
                "ticketUrl"
              )}`}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
