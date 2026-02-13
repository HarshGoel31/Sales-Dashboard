import * as fs from "fs";
import * as path from "path";
import { SalesRecord } from "../types";
import { DATA_FILE } from "../config/constants";

let cache: SalesRecord[] | null = null;

export function loadSalesData(): SalesRecord[] {
  if (cache) return cache;
  const filePath = path.join(__dirname, "..", "..", "data", DATA_FILE);
  const raw = fs.readFileSync(filePath, "utf-8");
  cache = JSON.parse(raw) as SalesRecord[];
  return cache;
}
