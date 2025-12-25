import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              <a
                href="#"
                className="text-blue-500 font-medium hover:text-blue-600"
              >
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Shop
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Features
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Blog
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Contact
              </a>
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
            <a href="#" className="block text-blue-500 font-medium py-2">
              Home
            </a>
            <a href="#" className="block text-gray-700 py-2">
              Shop
            </a>
            <a href="#" className="block text-gray-700 py-2">
              Features
            </a>
            <a href="#" className="block text-gray-700 py-2">
              Blog
            </a>
            <a href="#" className="block text-gray-700 py-2">
              About
            </a>
            <a href="#" className="block text-gray-700 py-2">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
