import React from "react";
import { DashboardData } from "../../../types";
import { formatCurrency } from "../../../services/api";
import { RupeeIcon, CreditCardIcon, DiscountIcon, TrendUpIcon } from "../../../assets/icons";

interface MetricCardsProps {
  data: DashboardData;
  loading: boolean;
}

const CARDS = [
  { key: "totalSales", title: "Total Sales", icon: RupeeIcon, color: "#4ade80" },
  { key: "quantitySold", title: "Quantity Sold", icon: CreditCardIcon, color: "#60a5fa" },
  { key: "discountPercent", title: "Discount%", icon: DiscountIcon, color: "#f59e0b" },
  { key: "totalProfit", title: "Profit", icon: TrendUpIcon, color: "#f87171" },
] as const;

function formatValue(key: typeof CARDS[number]["key"], data: DashboardData): string {
  if (key === "quantitySold") return data.quantitySold.toLocaleString();
  if (key === "discountPercent") return `${data.discountPercent.toFixed(1)}%`;
  return formatCurrency(data[key]);
}

const MetricCards: React.FC<MetricCardsProps> = ({ data, loading }) => (
  <div className="metric-cards">
    {CARDS.map(({ key, title, icon: Icon, color }) => (
      <div key={key} className={`metric-card ${loading ? "metric-card--loading" : ""}`}>
        <div className="metric-card__icon" style={{ color }}>
          <Icon />
        </div>
        <div className="metric-card__content">
          <div className="metric-card__title">{title}</div>
          <div className="metric-card__value">{loading ? "—" : formatValue(key, data)}</div>
        </div>
      </div>
    ))}
  </div>
);

export default MetricCards;
