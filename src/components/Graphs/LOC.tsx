import React from "react";
import { Pie } from "react-chartjs-2";
import { useStore } from "../../hooks/useStore";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

const LOC = () => {
  const { octokitStore } = useStore();
  const { locData } = octokitStore;
  const GRAPH_DATA_LOC = {
    labels: locData.labels,
    datasets: [
      {
        label: "Lines of code",
        data: locData.data,
        backgroundColor: [
          "#b3c5bf",
          "#8387c8",
          "#adf2c4",
          "#eb9fdd",
          "#e38082",
          "#91c4e0",
          "#f3cda7",
          "#d7ad82",
        ],

        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      options={OPTIONS_LOC}
      data={GRAPH_DATA_LOC}
      plugins={[ChartDataLabels]}
    />
  );
};

export default LOC;
