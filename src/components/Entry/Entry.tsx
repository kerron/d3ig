import {
  Avatar,
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
// const blue = "#1f74cf";
const gray = { dark: "#0000008a", light: "#f9f7f7" };

const Entry = () => {
  const [value, setValue] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!e) return;
    setValue(e.target.value);
    console.log(e.target.value);
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
      <TextField
        id="outlined-basic"
        label="Enter a public repository"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e)}
        placeholder="example: https://github.com/kerron/d3ig"
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
              {value ? (
                <Paper
                  elevation={1}
                  sx={{
                    bgcolor: gray.light,
                    padding: 1,
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <KeyboardReturnIcon sx={{ color: gray.dark }} />
                </Paper>
              ) : null}
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Paper elevation={1} sx={{ bgcolor: gray.light }}>
        <List>
          <ListItem
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
                  alt="Travis Howard"
                  src="https://avatars.githubusercontent.com/u/587058?v=4"
                />
              </ListItemIcon>
              <ListItemText
                primary="https://github.com/kerron/d3ig"
                sx={{ color: gray.dark }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
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
                  alt="Travis Howard"
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
        </List>
      </Paper>
    </Container>
  );
};

export default Entry;
