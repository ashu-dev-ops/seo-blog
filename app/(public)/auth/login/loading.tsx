import React from "react";
import { Box, CircularProgress } from "@mui/material";
export default function loading() {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(226,232,240)",
      }}
    >
      <CircularProgress size="5rem" />
    </Box>
  );
}
