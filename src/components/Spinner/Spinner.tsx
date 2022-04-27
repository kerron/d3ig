import { CircularProgress, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Paper
        sx={{
          padding: 1,
          borderRadius: "50%",
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={54} />
      </Paper>
    </Box>
  );
};

export default Spinner;
