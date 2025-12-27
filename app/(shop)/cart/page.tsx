"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <CartDrawer />
      </div>
      <Footer />
    </>
  );
}
