import {
  Avatar,
  Button,
  Container,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useState } from "react";
import Logo from "../../assets/logo.svg";
import { Box } from "@mui/system";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
// const blue = "#1f74cf";
const gray = { dark: "#0000008a", light: "#f9f7f7" };

const MainSearch: React.FC = observer(() => {
  const {
    octokitStore: { getRepo },
  } = useStore();

  const [value, setValue] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!e) return;
    setValue(e.target.value);
    console.log(e.target.value);
  };
  const onSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // TODO: throw error
    if (!value) return;
    makeQuery(value);
  };

  const makeQuery = async (query: string) => {
    const { hostname, pathname } = new URL(query);

    // TODO: throw error
    if (hostname !== "github.com") return;

    try {
      const [, owner, name] = pathname.split("/");
      await getRepo({ owner, name });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        margin: "auto",
        flexDirection: "column",
      }}
    >
      <Box sx={{ alignSelf: "center", marginBottom: 6 }}>
        <img src={Logo} alt="logo" width={180} />
      </Box>
      <form onSubmit={onSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter a public Github repository"
          variant="outlined"
          value={value}
          onChange={(e) => onChange(e)}
          placeholder="example: https://github.com/facebook/react"
          sx={{
            backgroundColor: "white",
            input: {
              color: gray.dark,
            },
          }}
          inputProps={{
            maxLength: 250,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" variant="standard">
                {value && (
                  <Button
                    onClick={onSubmit}
                    sx={{
                      bgcolor: gray.light,
                      padding: 1,
                      display: "flex",
                      cursor: "pointer",
                    }}
                  >
                    <KeyboardReturnIcon sx={{ color: gray.dark }} />
                  </Button>
                )}
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </form>
      <Paper elevation={1} sx={{ bgcolor: gray.light }}>
        <List>
          <ListItem
            onClick={() => makeQuery("https://github.com/facebook/react")}
            secondaryAction={
              <ListItemIcon sx={{ margin: 0, minWidth: "unset" }}>
                <KeyboardReturnIcon />
              </ListItemIcon>
            }
            sx={{ paddingRight: 0 }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt="react"
                  src="https://avatars.githubusercontent.com/u/69631?s=200&v=4"
                />
              </ListItemIcon>
              <ListItemText
                primary="https://github.com/facebook/react"
                sx={{
                  color: gray.dark,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => makeQuery("https://github.com/vuejs/vue")}
            secondaryAction={
              <ListItemIcon sx={{ margin: 0, minWidth: "unset" }}>
                <KeyboardReturnIcon />
              </ListItemIcon>
            }
            sx={{ paddingRight: 0 }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt="vue"
                  src="https://avatars.githubusercontent.com/u/6128107?s=200&v=4"
                />
              </ListItemIcon>
              <ListItemText
                primary="https://github.com/vuejs/vue"
                sx={{ color: gray.dark }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
});

export default MainSearch;
