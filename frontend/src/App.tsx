import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import DashboardPage from "./features/dashboard/components/DashboardPage";
import { useDashboard } from "./features/dashboard/hooks/useDashboard";
import { BREAKPOINTS } from "./config/constants";
import "./styles/App.css";

const AppInner: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < BREAKPOINTS.mobile;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("overview");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      if (w < BREAKPOINTS.mobile) setMobileOpen(false);
      if (w >= BREAKPOINTS.mobile && w < BREAKPOINTS.tablet) setCollapsed(true);
      if (w >= BREAKPOINTS.tablet) setCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = useCallback(() => {
    if (isMobile) setMobileOpen((o) => !o);
    else setCollapsed((c) => !c);
  }, [isMobile]);

  const handleNavigate = useCallback((page: string) => {
    setActivePage(page);
    if (isMobile) setMobileOpen(false);
  }, [isMobile]);

  const {
    states, selectedState, setSelectedState,
    dateRange, fromDate, setFromDate, toDate, setToDate,
    dashboardData, loading, error,
  } = useDashboard();

  return (
    <div className={`app-layout ${collapsed && !isMobile ? "app-layout--collapsed" : ""} ${isMobile ? "app-layout--mobile" : ""}`}>
      {isMobile && mobileOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
      )}

      <Sidebar
        collapsed={isMobile ? false : collapsed}
        mobileOpen={mobileOpen}
        isMobile={isMobile}
        onToggleCollapse={handleToggle}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <div className="app-content">
        <Topbar
          states={states}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          fromDate={fromDate}
          toDate={toDate}
          minDate={dateRange?.minDate || ""}
          maxDate={dateRange?.maxDate || ""}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          isMobile={isMobile}
          onMenuClick={handleToggle}
        />
        <DashboardPage data={dashboardData} loading={loading} error={error} />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppInner />
  </ThemeProvider>
);

export default App;
