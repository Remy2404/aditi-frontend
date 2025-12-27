export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number | Review[];
  unit?: string;
  discount?: number;
  availability?: boolean;
  brand?: string;
}

// Review structure from API
export interface Review {
  user_id: number;
  rating: number;
  comment: string;
}

// Raw product from Beeceptor Mock API
export interface BeeceptorProduct {
  product_id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  discount: number;
  availability: boolean;
  brand: string;
  category: string;
  rating: number;
  reviews: Review[];
}

export interface ProductFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating";
  page?: number;
}
