import { Line } from "react-chartjs-2";
import { GRAPH_COLORS } from "../../constants/constants";
import { useStore } from "../../hooks/useStore";

export const ClosedPRs = () => {
  const { octokitStore } = useStore();
  const { prsData } = octokitStore;
  const OPTIONS_CLOSED_PRS = {
    responsive: true,
    hitRadius: 20,
    hoverRadius: 8,

    interaction: {
      intersect: false,
      mode: "nearest",
    },
    plugins: {
      tooltip: {
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += `: ${context.raw} PR${context.raw > 1 ? "s" : ""}`;
            }
            return label;
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      datalabels: {
        color: "#FFFFFF",
        formatter: () => {
          return "";
        },
      },
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const GRAPH_DATA_PR = {
    labels: prsData.labels,
    datasets: prsData.datasets.map((v, i) => {
      return {
        ...v,
        borderColor: GRAPH_COLORS[i],
        backgroundColor: GRAPH_COLORS[i],
        pointRadius: 5,
        tension: 0.2,
      };
    }),
  };
  // @ts-ignore: Unreachable code error
  return <Line options={OPTIONS_CLOSED_PRS} data={GRAPH_DATA_PR} />;
};

export default ClosedPRs;
