"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Eye, Edit2 } from "lucide-react";

interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
}

const mockOrders: AdminOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: "John Doe",
    date: "2024-01-15",
    total: 299.99,
    status: "delivered",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    date: "2024-01-10",
    total: 149.99,
    status: "shipped",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: "Bob Johnson",
    date: "2024-01-08",
    total: 89.99,
    status: "pending",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<AdminOrder["status"]>("pending");

  const handleStatusChange = (id: string, newStatus: AdminOrder["status"]) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    setEditingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Orders Management</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Order #</th>
                <th className="px-6 py-4 text-left font-semibold">Customer</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-left font-semibold">Total</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-semibold">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === order.id ? (
                      <select
                        value={editStatus}
                        onChange={(e) =>
                          setEditStatus(e.target.value as AdminOrder["status"])
                        }
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <Badge
                        className={`px-3 py-1 ${getStatusColor(order.status)}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {editingId === order.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(order.id, editStatus)
                          }
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Eye size={16} />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(order.id);
                            setEditStatus(order.status);
                          }}
                        >
                          <Edit2 size={16} />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
