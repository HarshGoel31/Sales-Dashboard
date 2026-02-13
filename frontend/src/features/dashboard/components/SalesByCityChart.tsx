import React from "react";
import ReactECharts from "echarts-for-react";
import { CityData } from "../../../types";
import { useTheme } from "../../../context/ThemeContext";
import { THEME_COLORS } from "../../../config/constants";

interface Props {
  data: CityData[];
  loading?: boolean;
}

const SalesByCityChart: React.FC<Props> = ({ data, loading }) => {
  const { isDark } = useTheme();
  const colors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

  const sorted = [...data].sort((a, b) => a.sales - b.sales);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => `${params[0].name}: $${params[0].value.toLocaleString()}`,
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      textStyle: { color: colors.tooltipText },
    },
    grid: { left: "3%", right: "8%", top: "2%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "value",
      axisLabel: {
        color: colors.text,
        fontSize: 10,
        formatter: (v: number) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "K" : v}`,
      },
      splitLine: { lineStyle: { color: colors.grid } },
      axisLine: { show: false },
    },
    yAxis: {
      type: "category",
      data: sorted.map((d) => d.city),
      axisLabel: { color: colors.text, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        data: sorted.map((d) => Math.round(d.sales)),
        barMaxWidth: 20,
        itemStyle: { color: colors.bar, borderRadius: [0, 3, 3, 0] },
        emphasis: { itemStyle: { color: colors.barHover } },
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Sales by City</h3>
      <ReactECharts
        option={option}
        style={{ height: "280px", width: "100%" }}
        showLoading={loading}
        loadingOption={{ color: colors.bar, backgroundColor: colors.loadingBg, textColor: colors.text }}
      />
    </div>
  );
};

export default SalesByCityChart;
