"use client";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

import CheckoutShippingForm from "@/components/checkout/CheckoutShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { ShippingInfo } from "@/types/order";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [currentStep, setCurrentStep] = useState<
    "shipping" | "payment" | "confirmation"
  >("shipping");
  const [isLoading, setIsLoading] = useState(false);

  if (cart.items.length === 0 && !shippingInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Add items to your cart before checking out
        </p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingInfo(data);
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order (in real app, this would be an API call)
      console.log("Order created:", {
        id: `ORD-${Date.now()}`,
        userId: "user123",
        items: cart.items,
        shippingInfo: shippingInfo!,
        total: cart.total,
        status: "confirmed" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Clear cart and redirect to confirmation
      clearCart();
      setCurrentStep("confirmation");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex gap-4 mb-12">
        <div
          className={`flex-1 p-4 rounded-lg text-center font-semibold ${
            currentStep === "shipping"
              ? "bg-blue-100 text-blue-900"
              : "bg-gray-100"
          }`}
        >
          1. Shipping
        </div>
        <div
          className={`flex-1 p-4 rounded-lg text-center font-semibold ${
            currentStep === "payment"
              ? "bg-blue-100 text-blue-900"
              : "bg-gray-100"
          }`}
        >
          2. Payment
        </div>
        <div
          className={`flex-1 p-4 rounded-lg text-center font-semibold ${
            currentStep === "confirmation"
              ? "bg-blue-100 text-blue-900"
              : "bg-gray-100"
          }`}
        >
          3. Confirmation
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {currentStep === "shipping" && (
            <CheckoutShippingForm onSubmit={handleShippingSubmit} />
          )}

          {currentStep === "payment" && shippingInfo && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Payment</h2>
              {/* TODO: Add actual payment form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <p className="text-gray-600 mb-6">
                  In a production app, you would integrate with Stripe or
                  another payment processor here.
                </p>
                <Button
                  onClick={handlePaymentSubmit}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Processing..." : "Complete Payment"}
                </Button>
              </div>
            </div>
          )}

          {currentStep === "confirmation" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-green-900 mb-4">
                Order Confirmed!
              </h2>
              <p className="text-green-700 mb-6">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              <Link href="/account?tab=orders">
                <Button>View My Orders</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {shippingInfo && (
          <div>
            <OrderSummary cart={cart} shippingInfo={shippingInfo} />
          </div>
        )}
      </div>
    </div>
  );
}
