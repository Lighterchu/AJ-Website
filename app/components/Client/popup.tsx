"use client";

import { useState, useEffect } from "react";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const tomorrow9pm = new Date();
    tomorrow9pm.setDate(now.getDate() + 1); // Move to tomorrow
    tomorrow9pm.setHours(21, 0, 0, 0); // 9:00 PM

    // Show popup if before tomorrow 9pm
    if (now < tomorrow9pm) {
      setIsOpen(true);

      const timeUntil9pm = tomorrow9pm.getTime() - now.getTime();

      const timer = setTimeout(() => {
        setIsOpen(false); // Automatically close at 9pm tomorrow
      }, timeUntil9pm);

      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setIsOpen(false); // Already past tomorrow 9pm (edge case)
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-4 py-6 flex justify-center">
      <div className="bg-green-500 text-white rounded-2xl w-full max-w-xl p-4 md:p-6 shadow-md relative transition hover:shadow-lg">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white hover:text-gray-200 text-2xl font-bold"
          aria-label="Close popup"
        >
          ×
        </button>

        {/* Mobile version */}
        <h1 className="text-center text-black text-sm sm:text-base md:hidden">
        Use code <span className="font-semibold">MVMNT</span>  <span className="font-semibold">25% off</span> tickets to METANOIA, March 27th.
        </h1>

        {/* Desktop version */}
        <h1 className="text-center text-sm sm:text-base hidden md:block text-black">
          Use code <span className="font-semibold">MVMNT</span> at checkout for{" "}
          <span className="font-semibold">25% off</span> tickets to METANOIA, March 27th.
        </h1>
      </div>
    </div>
  );
}
