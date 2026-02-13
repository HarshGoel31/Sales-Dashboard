export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Sales Overview" },
  { id: "stores", label: "Stores" },
  { id: "notifications", label: "Notifications" },
  { id: "settings", label: "Settings" },
];
