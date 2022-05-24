import { Line } from "react-chartjs-2";

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
        backgroundColor: "rgb(131, 135, 200)",
        borderColor: "rgba(131, 135, 200, 0.5)",
        pointRadius: 5,
        tension: 0.2,
      },
    ],
  };

  return <Line options={OPTIONS_CLOSED_PRS} data={GRAPH_DATA_PR} />;
};

export default MemberPRs;
