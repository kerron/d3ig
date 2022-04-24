import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
interface IMainCard {
  title: string | React.ReactNode;
  graph: React.ReactNode;
}

const MainCard: React.FC<IMainCard> = ({ title, graph }) => {
  return (
    <Grid item>
      <Paper sx={{ padding: 1 }}>
        <Typography variant="h6" sx={{ fontSize: 16 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 24, fontWeight: 600, paddingY: 1 }}>
          {graph}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default MainCard;
