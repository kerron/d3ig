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
          "rgb(64, 224, 77)",
          "rgb(148, 111, 244)",
          "rgb(107, 89, 41)",
          "rgb(187, 188, 47)",
          "rgb(255, 39, 159)",
          "rgb(79, 14, 157)",
          "rgb(253, 167, 117)",
          "rgb(134, 239, 212)",
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
