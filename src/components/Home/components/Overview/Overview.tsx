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
    octokitStore: {
      averageTimeInCR,
      lastMerge,
      firstPRDate,
      totalLOC,
      totalPRs,
    },
  } = useStore();

  return (
    <Grid spacing={2} alignItems="stretch" container>
      <OverviewCard
        title={
          <ChartTitle
            tooltipText={`Pull requests can be considered as a unit of work. It may include one or more tickets from the sprint. This shows the total pull requests done since ${firstPRDate} 2022.`}
            title="Pull requests closed"
          />
        }
        body={totalPRs}
        caption={`since ${firstPRDate} 2022`}
      />
      <OverviewCard
        title={
          <ChartTitle
            tooltipText="This shows when the most recent pull request was closed, and who was the contributor."
            title="Last contribution"
          />
        }
        body={moment(lastMerge.mergedAt).fromNow()}
        caption={`by ${lastMerge.author.login}`}
      />
      <OverviewCard
        title={
          <ChartTitle
            tooltipText="This shows the average time it take the team to code review a pull request."
            title="Average time in code review"
          />
        }
        body={`${averageTimeInCR} days`}
        caption={`since ${firstPRDate} 2022`}
      />
      <OverviewCard
        title="Lines of code added"
        body={totalLOC}
        caption={`since ${firstPRDate} 2022`}
      />
    </Grid>
  );
};

export default Overview;
