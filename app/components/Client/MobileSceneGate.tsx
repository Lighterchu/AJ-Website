"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MobileSceneGate() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const firstTime = localStorage.getItem("firstTime");
    const mode = localStorage.getItem("mode");

    // First ever mobile visit
    if (!firstTime) {
      localStorage.setItem("firstTime", "no");
      localStorage.setItem("mode", "mobile");
      router.replace("/");
      return;
    }

    // If NOT in drunk mode, force Scene & Heard
    if (mode !== "full") {
      router.replace("/pages/Scene-and-Heard");
    }

  }, [router]);

  return null;
}
