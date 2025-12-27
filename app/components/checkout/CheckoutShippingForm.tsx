"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShippingInfo } from "@/types/order";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const shippingSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  postalCode: z.string().regex(/^\d{5}$/, "Postal code must be 5 digits"),
  country: z.string().min(2, "Country required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface CheckoutShippingFormProps {
  onSubmit: (data: ShippingInfo) => void;
  isLoading?: boolean;
}

export default function CheckoutShippingForm({
  onSubmit,
  isLoading = false,
}: CheckoutShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const onFormSubmit = (data: ShippingFormData) => {
    onSubmit(data as ShippingInfo);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <Input {...register("firstName")} placeholder="John" />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <Input {...register("lastName")} placeholder="Doe" />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <Input {...register("phone")} placeholder="1234567890" />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <Input {...register("address")} placeholder="123 Main St" />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <Input {...register("city")} placeholder="New York" />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <Input {...register("state")} placeholder="NY" />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <Input {...register("postalCode")} placeholder="10001" />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <Input {...register("country")} placeholder="United States" />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full mt-6">
        {isLoading ? "Processing..." : "Continue to Payment"}
      </Button>
    </form>
  );
}
