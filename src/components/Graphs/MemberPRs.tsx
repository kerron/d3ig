import { Line } from "react-chartjs-2";
import { getRandomColor } from "../../utils/graphs";

export const MemberPRs = ({ labels, data }) => {
  const OPTIONS_CLOSED_PRS = {
    responsive: true,
    plugins: {
      datalabels: {
        color: "#FFFFFF",
        formatter: () => {
          return "";
        },
      },
      legend: {
        display: false,
        position: "bottom" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const GRAPH_DATA_PR = {
    labels,
    datasets: [
      {
        data,
        borderColor: "#53C5CC",
        backgroundColor: "#7DE6ED",
        pointRadius: 5,
        tension: 0.2,
      },
    ],
  };

  return <Line options={OPTIONS_CLOSED_PRS} data={GRAPH_DATA_PR} />;
};

export default MemberPRs;
