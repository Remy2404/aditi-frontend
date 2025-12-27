"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrderDetails from "@/components/order/OrderDetails";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/Button";
import { generateOrderInvoice } from "@/lib/invoice-generator";
import { Download } from "lucide-react";

// Mock order data
const MOCK_ORDERS: Record<string, Order> = {
  "1": {
    id: "1",
    userId: "user123",
    items: [
      {
        id: "1",
        product: {
          id: "1",
          name: "Premium Wireless Headphones",
          price: 199.99,
          description:
            "High-quality wireless headphones with noise cancellation",
          category: "Electronics",
          image: "https://via.placeholder.com/300x300?text=Headphones",
          stock: 50,
          rating: 4.5,
          reviews: 128,
        },
        quantity: 1,
      },
      {
        id: "3",
        product: {
          id: "3",
          name: "USB-C Cable",
          price: 19.99,
          description: "Durable and fast charging USB-C cable",
          category: "Accessories",
          image: "https://via.placeholder.com/300x300?text=USBCable",
          stock: 100,
          rating: 4.7,
          reviews: 340,
        },
        quantity: 2,
      },
    ],
    shippingInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
    },
    total: 239.97,
    status: "delivered",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    trackingNumber: "TRK123456789",
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const id = params.id as string;
        const ord = MOCK_ORDERS[id];
        setOrder(ord || null);
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadOrder();
  }, [params.id]);

  const handleDownloadInvoice = () => {
    if (order) {
      generateOrderInvoice(order);
    }
  };

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (!order) return <div className="text-center py-12">Order not found</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Order Details</h1>
          <Button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-2"
          >
            <Download size={20} />
            Download Invoice
          </Button>
        </div>
        <OrderDetails order={order} />
      </div>
      <Footer />
    </>
  );
}
