"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MobileSceneGate() {
  const router = useRouter();

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const mode = localStorage.getItem("mode");

    if (isMobile && mode !== "full") {
      router.replace("/pages/Scene-and-Heard");
    }
  }, [router]);

  return null;
}
