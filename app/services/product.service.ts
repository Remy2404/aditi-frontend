import { Product, BeeceptorProduct } from "@/types/product";

const API_URL = "https://fake-store-api.mock.beeceptor.com/api/products";

// Cache for products to avoid repeated API calls
let productsCache: Product[] | null = null;
let categoriesCache: string[] | null = null;

// Generate a placeholder image URL based on product name and category
function getPlaceholderImage(name: string, category: string): string {
  // Use picsum.photos for random but consistent images based on product id hash
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${hash}/400/400`;
}

// Transform Beeceptor API product to our Product format
function transformProduct(apiProduct: BeeceptorProduct): Product {
  // Use placeholder image since example.com images don't exist
  const image = apiProduct.image.includes("example.com")
    ? getPlaceholderImage(apiProduct.name, apiProduct.category)
    : apiProduct.image;

  return {
    id: apiProduct.product_id.toString(),
    name: apiProduct.name,
    price: apiProduct.price,
    description: apiProduct.description,
    category: apiProduct.category,
    image,
    stock: apiProduct.availability ? Math.floor(Math.random() * 100) + 10 : 0,
    rating: apiProduct.rating,
    reviews: apiProduct.reviews,
    unit: apiProduct.unit,
    discount: apiProduct.discount,
    availability: apiProduct.availability,
    brand: apiProduct.brand,
  };
}

// Fetch all products from Beeceptor API
async function fetchAllProducts(): Promise<Product[]> {
  if (productsCache) {
    return productsCache;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: BeeceptorProduct[] = await response.json();
    productsCache = data.map(transformProduct);
    return productsCache;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get products with filters
export async function getProducts(filters?: {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sortBy?: string;
  page?: number;
}) {
  let products = await fetchAllProducts();

  // Filter by category
  if (filters?.category && filters.category !== "all") {
    products = products.filter(
      (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  // Filter by price
  if (filters?.priceMin !== undefined) {
    products = products.filter((p) => p.price >= filters.priceMin!);
  }
  if (filters?.priceMax !== undefined) {
    products = products.filter((p) => p.price <= filters.priceMax!);
  }

  // Search
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        (p.brand && p.brand.toLowerCase().includes(search))
    );
  }

  // Sort
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        products.sort((a, b) => {
          const ratingA = typeof a.rating === "number" ? a.rating : 0;
          const ratingB = typeof b.rating === "number" ? b.rating : 0;
          return ratingB - ratingA;
        });
        break;
    }
  }

  // Pagination
  const page = filters?.page || 1;
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return {
    products: paginatedProducts,
    total: products.length,
    page,
    totalPages,
  };
}

// Get single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    // Fetch all products and find by ID (API doesn't have single product endpoint)
    const products = await fetchAllProducts();
    return products.find((p) => p.id === id) || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  if (categoriesCache) {
    return categoriesCache;
  }

  try {
    const products = await fetchAllProducts();
    // Extract unique categories from products
    categoriesCache = [...new Set(products.map((p) => p.category))];
    return categoriesCache;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await fetchAllProducts();
  const search = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      (p.brand && p.brand.toLowerCase().includes(search))
  );
}

// Get products by category
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

// Get products by brand
export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const products = await fetchAllProducts();
  return products.filter(
    (p) => p.brand && p.brand.toLowerCase() === brand.toLowerCase()
  );
}

// Get all brands
export async function getBrands(): Promise<string[]> {
  const products = await fetchAllProducts();
  return [...new Set(products.map((p) => p.brand).filter(Boolean))] as string[];
}

// Clear cache (useful for refreshing data)
export function clearProductCache() {
  productsCache = null;
  categoriesCache = null;
}
