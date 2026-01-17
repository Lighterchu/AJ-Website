"use client";

import { useUser } from "@clerk/clerk-react"; // or @clerk/nextjs if using Next.js
import { useRouter } from "next/navigation"; // remove if not Next.js

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleSelectRole = async (role) => {
    if (!user) return;

    try {
      // Merge unsafeMetadata so we don’t overwrite existing data
      const newMetadata = {
        ...user.unsafeMetadata,
        role // “Promoter”, “Artist”, or “Punter”
      };

      await user.update({ unsafeMetadata: newMetadata });

      // Optional: reload user so metadata is fresh
      await user.reload();

      // Redirect after selecting
      router.push("/pages/Scene-and-Heard"); // change to whatever route you want
    } catch (err) {
      console.error("Error saving role:", err);
    }
  };

  if (!isLoaded) return <p>Loading…</p>;

  return (
    <main className="max-w-lg mx-auto mt-10  p-8 text-center">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Welcome! Choose Your Role</h1>
      <p className="mb-8">This helps us personalise your experience.</p>

      {/* Role Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Promoter */}
        <button className="role-card cursor-pointer" onClick={() => handleSelectRole("Poster")}>
          <span className="text-xl font-semibold">Promoter</span>
          <p className="text-sm text-gray-500">Manage events & promote artists</p>
        </button>

        {/* Artist */}
        <button className="role-card cursor-pointer" onClick={() => handleSelectRole("Artist")}>
          <span className="text-xl font-semibold">Artist</span>
          <p className="text-sm text-gray-500">Showcase your music & grow fans</p>
        </button>

        {/* Punter */}
        <button className="role-card cursor-pointer" onClick={() => handleSelectRole("Punter")}>
          <span className="text-xl font-semibold">Punter</span>
          <p className="text-sm text-gray-500">Get updates & follow events</p>
        </button>
      </div>
    </main>
  )
}
