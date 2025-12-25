"use client";

import { Search, ShoppingCart, Heart, Menu, X, User, ChevronDown, LogOut, Settings, Package } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side: Logo and Menu */}
          <div className="flex items-center space-x-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-gray-900">COZA</span>
              <span className="text-2xl font-light text-gray-600">STORE</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-blue-500 font-medium hover:text-blue-600"
              >
                Home
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-gray-900">
                Shop
              </Link>
              <Link href="/features" className="text-gray-700 hover:text-gray-900">
                Features
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>

          {/* Right side: Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-gray-50 rounded-lg">
              <Search size={22} />
            </button>
            <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-gray-50 rounded-lg group">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold group-hover:scale-110 transition-transform">
                2
              </span>
            </Link>
            <Link href="/account/wishlist" className="relative text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-gray-50 rounded-lg group">
              <Heart size={22} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold group-hover:scale-110 transition-transform">
                1
              </span>
            </Link>

            {/* User Profile Dropdown - Desktop */}
            {user && (
              <div className="hidden md:block relative" ref={userMenuRef}>
                {loading ? (
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
                ) : (
                  <div>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-base shadow-md group-hover:shadow-lg transition-shadow">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden lg:block text-sm font-medium text-gray-800 max-w-[100px] truncate">
                        {user.displayName || "Account"}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-600 truncate mt-0.5">{user.email}</p>
                        </div>

                        <div className="py-2">
                          <Link
                            href="/account/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <User size={16} className="text-blue-600" />
                            </div>
                            <span className="font-medium">My Profile</span>
                          </Link>

                          <Link
                            href="/account/order"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <Package size={16} className="text-green-600" />
                            </div>
                            <span className="font-medium">My Orders</span>
                          </Link>

                          <Link
                            href="/account/address"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                          >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Settings size={16} className="text-purple-600" />
                            </div>
                            <span className="font-medium">Settings</span>
                          </Link>

                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-150"
                            >
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <LogOut size={16} className="text-red-600" />
                              </div>
                              <span className="font-medium">Sign Out</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
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
          <div className="md:hidden pb-4 space-y-1 border-t border-gray-200 pt-4">
            {/* User Section - Mobile (Only if logged in) */}
            {user && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg shadow-md">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Link
                    href="/account/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-700 py-3 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <Link
                    href="/account/order"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-700 py-3 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package size={16} className="text-green-600" />
                    </div>
                    <span className="font-medium">My Orders</span>
                  </Link>
                  <Link
                    href="/account/address"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-gray-700 py-3 px-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Settings size={16} className="text-purple-600" />
                    </div>
                    <span className="font-medium">Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-600 py-3 px-3 hover:bg-red-50 rounded-lg transition-all w-full text-left"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-blue-600 font-semibold py-3 px-3 hover:bg-blue-50 rounded-lg transition-all">
              Home
            </Link>
            <Link href="/shop" onClick={() => setIsOpen(false)} className="block text-gray-700 py-3 px-3 hover:bg-gray-50 rounded-lg transition-all">
              Shop
            </Link>
            <Link href="/features" onClick={() => setIsOpen(false)} className="block text-gray-700 py-3 px-3 hover:bg-gray-50 rounded-lg transition-all">
              Features
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-gray-700 py-3 px-3 hover:bg-gray-50 rounded-lg transition-all">
              Blog
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 py-3 px-3 hover:bg-gray-50 rounded-lg transition-all">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-gray-700 py-3 px-3 hover:bg-gray-50 rounded-lg transition-all">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
