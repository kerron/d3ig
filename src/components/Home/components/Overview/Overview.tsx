import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";
import { IProductivity } from "../../../../utils/types";
import OverviewCard from "./OverviewCard";

export const Productivity: React.FC<IProductivity> = observer(
  ({ increased, percentage }) => {
    if (isNaN(percentage)) return null;
    if (increased) {
      return (
        <span>
          <Typography
            component="span"
            color="green"
            sx={{ fontWeight: 600, fontSize: 24 }}
          >
            +{percentage}%
          </Typography>
        </span>
      );
    }
    return (
      <Typography
        component="span"
        color="red"
        sx={{ fontWeight: 600, fontSize: 24 }}
      >
        -{percentage}%
      </Typography>
    );
  }
);

const Overview = () => {
  const {
    octokitStore: { firstPRDate, totalLOC, totalPRs },
  } = useStore();

  return (
    <Grid spacing={2} alignItems="stretch" container>
      <OverviewCard
        title="Total pull requests"
        body={totalPRs}
        caption="Tasks completed"
      />
      <OverviewCard
        title="Lines of code added"
        body={totalLOC}
        caption={`since ${firstPRDate}`}
      />
    </Grid>
  );
};

export default Overview;
