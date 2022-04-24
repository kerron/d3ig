import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/material/styles";
import { IInfoTooltip } from "../../../../utils/types";

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: theme.spacing(2),
  },
}));

const InfoTooltip: React.FC<IInfoTooltip> = observer(({ title }) => {
  const [showInfoTooltip, setShowInfoTooltip] = React.useState(false);

  const handleTooltipClose = () => setShowInfoTooltip(false);
  const handleTooltipOpen = () => setShowInfoTooltip(true);

  return (
    <Box sx={{ marginLeft: 1 }}>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={showInfoTooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={title}
          arrow
        >
          <IconButton aria-label="open tooltip" onClick={handleTooltipOpen}>
            <InfoOutlinedIcon sx={{ color: "GrayText" }} />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Box>
  );
});

export default InfoTooltip;
