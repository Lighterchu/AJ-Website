"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

//TODO: need to add real event data later


export default function SimpleCalendar({ events = [] }: { events?: any[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const normalizeDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const normalizedEvents = events.map(ev => ({
    ...ev,
    date: normalizeDate(new Date(ev.date)),
  }));
  console.log("Normalized Events:", normalizedEvents);

  const paidDays = normalizedEvents
    .filter(ev => ev.paided === true)
    .map(ev => ev.date);
   

  const undergroundDays = normalizedEvents
    .filter(ev => ev.paided === false)
    .map(ev => ev.date);

  const eventsForSelectedDate = selectedDate
    ? normalizedEvents.filter(
        ev => ev.date.getTime() === normalizeDate(selectedDate).getTime()
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
            modifiers={{ paid: paidDays, underground: undergroundDays }}
            modifiersClassNames={{
              paid: "rdp-day--paid",
              underground: "rdp-day--underground",
            }}
          />
        </div>

        <div className="flex-1 bg-gray-800 p-4 rounded-xl min-h-[200px]">
          <h2 className="text-lg font-semibold mb-3">
            {selectedDate
              ? `Events on ${selectedDate.toLocaleDateString()}`
              : "Select a date"}
          </h2>

          {selectedDate && eventsForSelectedDate.length === 0 && (
            <p className="text-gray-400">No events on this day.</p>
          )}

          <ul className="space-y-2 max-h-[350px] overflow-scroll">
            {eventsForSelectedDate.map((ev, idx) => (
              <li
                key={idx}
                className={`p-2 rounded ${
                  ev.paided === true
                    ? "bg-purple-600"
                    : ev.type === "underground"
                    ? "bg-yellow-600" 
                    : "bg-gray-600"
                }`}
              >
                <div className=" flex justify-center space-x-2 ">
                  <div className="font-bold">
                    <h1>{ev.name}</h1>
                  </div>
                </div>
                {ev.description && (
                  <div className="mt-1 bg-gray-600 p-2 rounded">
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
