import React from "react";
import ReactECharts from "echarts-for-react";
import { SegmentData } from "../../../types";
import { useTheme } from "../../../context/ThemeContext";
import { CHART_COLORS, THEME_COLORS } from "../../../config/constants";

interface Props {
  data: SegmentData[];
  loading?: boolean;
}

const SalesBySegmentChart: React.FC<Props> = ({ data, loading }) => {
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
        data: data.map((d) => ({
          name: d.segment,
          value: Math.round(d.sales),
          itemStyle: { color: CHART_COLORS.segment[d.segment] || CHART_COLORS.fallback },
        })),
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0,0,0,0.5)" },
        },
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Sales By Segment</h3>
      <ReactECharts
        option={option}
        style={{ height: "240px", width: "100%" }}
        showLoading={loading}
        loadingOption={{ color: CHART_COLORS.primary, backgroundColor: "transparent", textColor: colors.text }}
      />
    </div>
  );
};

export default SalesBySegmentChart;
