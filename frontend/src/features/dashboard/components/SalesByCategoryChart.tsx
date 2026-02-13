import React from "react";
import ReactECharts from "echarts-for-react";
import { CategoryData } from "../../../types";
import { useTheme } from "../../../context/ThemeContext";
import { CHART_COLORS, THEME_COLORS } from "../../../config/constants";

interface Props {
  data: CategoryData[];
  loading?: boolean;
}

const SalesByCategoryChart: React.FC<Props> = ({ data, loading }) => {
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: "{b}: ${c} ({d}%)",
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      textStyle: { color: colors.tooltipText },
    },
    legend: {
      bottom: "2%",
      left: "center",
      textStyle: { color: colors.text, fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10,
    },
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        data: data.map((d, i) => ({
          name: d.category,
          value: Math.round(d.sales),
          itemStyle: { color: CHART_COLORS.category[i % CHART_COLORS.category.length] },
        })),
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0,0,0,0.5)" },
        },
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Sales By Category</h3>
      <ReactECharts
        option={option}
        style={{ height: "240px", width: "100%" }}
        showLoading={loading}
        loadingOption={{ color: CHART_COLORS.primary, backgroundColor: "transparent", textColor: colors.text }}
      />
    </div>
  );
};

export default SalesByCategoryChart;
