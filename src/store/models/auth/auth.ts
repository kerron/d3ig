import { getParent, Instance, types } from "mobx-state-tree";
import { getOctoAuth } from "../../../services/network/api/auth";
import { Octokit } from "@octokit/core";
import { IRootStore } from "..";
import { IS_AUTH } from "../../../constants/storage";

const AuthStore = types
  .model("AuthStore", {
    hasInstance: false,
    repoCount: types.optional(types.number, 0),
  })
  .volatile(() => ({
    authInstance: {} as Octokit,
    graphqlWithAuth: {} as Octokit["graphql"],
    restWithAuth: {} as Octokit,
  }))
  .actions((self) => ({
    getAuth(): void {
      if (self.hasInstance) return;
      console.log("authing again");
      try {
        const instance = getOctoAuth();
        self.authInstance = instance;
        self.graphqlWithAuth = instance.graphql.defaults({
          headers: {
            authorization: `token ${process.env.REACT_APP_PAT_AUTH}`,
          },
        });
        instance.request.defaults({
          headers: {
            authorization: `token ${process.env.REACT_APP_PAT_AUTH}`,
          },
        });
        self.restWithAuth = instance;
        self.hasInstance = true;
        // const root: IRootStore = getParent(self);
        // root.octokitStore.getHomeChartData();
        localStorage.setItem(IS_AUTH, "1");
      } catch (e) {
        self.hasInstance = false;
      }
    },
  }))
  .views((self) => ({
    getAuthInstance() {
      return self.authInstance;
    },
    getUserRepoCount() {
      return self.repoCount;
    },
  }));

export type IAuthStore = Instance<typeof AuthStore>;
export default AuthStore;
