export interface SalesRecord {
  "Row ID": number;
  "Order ID": string;
  "Order Date": string;
  "Ship Date": string;
  "Ship Mode": string;
  "Customer ID": string;
  "Customer Name": string;
  Segment: string;
  Country: string;
  City: string;
  State: string;
  "Postal Code": number;
  Region: string;
  "Product ID": string;
  Category: string;
  "Sub-Category": string;
  "Product Name": string;
  Sales: number;
  Quantity: number;
  Discount: number;
  Profit: number;
}

export interface StatesResponse {
  states: string[];
}

export interface DateRangeResponse {
  minDate: string;
  maxDate: string;
  state: string;
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
