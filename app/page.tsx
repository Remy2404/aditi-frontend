"use client";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { ArrowRight, Star, Truck, Shield, HeadphonesIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero and slider */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Truck className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Free Shipping
                </h3>
                <p className="text-gray-600 text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-green-100 p-3 rounded-lg">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Secure Payment
                </h3>
                <p className="text-gray-600 text-sm">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-purple-100 p-3 rounded-lg">
                <HeadphonesIcon className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  24/7 Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Dedicated customer service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our diverse collection
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Women", "Men", "Kids", "Accessories"].map((category) => (
              <div
                key={category}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-400 opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{category}</h3>
                  <p className="text-sm opacity-90">Explore Now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Trending Products
              </h2>
              <p className="text-gray-600">Discover what is hot right now</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100"
              >
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <p className="text-gray-500">Product {item}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -30%
                  </div>
                  <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star size={18} className="text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(128)</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Product Name {item}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      $49.99
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      $71.99
                    </span>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors opacity-0 group-hover:opacity-100">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
