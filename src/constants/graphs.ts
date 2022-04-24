export const OPTIONS_LOC = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Lines of code commited since January",
    },
  },
};

export const OPTIONS_RECENT_ACTIVITY = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};
export const OPTIONS_CONTRIBUTION = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
    },
  },
};
