import { Instance, types } from "mobx-state-tree";

const UIStore = types
  .model("UIStore", {
    isDrawerOpen: false,
  })
  .actions((self) => ({
    setDrawerState(val: boolean) {
      self.isDrawerOpen = val;
    },
  }))
  .views((self) => ({
    getDrawerState() {
      return self.isDrawerOpen;
    },
  }));

export type IUIStore = Instance<typeof UIStore>;
export default UIStore;
