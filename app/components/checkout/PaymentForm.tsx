"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CreditCard, Lock } from "lucide-react";

interface PaymentFormProps {
  total: number;
  onSubmit: (paymentData: PaymentData) => Promise<void>;
  isLoading?: boolean;
}

export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export default function PaymentForm({
  total,
  onSubmit,
  isLoading = false,
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces
    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim();
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    }

    // Format CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Card number must be 16 digits");
      return false;
    }
    if (formData.expiryDate.length !== 5) {
      setError("Expiry date must be MM/YY");
      return false;
    }
    if (formData.cvv.length !== 3) {
      setError("CVV must be 3 digits");
      return false;
    }
    if (formData.cardholderName.length < 3) {
      setError("Cardholder name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Payment failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start gap-2">
        <Lock size={20} className="text-blue-600 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-800">
          Your payment information is secure and encrypted.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Cardholder Name
        </label>
        <Input
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 flex items-center gap-2">
          <CreditCard size={16} />
          Card Number
        </label>
        <Input
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <Input
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength={5}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <Input
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={3}
            type="password"
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Processing Payment..." : `Pay $${total.toFixed(2)}`}
      </Button>

      <p className="text-xs text-gray-600 text-center">
        This is a demo payment form. No real charges will be made.
      </p>
    </form>
  );
}
