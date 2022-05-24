import { toJS } from "mobx";
import { cast, flow, getParent, Instance, types } from "mobx-state-tree";
import moment from "moment";
import { IRootStore } from "..";
import {
  ACTIVE_MEMBERS,
  DATE_FORMAT_SHORT,
  DEFAULT_USER_GRAPH_COLOR,
  USER_GRAPH_COLORS,
} from "../../../constants/constants";
import { getRandomColor } from "../../../utils/graphs";
import {
  IUserData,
  TContributionsByContributor,
  TContributor,
  TDatasets,
  TLeaderboard,
  TContributionsOnDate,
} from "../../../utils/types";

interface IChartDataLOC {
  labels: string[];
  data: number[];
}

interface IChartDataPRS {
  labels: string[];
  datasets: IChartLineData[];
}
interface IChartLineData {
  label: string;
  data: number[];
}
const ChartLineModel = types.model("ChartLineModel", {
  label: "",
  data: types.array(types.number),
});
const AuthorModel = types.model("AuthorModel", {
  login: "",
  avatarUrl: "",
  url: "",
});

const PRDataModel = types.model("PRDataModel", {
  author: AuthorModel,
  additions: types.number,
  mergedAt: "",
  createdAt: "",
  title: "",
  url: "",
});

const NodeModel = types.model("NodeModel", {
  nodes: types.array(PRDataModel),
  totalCount: types.optional(types.number, 0),
});

const PullRequestModel = types.model("PullRequestModel", {
  pullRequests: types.optional(NodeModel, () => NodeModel.create()),
});

const RepositoryModel = types.model("RepositoryModel", {
  repository: types.optional(PullRequestModel, () => PullRequestModel.create()),
});

const LOCDataModel = types.model("LOCDataModel", {
  labels: types.array(types.string),
  data: types.array(types.number),
});

const PrsDataModel = types.model("PrsDataModel", {
  labels: types.array(types.string),
  datasets: types.array(ChartLineModel),
});

const ContributorModel = types.model("ContributorModel", {
  login: types.string,
  avatarURL: types.string,
  contributions: types.number,
  id: types.number,
  url: types.string,
});

const DatasetModel = types.model("DatasetModel", {
  data: types.array(types.number),
  backgroundColor: types.array(types.string),
});

const ContributorChartModel = types.model("ContributorChartModel", {
  labels: types.array(types.string),
  datasets: types.array(DatasetModel),
});

const ContributionGraphDatasets = types.model("ContributionGraphDatasets", {
  label: types.optional(types.string, ""),
  data: types.frozen(),
});

const ContributionGraph = types.model("ContributionGraph", {
  labels: types.optional(types.array(types.string), []),
  datasets: types.optional(ContributionGraphDatasets, () =>
    ContributionGraphDatasets.create({})
  ),
});

const UserModel = types.model("UserModel", {
  additions: types.array(types.number),
  contributionGraph: types.optional(ContributionGraph, () =>
    ContributionGraph.create()
  ),
  lastContributed: types.optional(types.string, ""),
  loc: types.optional(types.number, 0),
  totalPrs: types.optional(types.number, 0),
});

const LeaderboardGraphDatasets = types.model("LeaderboardGraphDatasets", {
  label: types.optional(types.string, ""),
  data: types.optional(types.array(types.number), []),
  backgroundColor: types.optional(types.array(types.string), []),
});

const LeaderboardModel = types.model("LeaderboardModel", {
  labels: types.array(types.string),
  datasets: types.optional(types.array(LeaderboardGraphDatasets), []),
});

