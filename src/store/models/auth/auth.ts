import { applySnapshot, flow, Instance, types } from "mobx-state-tree";
import { getOctoAuth } from "../../../services/network/api/auth";
import { Octokit } from "@octokit/core";
import { USER_REPO } from "../../../constants/storage";

const AuthStore = types
  .model("AuthStore", {
    hasInstance: types.optional(types.boolean, false),
    repoCount: types.optional(types.number, 0),
  })
  .volatile((self) => ({
    authInstance: {} as Octokit,
  }))
  .actions((self) => ({
    getAuth() {
      if (self.hasInstance) {
        console.log("returning instance");
        return self.authInstance;
      }

      try {
        const resp = getOctoAuth();
        self.authInstance = resp;
        self.hasInstance = true;
      } catch (e) {
        console.log("store catch", e);
        self.hasInstance = false;
      }
    },
    getOrg: flow(function* (org: string) {
      try {
        const resp = yield self.authInstance.request(`GET /orgs/${org}/repos`);
        console.log(resp);
      } catch (e) {
        console.error(e);
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
