"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";


const merchItems = [
  {
    name: "MVMNT Hoodie",
    price: "$85 AUD",
    image: "/merch/hoodie.png",
    status: "Coming Soon",
  },
  {
    name: "MVMNT Tee",
    price: "$45 AUD",
    image: "/merch/tee.png",
    status: "Available",
  },
  {
    name: "MVMNT Cap",
    price: "$35 AUD",
    image: "/merch/cap.png",
    status: "Available",
  },
];

export default function MerchPage() {
    const { user} = useUser();
    if (user?.publicMetadata?.role !== "admi") {
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <p className="text-xl tracking-wide uppercase text-gray-400">
              Coming Soon
            </p>
          </div>
        );
      }
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.15),_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            MERCH
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Limited drops. Designed for the movement.
          </p>
        </div>

        {/* Merch grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {merchItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur transition hover:border-green-500/50"
            >
              {/* Image */}
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="mt-1 text-sm text-gray-400">{item.price}</p>

                {/* Button */}
                {item.status === "Available" ? (
                  <button className="mt-4 w-full rounded-xl bg-green-500 px-4 py-2 font-semibold text-black transition hover:bg-green-400">
                    Buy now
                  </button>
                ) : (
                  <div className="mt-4 w-full rounded-xl border border-gray-700 px-4 py-2 text-center text-sm text-gray-400">
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-400">
            New drops announced Instagram.
          </p>
        </div>
      </div>
    </div>
  );
}
