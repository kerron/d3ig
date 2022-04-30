import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DATE_FORMAT_DAY } from "../../constants/constants";
import { useStore } from "../../hooks/useStore";
import ChartTitle from "../ChartTitle/ChartTitle";
import MemberPRs from "../Graphs/MemberPRs";
import MainCard from "../Home/components/MainCard/MainCard";
import OverviewMember from "../Home/components/Overview/OverviewMember";
import Spinner from "../Spinner/Spinner";

const Member = observer(() => {
  const [prepLabels, setPrepLabels] = useState<string[]>([]);
  const [prepData, setPrepData] = useState<number[]>([]);

  const { username } = useParams();

  const {
    octokitStore: { currentUser, firstPRDate, setCurrentUser },
  } = useStore();
  const {
    contributionGraph: {
      labels,
      datasets: { data },
    },
  } = currentUser;

  useEffect(() => {
    if (username) {
      setCurrentUser(username);
    }
  }, [username, setCurrentUser]);

  useEffect(() => {
    if (!currentUser || !data) return;
    const l = labels
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort()
      .map((v) => moment(v).format(DATE_FORMAT_DAY));

    const d = Object.values(data) as number[];
    setPrepLabels(l);
    setPrepData(d);
  }, [firstPRDate, currentUser, data, labels]);

  if (!currentUser || !data) return <Spinner />;

  return (
    <>
      <Grid mb={3} container>
        <OverviewMember />
      </Grid>
      <Grid justifyContent="space-between" spacing={2} container mb={3}>
        <Grid item xs={12} sm={12}>
          <MainCard
            title={
              <ChartTitle
                tooltipText={`This shows the number of pull requests ${username} has completed on each day since ${firstPRDate} 2022.`}
                title={`${username}'s pull requests`}
              />
            }
            graph={
              <MemberPRs
                labels={prepLabels}
                data={prepData}
                currentUser={username}
              />
            }
          />
        </Grid>
      </Grid>
    </>
  );
});

export default Member;
