export const OPTIONS_LOC = {
  responsive: true,
  plugins: {
    datalabels: {
      color: "#FFFFFF",
      formatter: (value, context) => {
        const datapoints = context.chart.data.datasets[0].data;
        // console.log(context.chart.data.labels);
        const totalVal = datapoints.reduce((a, v) => a + v, 0);
        const percentageVal = ((value / totalVal) * 100).toFixed(1);
        return `${percentageVal}%`;
      },
    },
    legend: {
      position: "top" as const,
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    tooltip: {
      callbacks: {},
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
