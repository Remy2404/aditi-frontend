"use client";
import { Cart } from "@/types/cart";
import { ShippingInfo } from "@/types/order";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  cart: Cart;
  shippingInfo: ShippingInfo;
}

export default function OrderSummary({
  cart,
  shippingInfo,
}: OrderSummaryProps) {
  const subtotal = cart.total;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4">
        <h3 className="font-semibold">Order Items</h3>
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between pb-2 border-b">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {shipping > 0 && (
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Shipping Info */}
      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Shipping To</h3>
        <div className="text-gray-700 space-y-1">
          <p>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </p>
          <p>{shippingInfo.address}</p>
          <p>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}
          </p>
          <p>{shippingInfo.country}</p>
          <p className="text-sm mt-3">{shippingInfo.email}</p>
          <p className="text-sm">{shippingInfo.phone}</p>
        </div>
      </div>
    </div>
  );
}
