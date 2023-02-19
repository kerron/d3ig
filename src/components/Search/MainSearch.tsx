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
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { getErrorMessage } from "../../utils/utils";
import {
  DEFAULT_ERROR_MESSAGE,
  INVALID_URL_STR,
} from "../../constants/constants";
import { styled } from "@mui/material/styles";

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: theme.palette.error.dark,
    fontSize: theme.typography.pxToRem(16),
    border: "1px solid #dadde9",
    padding: 16,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffff",
    "&:before": {
      border: "1px solid #dadde9",
    },
  },
}));

// const blue = "#1f74cf";
const gray = { dark: "#0000008a", light: "#f9f7f7" };

const MainSearch: React.FC = observer(() => {
  const {
    octokitStore: { getRepo },
  } = useStore();

  const [errorMsg, setErrorMsg] = useState("");
  const [value, setValue] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!e) return;
    setValue(e.target.value);
  };
  const onSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!value) {
      setErrorMsg(DEFAULT_ERROR_MESSAGE);
      return;
    }

    makeQuery(value);
  };

  const makeQuery = async (query: string) => {
    try {
      const { hostname, pathname } = new URL(query);

      if (hostname !== "github.com") {
        setErrorMsg(DEFAULT_ERROR_MESSAGE);
        return;
      }

      const [, owner, name] = pathname.split("/");
      console.log({ owner, name });
      await getRepo({ owner, name });
    } catch (error: unknown) {
      const msg = getErrorMessage({ error });
      if (msg === INVALID_URL_STR) {
        setErrorMsg(DEFAULT_ERROR_MESSAGE);
        return;
      }

      setErrorMsg(msg);
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
        <TooltipStyled
          title={errorMsg}
          open={!!errorMsg}
          placement="top-start"
          arrow
        >
          <TextField
            onFocus={() => setErrorMsg("")}
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
        </TooltipStyled>
      </form>
      <Paper elevation={1} sx={{ bgcolor: gray.light }}>
        <List>
          <ListItem
            onClick={() =>
              makeQuery("https://github.com/jesseduffield/lazygit")
            }
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
                  alt="lazygit"
                  src="https://user-images.githubusercontent.com/8456633/174470852-339b5011-5800-4bb9-a628-ff230aa8cd4e.png"
                />
              </ListItemIcon>
              <ListItemText
                primary="https://github.com/jesseduffield/lazygit"
                sx={{
                  color: gray.dark,
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            onClick={() =>
              makeQuery("https://github.com/charmbracelet/bubbletea")
            }
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
                  src="https://camo.githubusercontent.com/43927db9533c5fde08c71679f256f0d37bc6bb4e1f2d13aa11ad9fe8203d602b/68747470733a2f2f73747566662e636861726d2e73682f627562626c657465612f627562626c657465612d6769746875622d6865616465722d73696d706c652e706e67"
                />
              </ListItemIcon>
              <ListItemText
                primary="https://github.com/charmbracelet/bubbletea"
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
