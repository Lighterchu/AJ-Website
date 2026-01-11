"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // ISO date string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft();
      setTimeLeft(newTimeLeft);

      // 🔥 AUTO-REFRESH WHEN TIME HITS ZERO
      if (!newTimeLeft) {
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <p className="text-3xl font-extrabold text-neon-green animate-pulse">
        🎉 LET’S GO!
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div
          key={label}
          className="relative flex flex-col items-center justify-center w-24 h-24 bg-gradient-to-br from-green-800 via-green-600 to-green-500 rounded-2xl shadow-xl border-2 border-neon-pink hover:scale-105 transform transition-all duration-300"
        >
          <div className="text-3xl font-bold text-white drop-shadow-lg">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-200 mt-1">
            {label}
          </div>
          {/* Neon glow effect */}
          <div className="absolute inset-0 rounded-2xl shadow-neon-pink animate-pulse blur-lg"></div>
        </div>
      ))}
    </div>
  );
}
