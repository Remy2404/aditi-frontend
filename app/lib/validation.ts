import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, "Phone number must be 10 digits");

export const postalCodeSchema = z
  .string()
  .regex(/^\d{5}$/, "Postal code must be 5 digits");

export const shippingFormSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  postalCode: postalCodeSchema,
  country: z.string().min(2, "Country required"),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password required"),
});

export const registerSchema = z
  .object({
    displayName: z.string().min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
