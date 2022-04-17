import { types, Instance } from "mobx-state-tree";
import AuthStore, { IAuthStore } from "./auth/auth";
import OctokitStore, { IOctokitStore } from "./octokit/octokit";
import OrgsStore, { IOrgsStore } from "./org/org";

export const RootStore = types.model("RootStore", {
  authStore: types.optional(AuthStore, () => AuthStore.create()),
  orgStore: types.optional(OrgsStore, () => OrgsStore.create()),
  octokitStore: types.optional(OctokitStore, () => OctokitStore.create()),
});

export interface IRootStore extends Instance<typeof RootStore> {
  authStore: IAuthStore;
  orgStore: IOrgsStore;
  octokitStore: IOctokitStore;
}
