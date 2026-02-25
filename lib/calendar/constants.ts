export const COLORS = {
  background: "#1C1C1E",
  past: "#E5E5EA",
  today: "#FF6B35",
  future: "#48484A",
  text: "#8E8E93",
} as const;

export const COLUMNS = 19;

export const PHONE_MODELS = [
  {
    value: "iphone_13_mini",
    label: "iPhone 13 mini",
    height: 2340,
    width: 1080,
  },
  {
    value: "iphone_13",
    label: "iPhone 13 / 13 Pro / 14 / 14 Pro",
    height: 2532,
    width: 1170,
  },
  {
    value: "iphone_13_pro_max",
    label: "iPhone 13 Pro Max / 14 Plus / 14 Pro Max",
    height: 2778,
    width: 1284,
  },
  {
    value: "iphone_15",
    label: "iPhone 15 / 15 Pro / 16",
    height: 2556,
    width: 1179,
  },
  {
    value: "iphone_15_plus",
    label: "iPhone 15 Plus / 15 Pro Max / 16 Plus",
    height: 2796,
    width: 1290,
  },
  {
    value: "iphone_16_pro",
    label: "iPhone 16 Pro",
    height: 2622,
    width: 1206,
  },
  {
    value: "iphone_16_pro_max",
    label: "iPhone 16 Pro Max",
    height: 2868,
    width: 1320,
  },
  {
    value: "iphone_17",
    label: "iPhone 17",
    height: 2556,
    width: 1179,
  },
  {
    value: "iphone_17_pro",
    label: "iPhone 17 Pro",
    height: 2622,
    width: 1206,
  },
  {
    value: "iphone_17_pro_max",
    label: "iPhone 17 Pro Max",
    height: 2868,
    width: 1320,
  },
] as const;

export const LAYOUTS = [
  { value: "days", label: "Days (all days of the year)" },
  {
    value: "months",
    label: "Months (all days of the year grouped by months)",
  },
  {
    value: "quarters",
    label: "Quarters (all days of the year grouped by quarters)",
  },
] as const;

export const CALENDAR_TYPES = [
  {
    id: "life",
    title: "Life Calendar",
    description: "Visualize your life in weeks",
  },
  {
    id: "year",
    title: "Year Calendar",
    description: "Track the current year's progress",
  },
  {
    id: "goal",
    title: "Goal Calendar",
    description: "Count down to your deadline",
  },
] as const;
