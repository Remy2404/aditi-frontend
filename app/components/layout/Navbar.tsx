"use client";

import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const linkClass = (path: string) => {
    return pathName === path
      ? "text-blue-500 font-medium"
      : "text-gray-700 hover:text-gray-900";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side: Logo and Menu */}
          <div className="flex items-center space-x-20">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-gray-900">COZA</span>
              <span className="text-2xl font-light text-gray-600">STORE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
              <Link href="/shop" className={linkClass("/shop")}>
                Shop
              </Link>
              <Link href="/features" className={linkClass("/features")}>
                Features
              </Link>
              <Link href="/blog" className={linkClass("/blog")}>
                Blog
              </Link>
              <Link href="/about" className={linkClass("/about")}>
                About
              </Link>
              <Link href="/contact" className={linkClass("/contact")}>
                Contact
              </Link>
            </div>
          </div>

          {/* Right side: Icons */}
          <div className="flex items-center space-x-8">
            <button className="text-gray-700 hover:text-gray-900">
              <Search size={20} />
            </button>
            <button className="relative text-gray-700 hover:text-gray-900">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="relative text-gray-700 hover:text-gray-900">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            </button>
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className={`block py-2 ${linkClass("/")}`}>
              Home
            </Link>
            <Link href="/shop" className={`block py-2 ${linkClass("/shop")}`}>
              Shop
            </Link>
            <Link
              href="/features"
              className={`block py-2 ${linkClass("/features")}`}
            >
              Features
            </Link>
            <Link href="/blog" className={`block py-2 ${linkClass("/blog")}`}>
              Blog
            </Link>
            <Link href="/about" className={`block py-2 ${linkClass("/about")}`}>
              About
            </Link>
            <Link
              href="/contact"
              className={`block py-2 ${linkClass("/contact")}`}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
