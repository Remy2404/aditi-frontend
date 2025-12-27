import { CartItem } from "./cart";

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export interface OrderHistoryItem {
  id: string;
  orderNumber: string;
  date: Date;
  total: number;
  status: Order["status"];
  itemCount: number;
}
