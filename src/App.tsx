import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useStore } from "./hooks/useStore";
import Home from "./components/Home/Home";
import { Paper } from "@mui/material";
import Spinner from "./components/Spinner/Spinner";

const App = observer(() => {
  const {
    authStore,
    octokitStore: { isLoading },
  } = useStore();
  const { getAuth } = authStore;

  useEffect(() => {
    if (!authStore.hasInstance) {
      getAuth();
    }
  }, [authStore, getAuth]);

  return (
    <Container sx={{ display: "flex", height: "100vh" }}>
      {isLoading ? <Spinner /> : <Home />}
    </Container>
  );
});

export default App;
