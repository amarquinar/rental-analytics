export interface Property {
  id: string;
  address: string;
  neighborhood: string;
  price: number;
  monthlyRent: number;
  yield: number; // calculated: (rent * 12) / price * 100
  sqMeters: number;
  bedrooms: number;
  bathrooms: number;
  source: string;
  imageUrl?: string;
  createdAt: string;
}

export type SortField = 'yield' | 'price' | 'monthlyRent' | 'sqMeters' | 'bedrooms';
export type SortOrder = 'asc' | 'desc';

export interface FilterOptions {
  neighborhood: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minYield: number | null;
  minBedrooms: number | null;
}
