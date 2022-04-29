import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = observer(() => {
  const theme = useTheme();
  const {
    octokitStore: { activeMemebers, inActiveMemebers },
    uiStore: { getDrawerState, setDrawerState },
  } = useStore();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={getDrawerState()}
    >
      <DrawerHeader>
        <IconButton onClick={() => setDrawerState(false)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          to="/leaderboard"
          style={{ textDecoration: "none", color: "#000" }}
        >
          <ListItem button>
            <ListItemIcon>
              <LeaderboardIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Typography sx={{ fontWeight: 600, paddingLeft: 2, paddingTop: 1 }}>
        Current Team
      </Typography>
      <List>
        {activeMemebers.length ? (
          activeMemebers.map((c) => (
            <Link
              to={`user/${c.login}`}
              key={c.id}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem button key={c.id}>
                <ListItemIcon>
                  <Avatar
                    key={c.id}
                    sx={{ width: 32, height: 32 }}
                    src={c.avatarURL}
                  />
                </ListItemIcon>
                <ListItemText primary={c.login} />
              </ListItem>
            </Link>
          ))
        ) : (
          <></>
        )}
      </List>
      <Divider />
      <Typography sx={{ fontWeight: 600, paddingLeft: 2, paddingTop: 1 }}>
        Inactive contributors
      </Typography>
      <List>
        {inActiveMemebers.length ? (
          inActiveMemebers.map((c) => (
            <ListItem button key={c.id} disabled>
              <ListItemIcon>
                <Avatar
                  key={c.id}
                  sx={{ width: 32, height: 32 }}
                  src={c.avatarURL}
                />
              </ListItemIcon>
              <ListItemText primary={c.login} />
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </List>
    </Drawer>
  );
});

export default SideBar;
