import { Line } from "react-chartjs-2";
import { useStore } from "../../hooks/useStore";
import { getRandomColor } from "../../utils/graphs";

export const ClosedPRs = () => {
  const { octokitStore } = useStore();
  const { prsData } = octokitStore;

  const OPTIONS_CLOSED_PRS = {
    responsive: true,
    plugins: {
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
    datasets: prsData.datasets.map((v) => {
      const color = getRandomColor();
      return { ...v, borderColor: color, backgroundColor: color };
    }),
  };

  return <Line options={OPTIONS_CLOSED_PRS} data={GRAPH_DATA_PR} />;
};

export default ClosedPRs;
