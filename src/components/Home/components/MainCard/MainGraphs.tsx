import { Grid } from "@mui/material";
import MainCard from "./MainCard";
import LOC from "../../../Graphs/LOC";
import ClosedPRs from "../../../Graphs/ClosedPRs";
import { useStore } from "../../../../hooks/useStore";
import ChartTitle from "../../../ChartTitle/ChartTitle";

const MainGraphs = () => {
  const {
    octokitStore: { firstPRDate },
  } = useStore();
  return (
    <Grid justifyContent="space-between" spacing={2} container>
      <Grid item xs={12} sm={12}>
        <MainCard
          title={
            <ChartTitle
              tooltipText={`Shows the number of pull requests (tasks) completed by each team member since ${firstPRDate}. You can filter by clicking on a contributor's name.`}
              title="Team Members' Activity"
            />
          }
          graph={<ClosedPRs />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard
          title={
            <ChartTitle
              tooltipText={`Shows the total lines of code contributed by each team member since ${firstPRDate}. You can filter by clicking on a contributor's name.`}
              title="Code Contribution"
            />
          }
          graph={<LOC />}
        />
      </Grid>
    </Grid>
  );
};

export default MainGraphs;
