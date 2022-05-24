import {
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
import InboxIcon from "@mui/icons-material/Inbox";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { padding } from "@mui/system";
import { useState } from "react";

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
      <TextField
        id="outlined-basic"
        label="Enter a public repository"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e)}
        placeholder="example: https://github.com/kerron/d3ig"
        sx={{
          backgroundColor: "white",
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
                    bgcolor: "#f9f7f7",
                    padding: 1,
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <KeyboardReturnIcon />
                </Paper>
              ) : null}
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Paper elevation={1} sx={{ bgcolor: "#f9f7f7" }}>
        <List>
          <ListItem
            secondaryAction={
              <ListItemIcon>
                <KeyboardReturnIcon />
              </ListItemIcon>
            }
            sx={{ paddingRight: 0 }}
            disablePadding
          >
            <ListItemButton sx={{ paddingRight: 0 }}>
              <ListItemText primary="https://github.com/kerron/d3ig" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Entry;
