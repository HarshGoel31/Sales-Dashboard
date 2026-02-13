import React from "react";
import { DashboardData } from "../../../types";
import MetricCards from "./MetricCards";
import SalesByCityChart from "./SalesByCityChart";
import SalesByProductsTable from "./SalesByProductsTable";
import SalesByCategoryChart from "./SalesByCategoryChart";
import SalesBySubCategory from "./SalesBySubCategory";
import SalesBySegmentChart from "./SalesBySegmentChart";

interface Props {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const EMPTY_DATA: DashboardData = {
  totalSales: 0,
  quantitySold: 0,
  discountPercent: 0,
  totalProfit: 0,
  salesByCity: [],
  salesByProducts: [],
  salesByCategory: [],
  salesBySubCategory: [],
  salesBySegment: [],
};

const DashboardPage: React.FC<Props> = ({ data, loading, error }) => {
  const d = data ?? EMPTY_DATA;

  return (
    <main className="dashboard-page">
      {error && (
        <div className="dashboard-page__error">⚠️ {error}</div>
      )}

      <MetricCards data={d} loading={loading} />

      <div className="dashboard-page__row dashboard-page__row--two-col">
        <SalesByCityChart data={d.salesByCity} loading={loading} />
        <SalesByProductsTable data={d.salesByProducts} loading={loading} />
      </div>

      <div className="dashboard-page__row dashboard-page__row--three-col">
        <SalesByCategoryChart data={d.salesByCategory} loading={loading} />
        <SalesBySubCategory data={d.salesBySubCategory} loading={loading} />
        <SalesBySegmentChart data={d.salesBySegment} loading={loading} />
      </div>
    </main>
  );
};

export default DashboardPage;
