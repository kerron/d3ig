import { Instance, types } from "mobx-state-tree";
import { getOctoAuth } from "../../../services/network/api/auth";
import { Octokit } from "@octokit/core";

const AuthStore = types
  .model("AuthStore", {
    hasInstance: false,
    repoCount: types.optional(types.number, 0),
  })
  .volatile(() => ({
    octokitInstance: {} as Octokit,
    graphql: {} as Octokit["graphql"],
    rest: {} as Octokit,
  }))
  .actions((self) => ({
    getOctokitInstance(): void {
      if (self.hasInstance) return;
      try {
        const instance = getOctoAuth();
        self.octokitInstance = instance;
        self.graphql = instance.graphql.defaults({
          headers: {
            authorization: `token ${process.env.REACT_APP_PAT_AUTH}`,
          },
        });
        instance.request.defaults({
          headers: {
            authorization: `token ${process.env.REACT_APP_PAT_AUTH}`,
          },
        });
        self.rest = instance;
        self.hasInstance = true;
      } catch (e) {
        self.hasInstance = false;
      }
    },
  }));

export type IAuthStore = Instance<typeof AuthStore>;
export default AuthStore;
