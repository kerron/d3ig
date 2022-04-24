import { cast, flow, getParent, Instance, types } from "mobx-state-tree";
import moment from "moment";
import { IRootStore } from "..";
import { getRandomColor } from "../../../utils/graphs";
import { TContributor } from "../../../utils/types";

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

const ContributorCharthModel = types.model("ContributorCharthModel", {
  labels: types.array(types.string),
  datasets: types.array(DatasetModel),
});

const OctokitStore = types
  .model("OctokitStore", {
    homeChartData: types.optional(RepositoryModel, () =>
      RepositoryModel.create()
    ),
    locData: types.optional(LOCDataModel, () => LOCDataModel.create()),
    prsData: types.optional(PrsDataModel, () => PrsDataModel.create({})),
    isLoading: false,
    showHomeCharts: false,
    contributors: types.optional(types.array(ContributorModel), []),
    contributionChart: types.optional(ContributorCharthModel, () =>
      ContributorCharthModel.create()
    ),
    weeklyActivity: types.optional(
      types.array(types.number),
      new Array(52).fill(0)
    ),
    daysWithPR: types.optional(types.array(types.string), []),
    totalLOCState: types.number,
  })
  .actions((self) => ({
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
        root.octokitStore.getRecentActivity();
        self.isLoading = false;
        self.showHomeCharts = true;
        return;
      } catch (e) {
        self.isLoading = false;
        self.showHomeCharts = false;
        console.log(e);
      }
    }),
    getChartLOC() {
      const formattedObj =
        self.homeChartData.repository.pullRequests.nodes.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.author.login]:
              (prev[curr.author.login] || 0) + curr.additions,
          }),
          {}
        );
      const labels = Object.keys(formattedObj);
      const data: number[] = Object.values(formattedObj);

      const chartData: IChartDataLOC = {
        labels,
        data,
      };

      self.totalLOCState = data.reduce((a, v) => a + v, 0);
      self.locData = cast(chartData);
    },
    getChartPR() {
      const formattedObj =
        self.homeChartData.repository.pullRequests.nodes.reduce(
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
      const labels = Object.keys(formattedObj);
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
          "GET /repos/esure-cloud/fe-react-app-integrated-eclaim/contributors"
        );
        const contributors = resp.data
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

        console.log("called");
        self.contributors = contributors;
      } catch (error) {
        console.log(error);
      }
    }),
    getRecentActivity: flow(function* () {
      const root: IRootStore = getParent(self);
      if (!root.authStore.hasInstance) return;
      try {
        const resp = yield root.authStore.restWithAuth.request(
          "GET /repos/esure-cloud/fe-react-app-integrated-eclaim/stats/participation"
        );
        const lastThreeMonths: number[] = resp.data.all.slice(40);
        self.weeklyActivity = cast([1, 2]);
      } catch (error) {
        console.log(error);
      }
    }),
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
      console.log("len", len);
      const currWeek = self.weeklyActivity[len - 1];
      const prevWeek = self.weeklyActivity[len - 2];
      console.log(currWeek, prevWeek);
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
      return self.homeChartData.repository.pullRequests.totalCount;
    },
    get firstPRDate(): string {
      if (self.daysWithPR.at(0)) {
        return moment(self.daysWithPR.at(0)).format("DD MMM yy");
      }
      return "";
    },
    get totalLOC(): string {
      return self.totalLOCState.toLocaleString();
    },
  }));

export type IOctokitStore = Instance<typeof OctokitStore>;
export default OctokitStore;
