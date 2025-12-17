"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Link from "next/link";

export default function CreateDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="
          inline-flex items-center gap-2
          rounded-md bg-green-700 px-4 py-2
          text-sm font-semibold text-white
          shadow-sm
          hover:bg-green-600
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        "
      >
        Create
        <span className="text-xs">▾</span>
      </MenuButton>

      <MenuItems
        className="
          absolute left-0 mt-2 w-44
          origin-top-left rounded-md
          bg-black text-white
          shadow-lg ring-1 ring-black ring-opacity-5
          focus:outline-none z-50
        "
      >
        <MenuItem>
          {({ active }) => (
            <Link
              href="/pages/Scene-and-Heard/create-post"
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-700" : ""
              }`}
            >
              Create Post
            </Link>
          )}
        </MenuItem>

        <MenuItem>
          {({ active }) => (
            <Link
              href="/pages/Scene-and-Heard/create-event"
              className={`block px-4 py-2 text-sm ${
                active ? "bg-gray-700" : ""
              }`}
            >
              Create Event
            </Link>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