const OctokitStore = types
  .model("OctokitStore", {
    homeChartData: types.optional(RepositoryModel, () =>
      RepositoryModel.create()
    ),
    mergedPRsData: types.optional(RepositoryModel, () =>
      RepositoryModel.create()
    ),
    locData: types.optional(LOCDataModel, () => LOCDataModel.create()),
    prsData: types.optional(PrsDataModel, () => PrsDataModel.create({})),
    isLoading: false,
    showHomeCharts: false,
    activeMembersState: types.optional(types.array(ContributorModel), []),
    inActiveMembersState: types.optional(types.array(ContributorModel), []),
    contributors: types.optional(types.array(ContributorModel), []),
    contributionChart: types.optional(ContributorChartModel, () =>
      ContributorChartModel.create()
    ),
    weeklyActivity: types.optional(
      types.array(types.number),
      new Array(52).fill(0)
    ),
    daysWithPR: types.optional(types.array(types.string), []),
    totalLOCState: 0,
    userDataState: types.frozen<IUserData>(),
    currentUserState: types.optional(UserModel, () => UserModel.create()),
    currentUsernameState: types.optional(types.string, ""),
    timeInCRState: types.optional(types.array(types.number), []),
    leaderboardState: types.optional(LeaderboardModel, () =>
      LeaderboardModel.create()
    ),
    totalContributionsState: types.optional(types.number, 0),
    repoNameState: "",
    repoOwnerState: "",
    recentContributors: types.map(types.number),
  })
  .actions((self) => ({
    getRepo: flow(function* ({ owner, name }) {
      try {
        const root: IRootStore = getParent(self);
        root.authStore.getAuth();
        const resp = yield root.authStore.graphqlWithAuth(`
        {
          repository(name: "${name}", owner: "${owner}") {
            pullRequests(last: 100, states: MERGED) {
              nodes {
                additions
                title
                url
                mergedAt
                createdAt
                author {
                  login
                  avatarUrl,
                  url
                }
              }
              totalCount
            }
          }
        }
        `);
        self.mergedPRsData = resp;
        self.repoNameState = name;
        self.repoOwnerState = owner;
        root.uiStore.setHasData(true);
        root.octokitStore.getMergedPrs();
        root.octokitStore.getChartLOC();
        root.octokitStore.getAverageTimeInCR();
        root.octokitStore.getContributors();
        root.octokitStore.getUserData();
        return;
      } catch (e) {
        const root: IRootStore = getParent(self);
        root.uiStore.setHasData(false);
        console.log({ e });
        return;
      }
    }),
    getMergedPrs() {
      const datesKeyObj =
        self.mergedPRsData.repository.pullRequests.nodes.reduce(
          (prev, curr) => {
            const key = curr.mergedAt.split("T")[0];
            const author = curr.author.login;

            return {
              ...prev,
              [key]: {
                ...prev[key],
                [author]: 1 + (prev[key]?.[author] || 0),
              },
            };
          },
          {}
        );
      const contributorsObj =
        self.mergedPRsData.repository.pullRequests.nodes.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.author.login]: 0,
          }),
          {}
        );
      const contributorsArr =
        self.mergedPRsData.repository.pullRequests.nodes.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.author.login]: [],
          }),
          {}
        );

      let contributionsByContributor: TContributionsByContributor = {};

      for (const dateKey in datesKeyObj) {
        contributionsByContributor[dateKey] = {
          ...contributorsObj,
          ...datesKeyObj[dateKey],
        };
      }

      const contributionsOnDate: TContributionsOnDate = Object.values(
        contributionsByContributor
      ).reduce(
        (prev: TContributionsOnDate, curr) => {
          const datesKeys = Object.keys(curr);
          const result = {};

          for (const dateKey of datesKeys) {
            const prevArr =
              Symbol.iterator in Object(prev[dateKey]) ? prev[dateKey] : [];
            result[dateKey] = [...prevArr, curr[dateKey]];
          }

          return result;
        },
        {
          ...contributorsArr,
        }
      );

      const datasets: IChartLineData[] = [];

      for (const date in contributionsOnDate) {
        datasets.push({
          label: date,
          data: contributionsOnDate[date],
        });
      }

      const labels = Object.keys(datesKeyObj).map((v) =>
        moment(new Date(v)).format(DATE_FORMAT_SHORT)
      );

      const chartData: IChartDataPRS = {
        labels,
        datasets,
      };

      self.daysWithPR = cast(labels);
      self.prsData = cast(chartData);
      self.isLoading = false;
      self.recentContributors = cast(contributorsObj);
    },
    getHomeChartData: flow(function* () {
      try {
        self.isLoading = true;
        const root: IRootStore = getParent(self);
        const resp = yield root.authStore.graphqlWithAuth(`
        {
          repository(name: "fe-react-app-integrated-eclaim", owner: "esure-cloud") {
            pullRequests(last: 100, states: MERGED) {
              nodes {
                additions
                title
                url
                mergedAt
                createdAt
                author {
                  login
                  avatarUrl,
                  url
                }
              }
              totalCount
            }
          }
        }
        `);

        self.homeChartData = resp;
        root.octokitStore.getChartPR();
        root.octokitStore.getChartLOC();
        root.octokitStore.getContributors();
        // root.octokitStore.getUserData();
        root.octokitStore.getAverageTimeInCR();
        // root.octokitStore.getRecentActivity();
        self.isLoading = false;
        self.showHomeCharts = true;
        return;
      } catch (e) {
        self.isLoading = false;
        self.showHomeCharts = false;
        console.log(e);
      }
    }),
    getAverageTimeInCR() {
      const data = self.mergedPRsData.repository.pullRequests.nodes.map((v) =>
        moment(v.mergedAt).diff(v.createdAt, "hours")
      );
      self.timeInCRState = cast(data);
    },
    getUserData() {
      const userObjByName =
        self.mergedPRsData.repository.pullRequests.nodes.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.author.login]: {
              additions: [
                ...(prev[curr.author.login]?.additions || []),
                curr.additions,
              ],
              contributionGraph: {
                labels: [
                  ...(prev[curr.author.login]?.contributionGraph?.labels || []),
                  curr.mergedAt.split("T")[0],
                ],
                datasets: {
                  label: curr.author.login,
                  data: {
                    ...(prev[curr.author.login]?.contributionGraph?.datasets
                      ?.data || {}),
                    [curr.mergedAt.split("T")[0]]:
                      (prev[curr.author.login]?.contributionGraph?.datasets
                        ?.data[curr.mergedAt.split("T")[0]] || 0) + 1,
                  },
                },
              },
              lastContributed: curr.mergedAt || "",
              loc: (prev[curr.author.login]?.loc || 0) + curr.additions || 0,
              totalPrs: (prev[curr.author.login]?.totalPrs || 0) + 1 || 0,
            },
          }),
          {}
        ) as IUserData;
      console.log({
        d: toJS(self.mergedPRsData.repository.pullRequests.nodes),
      });
      console.log({ userObjByName });
      self.userDataState = userObjByName;
    },
    getChartLOC() {
      const datesKeyObj =
        self.mergedPRsData.repository.pullRequests.nodes.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.author.login]:
              (prev[curr.author.login] || 0) + curr.additions,
          }),
          {}
        );
      const labels = Object.keys(datesKeyObj);
      const data: number[] = Object.values(datesKeyObj);
      const chartData: IChartDataLOC = {
        labels,
        data,
      };

      self.totalLOCState = data.reduce((a, v) => a + v, 0);
      self.locData = cast(chartData);
    },
    getChartPR() {
      const formattedObj =
        self.mergedPRsData.repository.pullRequests.nodes.reduce(
          (prev, curr) => {
            const key = curr.mergedAt.split("T")[0];
            const author = curr.author.login;

            return {
              ...prev,
              [key]: {
                ...prev[key],
                [author]: 1 + (prev[key]?.[author] || 0),
              },
            };
          },
          {}
        );

      let n: { [key: string]: { [key: string]: number } } = {};

      for (const d in formattedObj) {
        n[d] = {
          kerron: 0,
          "toma-popescu-endava": 0,
          AlexandruLoghin2: 0,
          bratciprian: 0,
          SanjeevE1996: 0,
          tawandaEsure: 0,
          ...formattedObj[d],
        };
      }

      const v: { [key: string]: number[] } = Object.values(n).reduce(
        (prev: { [key: string]: number[] }, curr) => {
          const keys = Object.keys(curr);
          const obj = {};

          for (const key of keys) {
            const prevArr =
              Symbol.iterator in Object(prev[key]) ? prev[key] : [];
            obj[key] = [...prevArr, curr[key]];
          }
          return obj;
        },
        {
          kerron: [],
          "toma-popescu-endava": [],
          AlexandruLoghin2: [],
          bratciprian: [],
          SanjeevE1996: [],
          tawandaEsure: [],
        }
      );

      const lineData: IChartLineData[] = [];

      for (const o in v) {
        lineData.push({
          label: o,
          data: v[o],
        });
      }
      const labels = Object.keys(formattedObj).map((v) =>
        moment(new Date(v)).format(DATE_FORMAT_SHORT)
      );
      const chartData: IChartDataPRS = {
        labels,
        datasets: lineData,
      };
      self.daysWithPR = cast(labels);
      self.prsData = cast(chartData);
    },
    getContributors: flow(function* () {
      const root: IRootStore = getParent(self);
      if (!root.authStore.hasInstance) return;
      try {
        const resp = yield root.authStore.restWithAuth.request(
          `GET /repos/${self.repoOwnerState}/${self.repoNameState}/contributors`
        );
        console.log({ rec: toJS(self.recentContributors) });
        console.log({ rec2: resp.data });
        const contributors = resp.data
          .filter((c) => self.recentContributors.has(c.login))
          .map((c) => ({
            login: c.login,
            avatarURL: c.avatar_url,
            contributions: c.contributions,
            id: c.id,
            url: c.url,
          }))
          .sort(
            (a: TContributor, b: TContributor) =>
              b.contributions - a.contributions
          );

        console.log({ contributors });
        self.activeMembersState = contributors;
        // self.inActiveMembersState = contributors.filter(
        //   (v) => !ACTIVE_MEMBERS[v.login]
        // );
        const labels = contributors.map((c: TContributor) => c.login);
        const data = contributors.map((c: TContributor) => c.contributions);
        const backgroundColor = contributors.map((c: TContributor) =>
          getRandomColor()
        );

        const datasets = [
          {
            data,
            backgroundColor,
          },
        ];
        self.contributionChart = cast({
          labels,
          datasets,
        });

        self.contributors = contributors;
      } catch (error) {
        console.log(error);
      }
    }),
    getLeaderboard: flow(function* () {
      const root: IRootStore = getParent(self);
      if (!root.authStore.hasInstance) return;

      try {
        const resp = yield root.authStore.restWithAuth.request(
          "GET /repos/esure-cloud/fe-react-app-integrated-eclaim/contributors"
        );
        const leaders: TContributor[] = resp.data
          .map((c: TContributor) => ({
            login: c.login,
            contributions: c.contributions,
          }))
          .filter((v: TContributor) => ACTIVE_MEMBERS[v.login])
          .sort(
            (a: TContributor, b: TContributor) =>
              b.contributions - a.contributions
          );

        const labels = leaders.map((v) => v.login);

        const datasets: TDatasets[] = [
          leaders.reduce<TDatasets>(
            (prev, curr) => ({
              label: "contributions",
              data: [...prev.data, curr.contributions],
              backgroundColor: [
                ...prev.backgroundColor,
                USER_GRAPH_COLORS[curr.login]?.[0] ||
                  DEFAULT_USER_GRAPH_COLOR[0],
              ],
            }),
            {
              label: "",
              data: [],
              backgroundColor: [],
            }
          ),
        ];
        self.leaderboardState = cast({ labels, datasets });
        const totalContributions: number = leaders.reduce(
          (a, v) => a + v.contributions,
          0
        );
        self.totalContributionsState = totalContributions;
      } catch (error) {
        console.log(error);
      }
    }),
    // getRecentActivity: flow(function* () {
    //   const root: IRootStore = getParent(self);
    //   if (!root.authStore.hasInstance) return;
    //   try {
    //     const resp = yield root.authStore.restWithAuth.request(
    //       "GET /repos/esure-cloud/fe-react-app-integrated-eclaim/stats/participation"
    //     );
    //     self.weeklyActivity = cast([1, 2]);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }),
    setCurrentUser(username: string) {
      if (!username) return;
      self.currentUsernameState = username;
      if (!self.userDataState) return;
      self.currentUserState = self.userDataState[username];
    },
  }))
  .views((self) => ({
    get contributorsList(): TContributor[] {
      return self.contributors;
    },
    get recentActivity(): number[] {
      return self.weeklyActivity;
    },
    get repoActivity(): { increased: boolean; percentage: number } {
      const len = self.weeklyActivity.length;
      const currWeek = self.weeklyActivity[len - 1];
      const prevWeek = self.weeklyActivity[len - 2];
      const percentage = Math.round(((prevWeek - currWeek) / prevWeek) * 100);

      return { increased: currWeek > prevWeek, percentage };
    },
    get completedThisWeek(): number {
      const len = self.weeklyActivity.length;
      return self.weeklyActivity[len - 1];
    },
    get completedPreviousWeek(): number {
      const len = self.weeklyActivity.length;
      return self.weeklyActivity[len - 2];
    },
    get totalPRs(): number {
      return self.mergedPRsData.repository.pullRequests.totalCount;
    },
    get firstPRDate(): string {
      return self.daysWithPR.at(0) || "";
    },
    get totalLOC(): string {
      return self.totalLOCState.toLocaleString();
    },
    get lastMerge(): {
      author: {
        login: string;
        avatarUrl: string;
      };
      mergedAt: string;
    } {
      const len = self.mergedPRsData.repository.pullRequests.nodes.length;
      if (!len)
        return {
          author: {
            login: "",
            avatarUrl: "",
          },
          mergedAt: "",
        };
      const {
        mergedAt,
        author: { login, avatarUrl },
      } = self.mergedPRsData.repository.pullRequests.nodes[len - 1];
      return {
        mergedAt,
        author: {
          login,
          avatarUrl,
        },
      };
    },
    get currentUser(): any {
      return self.currentUserState;
    },
    get currentUsername(): string {
      return self.currentUsernameState;
    },
    get activeMemebers(): TContributor[] {
      return self.activeMembersState;
    },
    get inActiveMemebers(): TContributor[] {
      return self.inActiveMembersState;
    },
    get averageTimeInCR(): string {
      if (!self.timeInCRState.length) return "";
      const len = self.timeInCRState.length;
      const time = Math.floor(self.timeInCRState.reduce((a, v) => a + v) / len);
      return moment.duration(time, "hours").asDays().toFixed(1);
    },
    get leaderboard(): TLeaderboard {
      return self.leaderboardState;
    },
    get totalContributions(): number {
      return self.totalContributionsState;
    },
    get repoName(): string {
      return self.repoOwnerState + "/" + self.repoNameState;
    },
  }));

export type IOctokitStore = Instance<typeof OctokitStore>;
export default OctokitStore;
