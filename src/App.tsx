import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useStore } from "./hooks/useStore";
import Home from "./components/Home/Home";
import { Paper } from "@mui/material";

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
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Paper
            sx={{
              padding: 1,
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={54} />
          </Paper>
        </Box>
      ) : (
        <Home />
      )}
    </Container>
  );
});

export default App;
