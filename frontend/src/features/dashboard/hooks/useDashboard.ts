import { useState, useEffect, useCallback } from "react";
import { DashboardData, DateRangeResponse } from "../../../types";
import { fetchStates, fetchDateRange, fetchDashboardData } from "../../../services/api";

export const useDashboard = () => {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRangeResponse | null>(null);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStates()
      .then((list) => {
        setStates(list);
        if (list.length > 0) setSelectedState(list[0]);
      })
      .catch(() => setError("Failed to load states"));
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    fetchDateRange(selectedState)
      .then((range) => {
        setDateRange(range);
        setFromDate(range.minDate);
        setToDate(range.maxDate);
      })
      .catch(() => setError("Failed to load date range"));
  }, [selectedState]);

  const loadDashboard = useCallback(async () => {
    if (!selectedState || !fromDate || !toDate) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData(selectedState, fromDate, toDate);
      setDashboardData(data);
    } catch {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [selectedState, fromDate, toDate]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    states,
    selectedState,
    setSelectedState,
    dateRange,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    dashboardData,
    loading,
    error,
  };
};
