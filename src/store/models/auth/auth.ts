import { flow, Instance, types } from "mobx-state-tree";
import { getOctoAuth } from "../../../services/network/api/auth";
import { Octokit } from "@octokit/core";
import { USER_REPO } from "../../../constants/storage";

const AuthStore = types
  .model("AuthStore", {
    hasInstance: false,
    repoCount: types.optional(types.number, 0),
  })
  .volatile((self) => ({
    authInstance: {} as Octokit,
    graphqlWithAuth: {} as Octokit["graphql"],
  }))
  .actions((self) => ({
    getAuth() {
      if (self.hasInstance) {
        return self.authInstance;
      }
      try {
        const instance = getOctoAuth();
        self.authInstance = instance;
        self.graphqlWithAuth = instance.graphql.defaults({
          headers: {
            authorization: `token ${process.env.REACT_APP_PAT_AUTH}`,
          },
        });
        self.hasInstance = true;
      } catch (e) {
        console.log("store catch", e);
        self.hasInstance = false;
      }
    },
    getOrg: flow(function* () {
      try {
        const resp = yield self.graphqlWithAuth(`
        {
          search(
            last: 30
            query: "repo:esure-cloud/fe-react-app-integrated-eclaim type:pr author:SanjeevE1996"
            type: ISSUE
          ) {
            nodes {
              ... on PullRequest {
                state
                url
              }
            }
          }
        }
        `);
        // const resp = yield self.authInstance.request(`GET /orgs/${org}/repos`);
        console.log(resp);
      } catch (e) {
        console.error(e);
      }
    }),
    getClosedPRs: flow(function* () {
      try {
        const resp = yield self.graphqlWithAuth(`
          {
            repository(name: "fe-react-app-integrated-eclaim", owner: "esure-cloud") {
              pullRequests(last: 2, states: MERGED) {
                nodes {
                  title
                  url
                  mergedAt
                  author {
                    login
                  }
                }
                totalCount
              }
            }
          }
        `);
        console.log(resp);
      } catch (e) {
        console.log(e);
      }
    }),
    getUserRepos: flow(function* (val: string) {
      try {
        const resp = yield self.authInstance.request(`GET /users/${val}/repos`);
        const repoCount = resp.data.length;
        const search = {
          user: val,
          repoCount,
        };
        const strSearches = localStorage.getItem(USER_REPO);
        console.log("strSearches", strSearches);
        const parsedSearches = strSearches ? JSON.parse(strSearches) : [];
        const newSearches = [...parsedSearches, search];
        newSearches.filter(
          (v, i, a) => a.findIndex((t) => t.user === v.user) === i
        );
        console.log(newSearches);
        self.repoCount = resp.data.length;

        localStorage.setItem(USER_REPO, JSON.stringify(newSearches));
      } catch (e) {
        console.error(e);
      }
    }),
  }))
  .views((self) => ({
    getAuthInstance() {
      return self.authInstance;
    },
    getUserRepoCount() {
      return self.repoCount;
    },
    getPrevSearches() {},
  }));

export type IAuthStore = Instance<typeof AuthStore>;
export default AuthStore;
