import React from "react";
import { ProductData } from "../../../types";

interface Props {
  data: ProductData[];
  loading?: boolean;
}

const SalesByProductsTable: React.FC<Props> = ({ data, loading }) => (
  <div className="chart-card">
    <h3 className="chart-card__title">Sales by Products</h3>
    <div className="products-table">
      <div className="products-table__header">
        <span>Product Name</span>
        <span>Sales in $</span>
      </div>
      <div className="products-table__body">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="products-table__row products-table__row--skeleton">
              <span className="skeleton-line" />
              <span className="skeleton-line skeleton-line--short" />
            </div>
          ))
        ) : data.length === 0 ? (
          <div className="products-table__empty">No data available</div>
        ) : (
          data.slice(0, 10).map((item, i) => (
            <div key={i} className="products-table__row">
              <span className="products-table__name" title={item.productName}>
                {item.productName}
              </span>
              <span className="products-table__value">
                ${Math.round(item.sales).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

export default SalesByProductsTable;
