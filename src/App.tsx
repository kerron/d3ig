import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useStore } from "./hooks/useStore";
import { USER_REPO } from "./constants/storage";

const App = observer(() => {
  const [search, setSearch] = useState("");
  const { authStore } = useStore();
  useEffect(() => {
    // localStorage.removeItem(USER_REPO);
    if (!authStore.hasInstance) {
      console.log("getting instance");
      authStore.getAuth();
      console.log(localStorage.getItem(USER_REPO));
    }
  }, []);

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          hiddenLabel
          placeholder="Search for user or org"
          variant="standard"
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => authStore.getOrg("esure-cloud")}>Hello</Button>
      </Box>
      <Box>{authStore.getUserRepoCount()}</Box>
    </Container>
  );
});

export default App;
