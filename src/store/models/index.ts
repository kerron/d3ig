import { types, Instance } from "mobx-state-tree";
import AuthStore, { IAuthStore } from "./auth/auth";
import OctokitStore, { IOctokitStore } from "./octokit/octokit";

export const RootStore = types.model("RootStore", {
  authStore: types.optional(AuthStore, () => AuthStore.create()),
  octokitStore: types.optional(OctokitStore, () => OctokitStore.create()),
});

export interface IRootStore extends Instance<typeof RootStore> {
  authStore: IAuthStore;
  octokitStore: IOctokitStore;
}
