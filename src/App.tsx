import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import Entry from "./components/Entry/Entry";
import { useStore } from "./hooks/useStore";
import { useEffect } from "react";

const App = observer(() => {
  const {
    authStore: { hasInstance, getAuth },
  } = useStore();

  useEffect(() => {
    if (!hasInstance) {
      getAuth();
    }
  }, [hasInstance, getAuth]);

  return (
    <Container sx={{ display: "flex", height: "100vh" }}>
      <Entry />
    </Container>
  );
});

export default App;
