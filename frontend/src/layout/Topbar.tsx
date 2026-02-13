import React from "react";
import { CalendarIcon, MenuIcon, UserIcon } from "../assets/icons";

interface Props {
  states: string[];
  selectedState: string;
  onStateChange: (state: string) => void;
  fromDate: string;
  toDate: string;
  minDate: string;
  maxDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  isMobile?: boolean;
  onMenuClick?: () => void;
}

const Topbar: React.FC<Props> = ({
  states, selectedState, onStateChange,
  fromDate, toDate, minDate, maxDate,
  onFromDateChange, onToDateChange,
  isMobile = false, onMenuClick,
}) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (toDate && val > toDate) return;
    onFromDateChange(val);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (fromDate && val < fromDate) return;
    onToDateChange(val);
  };

  return (
    <header className={`topbar ${isMobile ? "topbar--mobile" : ""}`}>
      <div className="topbar__header-row">
        {isMobile && (
          <button className="topbar__menu-btn" onClick={onMenuClick} aria-label="Open navigation">
            <MenuIcon />
          </button>
        )}
        <h1 className="topbar__title">Sales Overview</h1>
        <div className="topbar__user">
          <span className="topbar__user-name">Hello User</span>
          <div className="topbar__avatar">
            <UserIcon size={18} />
          </div>
        </div>
      </div>

      <div className="topbar__filters-row">
        <div className="topbar__filter-group">
          <label className="topbar__filter-label">Select a state</label>
          <select className="topbar__select" value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="topbar__filter-group">
          <label className="topbar__filter-label" htmlFor="from-date">Select From date</label>
          <div className="topbar__date-wrapper">
            <span className="topbar__date-icon"><CalendarIcon /></span>
            <input
              id="from-date"
              type="date"
              className="topbar__date-input"
              value={fromDate}
              min={minDate}
              max={toDate || maxDate}
              onChange={handleFromChange}
              disabled={!minDate}
            />
          </div>
        </div>

        <div className="topbar__filter-group">
          <label className="topbar__filter-label" htmlFor="to-date">Select To date</label>
          <div className="topbar__date-wrapper">
            <span className="topbar__date-icon"><CalendarIcon /></span>
            <input
              id="to-date"
              type="date"
              className="topbar__date-input"
              value={toDate}
              min={fromDate || minDate}
              max={maxDate}
              onChange={handleToChange}
              disabled={!maxDate}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
