"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilter from "@/components/products/ProductFilter";
import { getProducts, getCategories } from "@/services/product.service";
import { Product, ProductFilter as ProductFilterType } from "@/types/product";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ProductFilterType>({});

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const result = await getProducts({
          ...filters,
          search: searchQuery,
          page: currentPage,
        });
        setProducts(result.products);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [filters, searchQuery, currentPage]);

  const handleFilterChange = (newFilters: ProductFilterType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 w-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div>
            <ProductFilter
              onFilterChange={handleFilterChange}
              categories={categories}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={products}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
