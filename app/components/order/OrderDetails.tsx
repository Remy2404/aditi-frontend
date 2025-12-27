"use client";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package } from "lucide-react";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Order #{order.id.slice(-8)}</h2>
          <p className="text-gray-600">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Badge className={`px-4 py-2 ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Package size={20} />
          Order Items
        </h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between pb-3 border-b last:border-0"
            >
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
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin size={20} />
          Shipping Address
        </h3>
        <p className="text-gray-700">
          {order.shippingInfo.firstName} {order.shippingInfo.lastName}
          <br />
          {order.shippingInfo.address}
          <br />
          {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
          {order.shippingInfo.postalCode}
          <br />
          {order.shippingInfo.country}
        </p>
      </div>

      {/* Order Total */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between text-lg font-bold">
          <span>Order Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Tracking Number */}
      {order.trackingNumber && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Tracking Number</p>
          <p className="font-mono text-lg font-semibold text-blue-600">
            {order.trackingNumber}
          </p>
        </div>
      )}
    </div>
  );
}
