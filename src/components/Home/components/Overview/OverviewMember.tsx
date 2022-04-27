import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import moment from "moment";
import {
  DATE_FORMAT,
  DATE_FORMAT_SHORT,
} from "../../../../constants/constants";
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

const OverviewMember = () => {
  const {
    octokitStore: {
      currentUsername,
      currentUser: { additions, lastContributed, loc, totalPrs },
      firstPRDate,
      totalLOC,
    },
  } = useStore();

  const percentage = (
    (loc / parseInt(totalLOC.replace(/,/g, ""))) *
    100
  ).toFixed(1);

  return (
    <Grid spacing={2} alignItems="stretch" container>
      <OverviewCard
        title={
          <ChartTitle
            tooltipText={`Pull requests completed by ${currentUsername} since ${firstPRDate} 2022.`}
            title="Pull requests completed"
          />
        }
        body={totalPrs}
        caption={`since ${firstPRDate} 2022`}
      />
      <OverviewCard
        title={
          <ChartTitle
            tooltipText={`This show the most recent pull request by ${currentUsername} to the project.`}
            title="Last contribution"
          />
        }
        body={moment(lastContributed).fromNow()}
        caption={`on ${moment(lastContributed).format(DATE_FORMAT)}`}
      />
      <OverviewCard
        title={
          <ChartTitle
            tooltipText={`This shows the percentage of code ${currentUsername} has contributed to the overall project since ${firstPRDate} 2022.`}
            title="Total code contribution"
          />
        }
        body={`${percentage}%`}
        caption={`since ${firstPRDate} 2022`}
      />
    </Grid>
  );
};

export default OverviewMember;
