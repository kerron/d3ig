import {
  applySnapshot,
  flow,
  Instance,
  toGenerator,
  types,
} from "mobx-state-tree";

const OctokitStore = types
  .model("OctokitStore", {
    org: types.optional(types.string, ""),
  })
  .actions((self) => ({
    getOrg: flow(function* (val: string) {}),
  }))
  .views((self) => ({
    getOrg() {
      return self.org;
    },
  }));

export type IOctokitStore = Instance<typeof OctokitStore>;
export default OctokitStore;
