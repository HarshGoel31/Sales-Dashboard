# Sales Dashboard

Full-stack Sales Dashboard — React + TypeScript (frontend) and Node.js + Express + TypeScript (backend).

---

## Quick Start

**Terminal 1 — Backend**
```bash
cd backend
npm install
npm run dev
# API running on http://localhost:5000
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

---

## Project Structure

```
sales-dashboard/
├── backend/
│   ├── data/
│   │   └── sales.json                  # Source data (9,994 records)
│   └── src/
│       ├── config/
│       │   └── constants.ts            # PORT, file name, limits
│       ├── data/
│       │   └── loader.ts               # Reads and caches sales.json
│       ├── services/
│       │   └── dashboardService.ts     # All data aggregation logic
│       ├── controllers/
│       │   └── dashboardController.ts  # HTTP request/response handling
│       ├── routes/
│       │   └── index.ts                # Route definitions
│       ├── types/
│       │   └── index.ts                # Shared TypeScript interfaces
│       ├── app.ts                      # Express app setup
│       └── index.ts                    # Server entry point
│
└── frontend/
    └── src/
        ├── assets/
        │   └── icons.tsx               # All SVG icons in one file
        ├── config/
        │   ├── constants.ts            # API base, breakpoints, chart colors
        │   └── navigation.ts           # Nav item definitions
        ├── context/
        │   └── ThemeContext.tsx        # Dark/light theme state
        ├── features/
        │   └── dashboard/              # Self-contained dashboard feature
        │       ├── components/
        │       │   ├── DashboardPage.tsx
        │       │   ├── MetricCards.tsx
        │       │   ├── SalesByCityChart.tsx
        │       │   ├── SalesByProductsTable.tsx
        │       │   ├── SalesByCategoryChart.tsx
        │       │   ├── SalesBySubCategory.tsx
        │       │   └── SalesBySegmentChart.tsx
        │       └── hooks/
        │           └── useDashboard.ts
        ├── layout/
        │   ├── Sidebar.tsx             # Collapsible + mobile overlay sidebar
        │   └── Topbar.tsx              # Header with filters
        ├── services/
        │   └── api.ts                  # Axios API calls + formatters
        ├── styles/
        │   └── App.css                 # Global styles + responsive rules
        ├── types/
        │   └── index.ts                # Shared TypeScript interfaces
        ├── App.tsx                     # Root layout + responsive state
        └── index.tsx                   # React entry point
```

---

## API Endpoints

| Method | Endpoint | Query Params | Description |
|--------|----------|-------------|-------------|
| GET | `/api/states` | — | List of all states |
| GET | `/api/date-range` | `state` | Min/max order date for a state |
| GET | `/api/dashboard` | `state`, `fromDate`, `toDate` | All KPI + chart data |
| GET | `/health` | — | Health check |

---

## Features

- State dropdown populated from API, defaults to first state
- From/To date pickers bound to min/max dates for the selected state
- All cards and charts update live on filter change
- Collapsible sidebar (icon-strip on tablet, overlay drawer on mobile)
- Light/Dark theme toggle in sidebar
- Fully responsive — desktop, tablet, mobile
- TypeScript strict mode on both frontend and backend
- No database — all data served from `sales.json` in-memory
