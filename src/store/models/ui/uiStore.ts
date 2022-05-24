import { Instance, types } from "mobx-state-tree";

const UIStore = types
  .model("UIStore", {
    isDrawerOpen: false,
    hasDataState: false,
  })
  .actions((self) => ({
    setDrawerState(val: boolean) {
      self.isDrawerOpen = val;
    },
    setHasData(val: boolean) {
      self.hasDataState = val;
    },
  }))
  .views((self) => ({
    getDrawerState() {
      return self.isDrawerOpen;
    },
    get hasData(): boolean {
      return self.hasDataState;
    },
  }));

export type IUIStore = Instance<typeof UIStore>;
export default UIStore;
