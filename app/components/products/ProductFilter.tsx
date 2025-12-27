"use client";
import { useState } from "react";
import { ProductFilter } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

interface ProductFilterProps {
  onFilterChange: (filters: ProductFilter) => void;
  categories: string[];
}

export default function ProductFilterComponent({
  onFilterChange,
  categories,
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState<ProductFilter["sortBy"]>("price-asc");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({
      category: category || undefined,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      sortBy,
    });
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onFilterChange({
      category: selectedCategory || undefined,
      priceMin: newRange.min,
      priceMax: newRange.max,
      sortBy,
    });
  };

  const handleSortChange = (newSort: ProductFilter["sortBy"]) => {
    setSortBy(newSort);
    onFilterChange({
      category: selectedCategory || undefined,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      sortBy: newSort,
    });
  };

  const handleReset = () => {
    setSelectedCategory("");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("price-asc");
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div
        className="flex justify-between items-center mb-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">Filters</h3>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategory === category}
                    onChange={() =>
                      handleCategoryChange(
                        category === selectedCategory ? "" : category
                      )
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold mb-3">Price Range</h4>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-gray-600">
                  Min: ${priceRange.min}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.min}
                  onChange={(e) =>
                    handlePriceChange("min", Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Max: ${priceRange.max}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) =>
                    handlePriceChange("max", Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Sort */}
          <div>
            <h4 className="font-semibold mb-3">Sort By</h4>
            <select
              value={sortBy || "price-asc"}
              onChange={(e) =>
                handleSortChange(e.target.value as ProductFilter["sortBy"])
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
