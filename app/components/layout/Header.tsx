"use client";

import { ChevronDown, HelpCircle, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

// --- Reusable Dropdown Component (Language/Currency) ---
interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

function SystemDropdown({ label, options, selected, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 py-1"
      >
        <span className="text-xs sm:text-sm font-medium">{selected}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-gray-800 border border-gray-700 rounded-md shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors ${
                  selected === option
                    ? "bg-gray-700 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// --- Main Header Component ---
export default function Header() {
  const { user, loading, signOut } = useAuth(); // Hook from AuthContext
  const [language, setLanguage] = useState("EN");
  const [currency, setCurrency] = useState("USD");

  const languages = ["EN", "ES", "FR", "DE"];
  const currencies = ["USD", "EUR", "GBP"];

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-gray-100 border-b border-gray-800 relative z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Left - Promo Text */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-300 text-xs sm:text-sm truncate flex items-center gap-2">
              <span className="hidden sm:inline">🎉</span>
              Free shipping on orders over <span className="text-white font-semibold bg-blue-600 px-2 py-0.5 rounded">$100</span>
            </p>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center divide-x divide-gray-800">
            
            {/* Action Links Group */}
            <div className="flex items-center space-x-4 pr-4">
              <Link
                href="/help"
                className="hidden md:flex items-center gap-2 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
              >
                <HelpCircle size={14} />
                <span>Help</span>
              </Link>

              {/* AUTH LOGIC HERE */}
              {loading ? (
                // Loading Skeleton for Auth State
                <div className="h-4 w-20 bg-gray-800 animate-pulse rounded"></div>
              ) : !user ? (
                // Logged Out: Show Sign In / Register
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <Link href="/login" className="text-gray-300 hover:text-white">
                    Sign In
                  </Link>
                  <span className="text-gray-600">/</span>
                  <Link href="/register" className="text-gray-300 hover:text-white">
                    Register
                  </Link>
                </div>
              ) : null}
            </div>

            {/* Settings Dropdowns Group */}
            <div className="flex items-center space-x-3 sm:space-x-4 pl-3 sm:pl-4">
              <SystemDropdown
                label="Language"
                options={languages}
                selected={language}
                onSelect={setLanguage}
              />
              <SystemDropdown
                label="Currency"
                options={currencies}
                selected={currency}
                onSelect={setCurrency}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}