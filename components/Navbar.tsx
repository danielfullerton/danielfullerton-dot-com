import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center hover:opacity-75 active:opacity-60 transition-opacity duration-200"
            >
              <Image
                src="/df.png"
                alt="DF Logo"
                width={40}
                height={40}
                className="w-auto h-8"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:block">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-600 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`transform transition-transform duration-300 ease-in-out ${
                  isOpen
                    ? "rotate-45 opacity-0 scale-95"
                    : "rotate-0 opacity-100 scale-100"
                } h-6 w-6 absolute`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`transform transition-transform duration-300 ease-in-out ${
                  isOpen
                    ? "rotate-0 opacity-100 scale-100"
                    : "-rotate-45 opacity-0 scale-95"
                } h-6 w-6 absolute`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`transform transition-all duration-300 ease-in-out origin-top ${
            isOpen
              ? "opacity-100 translate-y-0 max-h-64"
              : "opacity-0 -translate-y-4 max-h-0"
          } sm:hidden overflow-hidden`}
        >
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
