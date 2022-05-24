import { observer } from "mobx-react-lite";
import Container from "@mui/material/Container";
import Entry from "./components/Entry/Entry";

const App = observer(() => {
  return (
    <Container sx={{ display: "flex", height: "100vh" }}>
      <Entry />;
    </Container>
  );
});

export default App;
