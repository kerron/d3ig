import { cast, flow, getParent, Instance, types } from "mobx-state-tree";
import { IRootStore } from "..";

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
  additions: "",
  mergedAt: "",
  title: "",
  url: "",
});

const NodeModel = types.model("NodeModel", {
  node: types.array(PRDataModel),
  totalCount: types.maybeNull(types.number),
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

const OctokitStore = types
  .model("OctokitStore", {
    org: types.optional(types.string, ""),
    closedPRs: types.optional(RepositoryModel, () => RepositoryModel.create()),
    queryLOCData: types.optional(RepositoryModel, () =>
      RepositoryModel.create()
    ),
    showLOCChart: false,
    locData: types.optional(LOCDataModel, () => LOCDataModel.create()),
    showPRShart: false,
    prsData: types.optional(PrsDataModel, () => PrsDataModel.create({})),
    isLoading: false,
  })
  .actions((self) => ({
    queryClosedPRs: flow(function* () {
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
        const formattedObj = resp.repository.pullRequests.nodes.reduce(
          (prev, curr) => {
            const key = curr.mergedAt.split("T")[0];
            const author = curr.author.login;

            return {
              ...prev,
              [`${key}`]: {
                ...prev[`$[key]`],
                [author]: curr.additions + (prev[`$[key]`]?.[author] || 0),
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

        const chartData: IChartDataPRS = {
          labels: Object.keys(formattedObj),
          datasets: lineData,
        };

        self.showLOCChart = false;
        self.prsData = cast(chartData);
        self.isLoading = false;
        self.showPRShart = true;
      } catch (e) {
        self.isLoading = false;
        console.log(e);
      }
    }),
    queryLOC: flow(function* () {
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

        self.queryLOCData = resp;

        const formattedObj = resp.repository.pullRequests.nodes.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.author.login]:
              (prev[curr.author.login] || 0) + curr.additions,
          }),
          {}
        );

        delete formattedObj.kerron;
        delete formattedObj.AntonijaMiloshevska;
        delete formattedObj.mberende;

        const chartData: IChartDataLOC = {
          labels: Object.keys(formattedObj),
          data: Object.values(formattedObj),
        };

        self.locData = cast(chartData);
        self.showPRShart = false;

        self.isLoading = false;
        self.showLOCChart = true;
      } catch (e) {
        self.isLoading = false;
        console.error(e);
      }
    }),
  }))
  .views((self) => ({
    getOrg() {
      return self.org;
    },
  }));

export type IOctokitStore = Instance<typeof OctokitStore>;
export default OctokitStore;
