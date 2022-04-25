import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { observer } from "mobx-react-lite";
import { IInfoTooltip } from "../../../../utils/types";

const InfoTooltip: React.FC<IInfoTooltip> = observer(({ title }) => {
  const [showInfoTooltip, setShowInfoTooltip] = React.useState(false);

  const handleTooltipClose = () => setShowInfoTooltip(false);
  const handleTooltipOpen = () => setShowInfoTooltip(true);

  return (
    <Box sx={{ marginLeft: 0 }}>
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
          title={<Box sx={{ fontSize: 14, paddingY: 1 }}>{title}</Box>}
          arrow
        >
          <IconButton
            aria-label="open tooltip"
            onClick={handleTooltipOpen}
            sx={{
              color: "GrayText",
              padding: 0,
              paddingRight: 1,
            }}
          >
            <InfoOutlinedIcon sx={{ color: "GrayText" }} />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Box>
  );
});

export default InfoTooltip;
