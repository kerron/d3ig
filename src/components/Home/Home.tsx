import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Overview from "./components/Overview/Overview";
import MainGraphs from "./components/MainCard/MainGraphs";
import { Grid } from "@mui/material";
import Header from "../Header/Header";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import SideBar from "./components/SideBar/SideBar";
import { DrawerHeader, Main } from "./styled";

const Home = observer(() => {
  const {
    uiStore: { getDrawerState },
  } = useStore();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <SideBar />
      <Main open={getDrawerState()}>
        <DrawerHeader />
        <Grid mb={3} container>
          <Overview />
        </Grid>
        <Grid container>
          <MainGraphs />
        </Grid>
      </Main>
    </Box>
  );
});

export default Home;
