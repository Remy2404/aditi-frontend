"use client";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  subtotal?: number;
  tax?: number;
  shipping?: number;
}

export default function CartSummary({
  total,
  itemCount,
  subtotal = total,
  tax = total * 0.1,
  shipping = total > 100 ? 0 : 10,
}: CartSummaryProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <div className="flex justify-between text-gray-700">
        <span>Subtotal ({itemCount} items)</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {shipping > 0 && (
        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between text-gray-700">
        <span>Tax (10%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <Separator />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>${(total + tax + shipping).toFixed(2)}</span>
      </div>

      {shipping === 0 && total > 100 && (
        <p className="text-sm text-green-600 text-center">Free shipping! 🎉</p>
      )}
    </div>
  );
}
