import { Line } from "react-chartjs-2";
import { USER_GRAPH_COLORS } from "../../constants/constants";

export const MemberPRs = ({ labels, data, currentUser }) => {
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
        backgroundColor: USER_GRAPH_COLORS[currentUser][0],
        borderColor: USER_GRAPH_COLORS[currentUser][1],
        pointRadius: 5,
        tension: 0.2,
      },
    ],
  };

  return <Line options={OPTIONS_CLOSED_PRS} data={GRAPH_DATA_PR} />;
};

export default MemberPRs;
