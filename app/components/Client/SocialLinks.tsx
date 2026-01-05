"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function SocialLinks({ links }) {
  return (
    <div className="flex justify-center gap-6">
      {links.map(
        (link) =>
          link.url && (
            <div key={link.name} className="flex flex-col items-center gap-1">
              <span className="text-xs opacity-70">{link.name}</span>

              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className={`transition hover:scale-110 ${link.color}`}
              >
                <Icon icon={link.icon} className="w-7 h-7" />
              </Link>
            </div>
          )
      )}
    </div>
  );
}
