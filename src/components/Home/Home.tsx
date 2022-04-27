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
import { Routes, Route } from "react-router-dom";
import Member from "../Member/Member";
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

        <Grid container>
          <Routes>
            <Route path="/" element={<MainGraphs />} />
            <Route path="user/:username" element={<Member />} />
            <Route path="*" element={<MainGraphs />} />
          </Routes>
        </Grid>
      </Main>
    </Box>
  );
});

export default Home;
