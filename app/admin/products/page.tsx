"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface AdminProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const mockProducts: AdminProduct[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    stock: 50,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    stock: 30,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleAdd = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.stock
    )
      return;

    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                price: parseFloat(formData.price),
                category: formData.category,
                stock: parseInt(formData.stock),
              }
            : p
        )
      );
      setEditingId(null);
    } else {
      setProducts([
        ...products,
        {
          id: Date.now().toString(),
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          stock: parseInt(formData.stock),
        },
      ]);
    }

    setFormData({ name: "", price: "", category: "", stock: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product: AdminProduct) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
    });
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Products Management</h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </Button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Edit" : "Add"} Product
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Category"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stock
                  </label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={handleAdd} className="flex-1">
                  {editingId ? "Update" : "Add"}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      price: "",
                      category: "",
                      stock: "",
                    });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">Stock</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
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
