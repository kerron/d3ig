import React from "react";
import { Pie } from "react-chartjs-2";
import { useStore } from "../../hooks/useStore";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { GRAPH_COLORS } from "../../constants/constants";

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
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.formattedValue} lines of code`;
        },
      },
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
        backgroundColor: GRAPH_COLORS,
        borderWidth: 2,
        hoverOffset: 4,
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
