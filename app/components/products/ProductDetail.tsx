"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { Product, Review } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  // Rating is a number
  const ratingValue = product.rating ?? 0;

  // Handle reviews as number or array
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length
    : product.reviews;

  const reviewsList = Array.isArray(product.reviews) ? product.reviews : [];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setQuantity(1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(product.stock, prev + 1));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="flex-1 h-96 bg-gray-100 rounded-lg overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="w-full h-full object-contain"
        />
        {product.discount && product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-sm px-3 py-1 rounded">
            -{product.discount}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          {product.brand && (
            <p className="text-lg text-gray-500 mb-4">by {product.brand}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(ratingValue)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">({reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <p className="text-4xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.unit && (
              <span className="text-gray-500">/ {product.unit}</span>
            )}
          </div>

          {/* Stock */}
          <p
            className={`text-lg ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg">{product.description}</p>

        {/* Category */}
        <div>
          <p className="text-gray-600">
            Category:{" "}
            <span className="font-semibold text-gray-900 capitalize">
              {product.category}
            </span>
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-semibold">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              className="p-2 hover:bg-gray-100 transition"
            >
              <Minus size={18} />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.min(product.stock, Math.max(1, Number(e.target.value)))
                )
              }
              className="w-12 text-center border-l border-r border-gray-300 py-2"
            />
            <button
              onClick={increaseQuantity}
              className="p-2 hover:bg-gray-100 transition"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            {added ? "Added to cart!" : "Add to cart"}
          </Button>

          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Heart
              size={20}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }
            />
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {reviewsList.length > 0 && (
        <div className="md:col-span-2 mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Customer Reviews ({reviewCount})
          </h2>
          <div className="space-y-4">
            {reviewsList.map((review: Review, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(review.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    User #{review.user_id}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
