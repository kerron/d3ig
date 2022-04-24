import { Line } from "react-chartjs-2";
import { OPTIONS_RECENT_ACTIVITY } from "../../constants/graphs";
import { useStore } from "../../hooks/useStore";

export const RecentActivityRepoChart = () => {
  const {
    octokitStore: { recentActivity },
  } = useStore();

  const GRAPH_DATA_PR = {
    labels: new Array(12).fill("a"),
    datasets: [{ data: recentActivity }],
  };
  console.log("recentActivity", recentActivity.length);
  return <Line options={OPTIONS_RECENT_ACTIVITY} data={GRAPH_DATA_PR} />;
};

export default RecentActivityRepoChart;
