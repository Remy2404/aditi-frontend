"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { CartItem as CartItemType } from "@/types/cart";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
        <p className="text-gray-600 mb-3">${item.product.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            className="w-12 text-center border border-gray-300 rounded py-1"
          />
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 border border-gray-300 rounded hover:bg-gray-200 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end justify-between">
        <p className="font-bold text-lg">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-600 hover:text-red-700 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
