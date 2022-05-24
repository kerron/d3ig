import moment from "moment";

export const DATE_FORMAT = "DD MMM yy";
export const DATE_FORMAT_SHORT = "DD MMM YY";
export const DATE_FORMAT_DAY = "dd DD MMM";
export const ACTIVE_MEMBERS = {
  kerron: true,
  "toma-popescu-endava": true,
  AlexandruLoghin2: true,
  bratciprian: true,
  SanjeevE1996: true,
  tawandaEsure: true,
};

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

export const USER_GRAPH_COLORS = {
  kerron: ["rgb(131, 135, 200)", "rgba(131, 135, 200, 0.5)"],
  tawandaEsure: ["rgb(173, 242, 196)", "rgba(173, 242, 196, 0.5)"],
  "toma-popescu-endava": ["rgb(145, 196, 224)", "rgba(145, 196, 224, 0.5)"],
  SanjeevE1996: ["rgb(243, 205, 167)", "rgba(243, 205, 167, 0.5)"],
  AlexandruLoghin2: ["rgb(227, 128, 130)", "rgba(227, 128, 130, 0.5)"],
  bratciprian: ["rgb(215, 173, 130)", "rgba(215, 173, 130, 0.5)"],
};

export const DEFAULT_USER_GRAPH_COLOR = [
  "rgb(53, 162, 235)",
  "rgba(53, 162, 235, 0.5)",
];
