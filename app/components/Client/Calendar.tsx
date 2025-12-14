"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Event {
  name: string;
  date: string | Date;
  paided: boolean;
  type?: string;
  description?: string;
}

export default function SimpleCalendar({ events = [] }: { events?: Event[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  

  // 🔑 Normalize all dates to midnight
  const normalizeDate = (date: string | Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  // 🔁 Normalize events ONCE
  const safeEvents = Array.isArray(events) ? events : [];
  console.log(safeEvents)

  const normalizedEvents = safeEvents.map(ev => ({
    ...ev,
    date: normalizeDate(ev.date),
  }));

  
  

  // 📅 Days with events (for calendar modifiers later)
  const paidDays = normalizedEvents
    .filter(ev => ev.paided)
    .map(ev => ev.date as Date);

  const undergroundDays = normalizedEvents
    .filter(ev => !ev.paided)
    .map(ev => ev.date as Date);

  // 🎯 Events for selected date
  const eventsForSelectedDate = selectedDate
    ? normalizedEvents.filter(
        ev =>
          (ev.date as Date).getTime() ===
          normalizeDate(selectedDate).getTime()
      )
    : [];
  

  return (
    <div className="bg-gray-900 p-4 rounded-xl text-white shadow-md w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              paid: paidDays,
              underground: undergroundDays,
            }}
            modifiersClassNames={{
              paid: "rdp-day--paid",
              underground: "rdp-day--underground",
            }}
          />
        </div>
        <div>
          <h1>this is willl have the option to change the genre </h1>
        </div>

        {/* // Events List */}
        <div className="flex-1 bg-gray-800 p-4 rounded-xl min-h-[200px]">
          <h2 className="text-lg font-semibold mb-3">
            {selectedDate
              ? `Events on ${selectedDate.toLocaleDateString()}`
              : "Select a date"}
          </h2>

          {selectedDate && eventsForSelectedDate.length === 0 && (
            <p className="text-gray-400">No events on this day.</p>
          )}

          <ul className="space-y-2 max-h-[350px] overflow-y-auto">
            {eventsForSelectedDate.map((ev, idx) => (
              <li
                key={idx}
                className={`p-2 rounded ${
                  ev.paided
                    ? "bg-purple-600"
                    : ev.type === "underground"
                    ? "bg-yellow-600"
                    : "bg-gray-600"
                }`}
              >
                <h1 className="font-bold text-center">{ev.name}</h1>

                {ev.description && (
                  <div className="mt-2 bg-gray-700 p-2 rounded">
                    <p className="text-sm italic">{ev.description}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
