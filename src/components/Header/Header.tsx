import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import Contributors from "./components/Contributors/Contributors";
import { Box } from "@mui/material";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = observer(() => {
  const {
    uiStore: { getDrawerState, setDrawerState },
    octokitStore: { repoName },
  } = useStore();

  return (
    <AppBar
      position="fixed"
      open={getDrawerState()}
      elevation={1}
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setDrawerState(true)}
          edge="start"
          sx={{ mr: 2, ...(getDrawerState() && { display: "none" }) }}
        >
          <MenuIcon
            sx={{
              color: "#2a2e3a",
            }}
          />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          <a
            href={`https://github.com/${repoName}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="h2"
              noWrap
              sx={{
                fontWeight: 600,
                fontSize: 24,
                color: "#2a2e3a",
              }}
            >
              {repoName}
            </Typography>
          </a>
          <Contributors />
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
