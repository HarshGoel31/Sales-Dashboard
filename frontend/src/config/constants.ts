export const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

export const CHART_COLORS = {
  primary: "#38bdf8",
  primaryLight: "#7dd3fc",
  primaryMuted: "#0ea5e9",
  category: ["#38bdf8", "#f87171", "#fbbf24"],
  segment: {
    Consumer: "#38bdf8",
    Corporate: "#fbbf24",
    "Home Office": "#f87171",
  } as Record<string, string>,
  fallback: "#94a3b8",
} as const;

export const THEME_COLORS = {
  dark: {
    text: "#94a3b8",
    grid: "#1e293b",
    tooltipBg: "#1e293b",
    tooltipBorder: "#334155",
    tooltipText: "#e2e8f0",
    bar: "#38bdf8",
    barHover: "#7dd3fc",
    barBg: "#1e293b",
    loadingBg: "#0f172a",
  },
  light: {
    text: "#475569",
    grid: "#e2e8f0",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e2e8f0",
    tooltipText: "#1e293b",
    bar: "#0ea5e9",
    barHover: "#38bdf8",
    barBg: "#e0f2fe",
    loadingBg: "#ffffff",
  },
} as const;

export const TOP_N_DISPLAY = 10;
