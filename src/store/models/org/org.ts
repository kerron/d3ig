import { Instance, types } from "mobx-state-tree";
import { DEFAULT_ORG } from "../../../utils/defaults/defaultOrgs";
import { TOrgModel } from "../../../utils/types";

const OrgModel = types.model("OrgModel", {
  name: "",
  url: "",
});

const OrgsStore = types
  .model("OrgStore", {
    org: types.optional(OrgModel, DEFAULT_ORG),
  })
  .actions((self) => ({
    setOrgDetails(val: TOrgModel) {
      self.org = val;
    },
  }))
  .views((self) => ({}));

export type IOrgsStore = Instance<typeof OrgsStore>;
export default OrgsStore;
