const tintColorLight = "#007AFF";
const tintColorDark = "#0A84FF";

export type ColorTiers =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "primary"
  | "secondary";

export default {
  tiers: {
    Good: "#4CAE4F",
    Moderate: "#FFEB3B",
    "Unhealthy for Sensitive Groups": "#FF9800",
    Unhealthy: "#F44336",
    "Very Unhealthy": "#8E44AD",
    Hazardous: "#800000",
  },
  light: {
    text: "#1A1A1A",
    background: "#F5F5F5",
    tint: tintColorLight,
    tabIconDefault: "#8E8E93",
    tabIconSelected: tintColorLight,
    primary: "#007AFF",
    secondary: "#34C759",
    success: "#28A745",
    danger: "#DC3545",
    warning: "#FF9500",
    info: "#17A2B8",
  },
  dark: {
    text: "#F5F5F5",
    background: "#1A1A1A",
    tint: tintColorDark,
    tabIconDefault: "#8E8E93",
    tabIconSelected: tintColorDark,
    primary: "#0A84FF",
    secondary: "#30D158",
    success: "#32D74B",
    danger: "#FF453A",
    warning: "#FF9F0A",
    info: "#64D2FF",
  },
};
