"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [language, setLanguage] = useState("EN");
  const [currency, setCurrency] = useState("USD");
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const languages = ["EN", "ES", "FR", "DE", "IT", "PT"];
  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"];

  return (
    <div className="bg-gray-900 text-gray-100 text-xs sm:text-sm border-b border-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 sm:h-12">
          {/* Left - Promo Text */}
          <div className="flex-1 overflow-hidden">
            <p className="text-gray-300 truncate text-xs sm:text-sm">
              <span className="hidden sm:inline">
                Free shipping for standard order over $100
              </span>
              <span className="sm:hidden">Free shipping over $100</span>
            </p>
          </div>

          {/* Right - Links and Dropdowns */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {/* Help & FAQs - Hidden on mobile */}
            <a
              href="#"
              className="hidden md:block text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              Help & FAQs
            </a>

            {/* Divider - Hidden on mobile */}
            <div className="hidden md:block w-px h-5 bg-gray-700"></div>

            {/* My Account */}
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">My Account</span>
              <span className="sm:hidden">Account</span>
            </a>

            {/* Divider */}
            <div className="w-px h-4 sm:h-5 bg-gray-700"></div>

            {/* Language Dropdown */}
            <div className="relative z-40">
              <button
                onClick={() => {
                  setLangOpen(!langOpen);
                  setCurrencyOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 min-w-[40px] sm:min-w-[50px]"
              >
                <span className="text-xs sm:text-sm">{language}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform sm:w-4 sm:h-4 ${
                    langOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langOpen && (
                <>
                  {/* Backdrop for mobile */}
                  <div
                    className="fixed inset-0 z-10 md:hidden"
                    onClick={() => setLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className={`block w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-700 transition-colors text-xs sm:text-sm first:rounded-t-lg last:rounded-b-lg ${
                          language === lang
                            ? "bg-gray-700 text-white font-semibold"
                            : "text-gray-300"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-4 sm:h-5 bg-gray-700"></div>

            {/* Currency Dropdown */}
            <div className="relative z-40">
              <button
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setLangOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 min-w-[50px] sm:min-w-[60px]"
              >
                <span className="text-xs sm:text-sm">{currency}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform sm:w-4 sm:h-4 ${
                    currencyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {currencyOpen && (
                <>
                  {/* Backdrop for mobile */}
                  <div
                    className="fixed inset-0 z-10 md:hidden"
                    onClick={() => setCurrencyOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setCurrencyOpen(false);
                        }}
                        className={`block w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-700 transition-colors text-xs sm:text-sm first:rounded-t-lg last:rounded-b-lg ${
                          currency === curr
                            ? "bg-gray-700 text-white font-semibold"
                            : "text-gray-300"
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
