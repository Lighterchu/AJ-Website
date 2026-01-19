"use client";

import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleSelectRole = async (role: string) => {
    if (!user) return;

    try {
      const newMetadata = {
        ...user.unsafeMetadata,
        role,
      };

      await user.update({ unsafeMetadata: newMetadata });
      await user.reload();

      router.push("/pages/Scene-and-Heard");
    } catch (err) {
      console.error("Error saving role:", err);
    }
  };

  if (!isLoaded) return <p className="text-center">Loading…</p>;

  return (
    <main className="max-w-lg mx-auto mt-10 p-8 text-center
     
      text-gray-900 dark:text-gray-100
      rounded-2xl shadow-sm"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">
        Welcome! Choose Your Role
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        This helps us personalise your experience.
      </p>

      {/* Role Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Promoter */}
        <button
          onClick={() => handleSelectRole("Poster")}
          className="
            w-full p-6 text-left rounded-xl border
            bg-white dark:bg-neutral-800
            border-gray-200 dark:border-neutral-700
            text-gray-900 dark:text-gray-100
            hover:shadow-lg hover:border-gray-300 dark:hover:border-neutral-600
            transition
          "
        >
          <span className="text-xl font-semibold">
            Promoter
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage events & promote artists
          </p>
        </button>

        {/* Artist */}
        <button
          onClick={() => handleSelectRole("Artist")}
          className="
            w-full p-6 text-left rounded-xl border
            bg-white dark:bg-neutral-800
            border-gray-200 dark:border-neutral-700
            text-gray-900 dark:text-gray-100
            hover:shadow-lg hover:border-gray-300 dark:hover:border-neutral-600
            transition
          "
        >
          <span className="text-xl font-semibold">
            Artist
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showcase your music & grow fans
          </p>
        </button>

        {/* Punter */}
        <button
          onClick={() => handleSelectRole("Punter")}
          className="
            w-full p-6 text-left rounded-xl border
            bg-white dark:bg-neutral-800
            border-gray-200 dark:border-neutral-700
            text-gray-900 dark:text-gray-100
            hover:shadow-lg hover:border-gray-300 dark:hover:border-neutral-600
            transition
          "
        >
          <span className="text-xl font-semibold">
            Punter
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get updates & follow events
          </p>
        </button>
      </div>
    </main>
  );
}
