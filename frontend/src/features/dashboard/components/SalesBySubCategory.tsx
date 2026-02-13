import React from "react";
import { SubCategoryData } from "../../../types";
import { useTheme } from "../../../context/ThemeContext";
import { THEME_COLORS } from "../../../config/constants";

interface Props {
  data: SubCategoryData[];
  loading?: boolean;
}

const SalesBySubCategory: React.FC<Props> = ({ data, loading }) => {
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  const maxSales = Math.max(...data.map((d) => d.sales), 1);

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Sales By Sub Category</h3>
      <div className="sub-category-table">
        <div className="sub-category-table__header">
          <span>Sub Category</span>
          <span>Sales in $</span>
        </div>
        <div className="sub-category-table__body">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="sub-category-table__row sub-category-table__row--skeleton">
                <span className="skeleton-line" />
                <span className="skeleton-line skeleton-line--short" />
              </div>
            ))
          ) : (
            data.slice(0, 10).map((item, i) => (
              <div key={i} className="sub-category-table__row">
                <div className="sub-category-table__label-bar">
                  <span className="sub-category-table__label">{item.subCategory}</span>
                  <div
                    className="sub-category-table__bar"
                    style={{
                      background: `linear-gradient(to right, ${colors.bar} ${(item.sales / maxSales) * 100}%, ${colors.barBg} ${(item.sales / maxSales) * 100}%)`,
                    }}
                  />
                </div>
                <span className="sub-category-table__value">
                  ${Math.round(item.sales).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesBySubCategory;
