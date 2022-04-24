import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

interface IOverviewCard {
  title: string;
  body: string | React.ReactNode;
  caption: string | React.ReactNode;
}

const OverviewCard: React.FC<IOverviewCard> = ({ title, body, caption }) => {
  return (
    <Grid flex={1} item>
      <Paper sx={{ padding: 1 }}>
        <Typography variant="h6" sx={{ fontSize: 16 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 24, fontWeight: 600, paddingY: 1 }}>
          {body}
        </Typography>
        <Typography variant="caption" color="GrayText">
          {caption}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default OverviewCard;
