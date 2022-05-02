import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { Bar } from "react-chartjs-2";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import MainCard from "../Home/components/MainCard/MainCard";
import ChartTitle from "../ChartTitle/ChartTitle";
import OverviewLeaderboard from "../Home/components/Overview/OverviewLeaderboard";
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
      firstPRDate,
      leaderboard: { labels, datasets },
      getLeaderboard,
    },
  } = useStore();
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  const data = {
    labels,
    datasets,
  };

  return (
    <>
      <Grid mb={3} container>
        <OverviewLeaderboard />
      </Grid>
      <Grid justifyContent="space-between" spacing={2} container>
        <Grid item xs={12} sm={12}>
          {!!labels.length && (
            <MainCard
              title={
                <ChartTitle
                  tooltipText={`This shows a leaderboard of active members ranked by their contribution to the project since ${firstPRDate} 2022.`}
                  title="Leaderboard"
                />
              }
              graph={<Bar options={options} data={data} />}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
});

export default Leaderboard;
