"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // ISO date string
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );
  const [isLive, setIsLive] = useState(false);

  function calculateTimeLeft(date: string): TimeLeft {
    const difference = +new Date(date) - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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
      const next = calculateTimeLeft(targetDate);
      setTimeLeft(next);

      if (
        next.days === 0 &&
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        setIsLive(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isLive) {
    return (
      <div className="mt-6 text-center text-2xl font-bold text-neon-pink animate-pulse">
        
      </div>
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

          {/* Neon glow */}
          <div className="absolute inset-0 rounded-2xl shadow-neon-pink animate-pulse blur-lg pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
