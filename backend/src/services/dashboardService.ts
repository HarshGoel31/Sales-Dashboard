import { loadSalesData } from "../data/loader";
import { DashboardData, SalesRecord } from "../types";
import { TOP_N_LIMIT } from "../config/constants";

function aggregateByKey<T>(
  records: SalesRecord[],
  getKey: (r: SalesRecord) => string,
  getValue: (r: SalesRecord) => number,
  mapEntry: (key: string, total: number) => T
): T[] {
  const map = new Map<string, number>();
  records.forEach((r) => {
    const key = getKey(r);
    map.set(key, (map.get(key) || 0) + getValue(r));
  });
  return Array.from(map.entries()).map(([key, total]) => mapEntry(key, total));
}

export function getStates(): string[] {
  const data = loadSalesData();
  return Array.from(new Set(data.map((r) => r.State))).sort();
}

export function getDateRangeForState(state: string): { minDate: string; maxDate: string } {
  const data = loadSalesData();
  const filtered = data.filter((r) => r.State === state);

  if (filtered.length === 0) return { minDate: "", maxDate: "" };

  const timestamps = filtered.map((r) => new Date(r["Order Date"]).getTime());
  const minDate = new Date(Math.min(...timestamps)).toISOString().split("T")[0];
  const maxDate = new Date(Math.max(...timestamps)).toISOString().split("T")[0];

  return { minDate, maxDate };
}

export function getDashboardData(state: string, fromDate: string, toDate: string): DashboardData {
  const data = loadSalesData();
  const from = new Date(fromDate);
  const to = new Date(toDate);

  const filtered = data.filter((r) => {
    const orderDate = new Date(r["Order Date"]);
    return r.State === state && orderDate >= from && orderDate <= to;
  });

  const totalSales = filtered.reduce((sum, r) => sum + r.Sales, 0);
  const quantitySold = filtered.reduce((sum, r) => sum + r.Quantity, 0);
  const totalProfit = filtered.reduce((sum, r) => sum + r.Profit, 0);
  const discountPercent =
    filtered.length > 0
      ? (filtered.reduce((sum, r) => sum + r.Discount, 0) / filtered.length) * 100
      : 0;

  const salesByCity = aggregateByKey(
    filtered,
    (r) => r.City,
    (r) => r.Sales,
    (city, sales) => ({ city, sales })
  )
    .sort((a, b) => b.sales - a.sales)
    .slice(0, TOP_N_LIMIT);

  const salesByProducts = aggregateByKey(
    filtered,
    (r) => r["Product Name"],
    (r) => r.Sales,
    (productName, sales) => ({ productName, sales })
  )
    .sort((a, b) => b.sales - a.sales)
    .slice(0, TOP_N_LIMIT);

  const salesByCategory = aggregateByKey(
    filtered,
    (r) => r.Category,
    (r) => r.Sales,
    (category, sales) => ({ category, sales })
  );

  const salesBySubCategory = aggregateByKey(
    filtered,
    (r) => r["Sub-Category"],
    (r) => r.Sales,
    (subCategory, sales) => ({ subCategory, sales })
  ).sort((a, b) => a.subCategory.localeCompare(b.subCategory));

  const salesBySegment = aggregateByKey(
    filtered,
    (r) => r.Segment,
    (r) => r.Sales,
    (segment, sales) => ({ segment, sales })
  );

  return {
    totalSales,
    quantitySold,
    discountPercent,
    totalProfit,
    salesByCity,
    salesByProducts,
    salesByCategory,
    salesBySubCategory,
    salesBySegment,
  };
}
