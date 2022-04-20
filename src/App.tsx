import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useStore } from "./hooks/useStore";

const App = observer(() => {
  const { authStore } = useStore();
  const { getAuth, getOrg, getClosedPRs } = authStore;

  useEffect(() => {
    if (!authStore.hasInstance) {
      getAuth();
    }
  }, [authStore, getAuth]);

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off">
        <Button onClick={() => getOrg()} variant="contained">
          getOrgs
        </Button>
        <Button onClick={() => getClosedPRs()} variant="contained">
          get closed PRs
        </Button>
      </Box>
    </Container>
  );
});

export default App;
