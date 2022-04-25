import { Box, Typography } from "@mui/material";
import { IChartTitle } from "../../utils/types";
import InfoTooltip from "../Header/components/InfoTooltip/InfoTooltip";

const ChartTitle: React.FC<IChartTitle> = ({ title, tooltipText }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <InfoTooltip title={tooltipText} />
      <Typography>{title}</Typography>
    </Box>
  );
};

export default ChartTitle;
