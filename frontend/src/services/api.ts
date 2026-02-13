import axios from "axios";
import { StatesResponse, DateRangeResponse, DashboardData } from "../types";
import { API_BASE } from "../config/constants";

const api = axios.create({ baseURL: API_BASE });

export const fetchStates = async (): Promise<string[]> => {
  const { data } = await api.get<StatesResponse>("/states");
  return data.states;
};

export const fetchDateRange = async (state: string): Promise<DateRangeResponse> => {
  const { data } = await api.get<DateRangeResponse>("/date-range", { params: { state } });
  return data;
};

export const fetchDashboardData = async (
  state: string,
  fromDate: string,
  toDate: string
): Promise<DashboardData> => {
  const { data } = await api.get<DashboardData>("/dashboard", {
    params: { state, fromDate, toDate },
  });
  return data;
};

export const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};
