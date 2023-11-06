import React from "react";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
export default function loading() {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size="5rem" />
    </Box>
  );
}
