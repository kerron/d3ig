import { Grid } from "@mui/material";
import { useStore } from "../../../../hooks/useStore";
import ChartTitle from "../../../ChartTitle/ChartTitle";
import OverviewCard from "./OverviewCard";

const OverviewLeaderboard = () => {
  const {
    octokitStore: { firstPRDate, totalContributions },
  } = useStore();

  return (
    <Grid
      sx={{
        justifyContent: "space-between",
        marginBottom: 2,
      }}
      container
    >
      <OverviewCard
        title={
          <ChartTitle
            tooltipText={`Total contributions to the project since ${firstPRDate} 2022.`}
            title="Total contributions"
          />
        }
        body={totalContributions}
        caption={`since ${firstPRDate} 2022`}
      />
    </Grid>
  );
};

export default OverviewLeaderboard;
