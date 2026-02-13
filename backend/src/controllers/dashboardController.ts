import { Request, Response } from "express";
import { getStates, getDateRangeForState, getDashboardData } from "../services/dashboardService";

export function statesController(_req: Request, res: Response): void {
  try {
    res.json({ states: getStates() });
  } catch {
    res.status(500).json({ error: "Failed to load states" });
  }
}

export function dateRangeController(req: Request, res: Response): void {
  try {
    const state = req.query.state as string;
    if (!state) {
      res.status(400).json({ error: "state query parameter is required" });
      return;
    }
    const { minDate, maxDate } = getDateRangeForState(state);
    if (!minDate) {
      res.status(404).json({ error: `No data found for state: ${state}` });
      return;
    }
    res.json({ state, minDate, maxDate });
  } catch {
    res.status(500).json({ error: "Failed to get date range" });
  }
}

export function dashboardController(req: Request, res: Response): void {
  try {
    const state = req.query.state as string;
    const fromDate = req.query.fromDate as string;
    const toDate = req.query.toDate as string;

    if (!state || !fromDate || !toDate) {
      res.status(400).json({ error: "state, fromDate, and toDate query parameters are required" });
      return;
    }

    res.json(getDashboardData(state, fromDate, toDate));
  } catch {
    res.status(500).json({ error: "Failed to get dashboard data" });
  }
}
