"use client";
import { useCart } from "@/contexts/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartDrawer() {
  const { cart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingCart size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add items to get started!</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 border-b pb-6">
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary total={cart.total} itemCount={cart.itemCount} />

      {/* Checkout Button */}
      <Link href="/checkout" className="block">
        <Button className="w-full">Proceed to Checkout</Button>
      </Link>

      <Link href="/shop" className="block">
        <Button variant="outline" className="w-full">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
