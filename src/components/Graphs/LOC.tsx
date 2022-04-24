import React from "react";
import { PolarArea } from "react-chartjs-2";
import { OPTIONS_LOC } from "../../constants/graphs";
import { useStore } from "../../hooks/useStore";

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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <PolarArea options={OPTIONS_LOC} data={GRAPH_DATA_LOC} />;
};

export default LOC;
