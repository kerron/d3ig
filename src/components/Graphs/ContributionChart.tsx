import { observer } from "mobx-react-lite";
import { Bar } from "react-chartjs-2";
import { OPTIONS_CONTRIBUTION } from "../../constants/graphs";
import { useStore } from "../../hooks/useStore";

export const ContributionChart = observer(() => {
  const {
    octokitStore: {
      contributionChart: { labels, datasets },
    },
  } = useStore();

  const data = {
    labels,
    datasets,
  };
  return <Bar options={OPTIONS_CONTRIBUTION} data={data} />;
});

export default ContributionChart;
