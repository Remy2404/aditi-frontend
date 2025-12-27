"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/products/ProductDetail";
import { getProductById } from "@/services/product.service";
import { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const id = params.id as string;
        const prod = await getProductById(id);
        setProduct(prod);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [params.id]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  if (!product)
    return <div className="text-center py-12">Product not found</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ProductDetail product={product} />
      </div>
      <Footer />
    </>
  );
}
