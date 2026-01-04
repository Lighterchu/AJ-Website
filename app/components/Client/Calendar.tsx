"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Event {
  name: string;
  date: string | Date;
  paided: boolean;
  genre?: string;
  type: "official" | "community";
  description?: string;
}

export default function SimpleCalendar({ events = [] }: { events?: Event[] }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  // Normalize dates to midnight
  const normalizeDate = (date: string | Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const safeEvents = Array.isArray(events) ? events : [];

  const normalizedEvents = safeEvents.map(ev => ({
    ...ev,
    date: normalizeDate(ev.date),
  }));

  

  // Collect genres dynamically
  const genres = Array.from(
    new Set(
      normalizedEvents
        .map(ev => ev.genre)
        .filter(Boolean)
    )
  ) as string[];

  // Filtered events based on selected genre for calendar highlighting
  const eventsForCalendar = selectedGenre === "all"
    ? normalizedEvents
    : normalizedEvents.filter(ev => ev.genre === selectedGenre);

  // Calendar modifiers
  const officialDays = eventsForCalendar
    .filter(ev => ev.type === "official")
    .map(ev => ev.date as Date);

  const communityDays = eventsForCalendar
    .filter(ev => ev.type === "community")
    .map(ev => ev.date as Date);

  // Events for selected date AND genre
  const eventsForSelectedDate = selectedDate
    ? normalizedEvents.filter(ev => {
        const sameDay =
          (ev.date as Date).getTime() ===
          normalizeDate(selectedDate).getTime();

        const matchesGenre =
          selectedGenre === "all" || ev.genre === selectedGenre;

        return sameDay && matchesGenre;
      })
    : [];

  return (
    <div className="bg-gray-900 p-4 rounded-xl text-white shadow-md w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Calendar */}
        <div className="flex-1">
          <DayPicker
            captionLayout="dropdown"
            animate
            mode="single"
            selected={selectedDate}
            onSelect={date => {
              setSelectedDate(date);
            }}
            modifiers={{
              official: officialDays,
              community: communityDays,
            }}
            modifiersClassNames={{
              official: "rdp-day--offical",
              community: "rdp-day--community",
            }}
          />
        </div>

        {/* Genre Filter */}
        <div className="flex flex-col gap-2 w-full md:w-48">
          <label className="text-sm text-gray-300">Filter by genre</label>
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700"
          >
            <option value="all">All genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Events List */}
        <div className="flex-1 bg-gray-800 p-4 rounded-xl min-h-[200px]">
          <h2 className="text-lg font-semibold mb-3">
            {selectedDate
              ? `Events on ${selectedDate.toLocaleDateString()}`
              : "Select a date"}
          </h2>

          {selectedDate && eventsForSelectedDate.length === 0 && (
            <p className="text-gray-400">No events for this filter.</p>
          )}

          <ul className="space-y-2 max-h-[350px] overflow-y-auto">
            {eventsForSelectedDate.map((ev, idx) => (
              <li
                key={idx}
                className={`p-2 rounded ${
                  ev.type === "official"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                <h1 className="font-bold text-center">{ev.name}</h1>

                {ev.genre && (
                  <p className="text-xs text-center mt-1 opacity-80">
                    {ev.genre}
                  </p>
                )}

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
