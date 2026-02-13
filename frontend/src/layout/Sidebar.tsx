import React from "react";
import { useTheme } from "../context/ThemeContext";
import { NAV_ITEMS } from "../config/navigation";
import {
  BarChartIcon, StoreIcon, BellIcon, SettingsIcon,
  MoonIcon, SunIcon, MenuIcon, CloseIcon,
} from "../assets/icons";

const NAV_ICONS: Record<string, React.FC> = {
  overview: BarChartIcon,
  stores: StoreIcon,
  notifications: BellIcon,
  settings: SettingsIcon,
};

interface Props {
  collapsed: boolean;
  mobileOpen: boolean;
  isMobile: boolean;
  onToggleCollapse: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<Props> = ({
  collapsed, mobileOpen, isMobile, onToggleCollapse, activePage, onNavigate,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const showLabels = isMobile || !collapsed;

  const className = [
    "sidebar",
    !isMobile && collapsed ? "sidebar--collapsed" : "",
    isMobile ? "sidebar--mobile" : "",
    isMobile && mobileOpen ? "sidebar--mobile-open" : "",
  ].filter(Boolean).join(" ");

  return (
    <aside className={className} aria-hidden={isMobile && !mobileOpen}>
      <div className="sidebar__header">
        <button className="sidebar__menu-btn" onClick={onToggleCollapse} aria-label="Toggle navigation">
          {isMobile && mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        {showLabels && <span className="sidebar__title">Sales Dashboard</span>}
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ id, label }) => {
          const Icon = NAV_ICONS[id];
          return (
            <button
              key={id}
              className={`sidebar__nav-item ${activePage === id ? "sidebar__nav-item--active" : ""}`}
              onClick={() => onNavigate(id)}
              title={!showLabels ? label : undefined}
            >
              <span className="sidebar__nav-icon">{Icon && <Icon />}</span>
              {showLabels && <span className="sidebar__nav-label">{label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button
          className="sidebar__nav-item sidebar__theme-btn"
          onClick={toggleTheme}
          title={!showLabels ? (isDark ? "Light Theme" : "Dark Theme") : undefined}
        >
          <span className="sidebar__nav-icon">{isDark ? <SunIcon /> : <MoonIcon />}</span>
          {showLabels && (
            <span className="sidebar__nav-label">{isDark ? "Light Theme" : "Dark Theme"}</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
