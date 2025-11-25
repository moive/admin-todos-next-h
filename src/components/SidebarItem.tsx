import Link from "next/link";
import React from "react";

export const SidebarItem = () => {
  return (
    <li>
      {/* relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
      <Link
        href="/dashboard/rest-todos"
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            className="fill-current text-gray-300 group-hover:text-cyan-300"
            fill-rule="evenodd"
            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
            clip-rule="evenodd"
          />
          <path
            className="fill-current text-gray-600 group-hover:text-cyan-600"
            d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
          />
        </svg>
        <span className="group-hover:text-gray-700">Categories</span>
      </Link>
    </li>
  );
};
