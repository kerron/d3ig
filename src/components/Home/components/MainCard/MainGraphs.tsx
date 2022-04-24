import { Box, Grid, Typography } from "@mui/material";
import MainCard from "./MainCard";
import LOC from "../../../Graphs/LOC";
import ContributionChart from "../../../Graphs/ContributionChart";
import ClosedPRs from "../../../Graphs/ClosedPRs";
import { useStore } from "../../../../hooks/useStore";
import InfoTooltip from "../../../Header/components/InfoTooltip/InfoTooltip";

export const Title = () => {
  const {
    octokitStore: { firstPRDate },
  } = useStore();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <InfoTooltip
        title={`Shows the number of pull requests (tasks) completed by each team member since ${firstPRDate}. You can filter by clicking on the contributor's name.`}
      />
      <Typography>Team's Activity</Typography>
    </Box>
  );
};

const MainGraphs = () => {
  return (
    <Grid justifyContent="space-between" spacing={2} container>
      <Grid item xs={12} sm={12}>
        <MainCard title={<Title />} graph={<ClosedPRs />} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard title="Overall contributions" graph={<ContributionChart />} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MainCard title="Total LOC By Contributor" graph={<LOC />} />
      </Grid>
    </Grid>
  );
};

export default MainGraphs;
