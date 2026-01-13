"use client";

import { useEffect, useState } from "react";
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
  console.log(launchDate)
  
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
        <Countdown targetDate={launchDate} />
        <p className="text-xs uppercase tracking-widest text-gray-500">
          Modern Visionaries Making New Traditions.
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
