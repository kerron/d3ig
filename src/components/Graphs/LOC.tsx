import React from "react";
import { Pie } from "react-chartjs-2";
import { OPTIONS_LOC } from "../../constants/graphs";
import { useStore } from "../../hooks/useStore";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
