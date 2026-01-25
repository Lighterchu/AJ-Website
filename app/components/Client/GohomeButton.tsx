"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DrunkModeToggle() {
  const router = useRouter();
  const [mode, setMode] = useState("full")

  // Read current mode on mount
  useEffect(() => {
    const stored = localStorage.getItem("mode");
    if (stored === "full") {
      setMode("full");
    } else {
      setMode("scene");
    }
  }, []);

  const toggleMode = () => {
    if (mode === "scene") {
      // Exit Drunk Mode → full site
      localStorage.setItem("mode", "full");
      setMode("full");
      router.push("/");
    } else {
      // Enter Drunk Mode → Scene & Heard
      localStorage.setItem("mode", "scene");
      setMode("scene");
      router.push("/pages/Scene-and-Heard");
    }
  };

  const isDrunkMode = mode === "scene";

  return (
    <button
      onClick={toggleMode}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-md
        text-sm font-medium transition
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2
        focus-visible:ring-offset-black
        ${
          isDrunkMode
            ? "bg-purple-700 text-white hover:bg-purple-600 focus-visible:ring-purple-400"
            : "bg-gray-800 text-gray-300 hover:text-white focus-visible:ring-gray-500"
        }
      `}
      aria-pressed={isDrunkMode}
      aria-label={
        isDrunkMode ? "Exit Drunk Mode" : "Enter Drunk Mode"
      }
    >
      {isDrunkMode ? (
        <>
          🍻 Drunk Mode
          <span className="text-xs opacity-80">(on)</span>
        </>
      ) : (
        <>
          🍻 Drunk Mode
          <span className="text-xs opacity-80">(off)</span>
        </>
      )}
    </button>
  );
}
