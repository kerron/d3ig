import moment from "moment";

export const DATE_FORMAT = "DD MMM yy";
export const DATE_FORMAT_SHORT = "DD MMM YY";
export const DATE_FORMAT_DAY = "dd DD MMM";
export const getChartRange = (weeks: number): string[] =>
  new Array(weeks + 1)
    .fill(0)
    .map((_, i) =>
      moment().subtract(i, "weeks").startOf("isoWeek").format("YYYY-MM-DD")
    );

export const GRAPH_COLORS = [
  "#8387c8",
  "#adf2c4",
  "#91c4e0",
  "#f3cda7",
  "#e38082",
  "#d7ad82",
  "#b3c5bf",
  "#9096b1",
];

export const DEFAULT_USER_GRAPH_COLOR = [
  "rgb(53, 162, 235)",
  "rgba(53, 162, 235, 0.5)",
];

export const INVALID_URL_STR = "Failed to construct 'URL': Invalid URL";
export const DEFAULT_ERROR_MESSAGE = "Please enter a valid Github repository";
