import { types } from "mobx-state-tree";
import AuthStore, { IAuthStore } from "./auth/auth";
import OctokitStore, { IOctokitStore } from "./octokit/octokit";
import OrgsStore, { IOrgsStore } from "./org/org";
import UIStore, { IUIStore } from "./ui/uiStore";

export const RootStore = types.model("RootStore", {
  authStore: types.optional(AuthStore, () => AuthStore.create()),
  orgStore: types.optional(OrgsStore, () => OrgsStore.create()),
  octokitStore: types.optional(OctokitStore, () => OctokitStore.create()),
  uiStore: types.optional(UIStore, () => UIStore.create()),
});

export interface IRootStore {
  authStore: IAuthStore;
  orgStore: IOrgsStore;
  octokitStore: IOctokitStore;
  uiStore: IUIStore;
}
