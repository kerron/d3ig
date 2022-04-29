import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { Bar } from "react-chartjs-2";
import { Grid } from "@mui/material";
import OverviewMember from "../Home/components/Overview/OverviewMember";
const options = {
  indexAxis: "y" as const,

  responsive: true,
  plugins: {
    datalabels: {
      color: "#FFFFFF",
    },
    legend: {
      display: false,
      position: "right" as const,
    },
    title: {
      display: false,
    },
  },
};
const Leaderboard = observer(() => {
  const {
    octokitStore: {
      leaderboard: { labels, datasets },
    },
  } = useStore();
  const data = {
    labels,
    datasets,
  };
  return (
    <>
      <Grid mb={3} container>
        <OverviewMember />
      </Grid>
      <Bar options={options} data={data} />
    </>
  );
});

export default Leaderboard;
