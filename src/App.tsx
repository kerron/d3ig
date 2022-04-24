import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useStore } from "./hooks/useStore";
import Home from "./components/Home/Home";

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
    <Container>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Home />
      )}
    </Container>
  );
});

export default App;
