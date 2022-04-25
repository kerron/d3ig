import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useStore } from "../../../../hooks/useStore";
import { IProductivity } from "../../../../utils/types";
import ChartTitle from "../../../ChartTitle/ChartTitle";
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
    octokitStore: { lastMerge, firstPRDate, totalLOC, totalPRs },
  } = useStore();

  return (
    <Grid spacing={2} alignItems="stretch" container>
      <OverviewCard
        title={
          <ChartTitle
            tooltipText={`Pull requests let you tell others about changes you've pushed to a branch in a repository on GitHub. It may include one or more tickets from the sprint. This is a count of pull requests done since ${firstPRDate}.`}
            title="Pull requests closed"
          />
        }
        body={totalPRs}
        caption={`since ${firstPRDate}`}
      />
      <OverviewCard
        title={
          <ChartTitle
            tooltipText={`This shows how long ago the most recent pull request closed, and who was the contributor.`}
            title="Most recent contribution"
          />
        }
        body={moment(lastMerge.mergedAt).fromNow()}
        caption={`by ${lastMerge.author.login}`}
      />
      <OverviewCard
        title="Total lines of code in project"
        body={totalLOC}
        caption={`since ${firstPRDate}`}
      />
    </Grid>
  );
};

export default Overview;
