"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { Star, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  // Rating is a number
  const ratingValue = product.rating ?? 0;

  // Handle reviews as number or array
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length
    : product.reviews;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>
        {product.discount && product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.brand && (
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(ratingValue)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviewCount})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.stock > 0 && (
            <span className="text-xs text-green-600">In Stock</span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full mt-4"
        >
          {added ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
