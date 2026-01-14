"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Countdown from "./Countdown";

export default function LaunchGate({
  launchDate,
  children,
}: {
  launchDate: string;
  children: React.ReactNode;
}) {
  const [isLive, setIsLive] = useState(
    Date.now() >= new Date(launchDate).getTime()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() >= new Date(launchDate).getTime()) {
        setIsLive(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  if (!isLive) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
        {/* 🔥 LOGO */}
        <Image
          unoptimized
          src="/images/logo1.png"
          alt="MVMNT Logo"
          width={300}
          height={200}
          className="object-contain rotate-90"
          priority
        />

        {/* ⏳ COUNTDOWN */}
        <Countdown targetDate={launchDate} />

        {/* ✨ TAGLINE */}
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Modern Visionaries Making New Traditions.
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
