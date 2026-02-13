export interface StatesResponse {
  states: string[];
}

export interface DateRangeResponse {
  state: string;
  minDate: string;
  maxDate: string;
}

export interface CityData {
  city: string;
  sales: number;
}

export interface ProductData {
  productName: string;
  sales: number;
}

export interface CategoryData {
  category: string;
  sales: number;
}

export interface SubCategoryData {
  subCategory: string;
  sales: number;
}

export interface SegmentData {
  segment: string;
  sales: number;
}

export interface DashboardData {
  totalSales: number;
  quantitySold: number;
  discountPercent: number;
  totalProfit: number;
  salesByCity: CityData[];
  salesByProducts: ProductData[];
  salesByCategory: CategoryData[];
  salesBySubCategory: SubCategoryData[];
  salesBySegment: SegmentData[];
}

export type Theme = "dark" | "light";
