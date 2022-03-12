import { createContext, useContext } from "react";
import { RootStore } from "../store/models";

// create the root store
const rootStore = RootStore.create();
// create a context to allow store access via a custom hook
const storeContext = createContext(rootStore);
// export our custom hook which will grant access to our stores
export const useStore = (): typeof rootStore => useContext(storeContext);
