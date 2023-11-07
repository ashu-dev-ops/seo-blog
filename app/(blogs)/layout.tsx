import { Box, Typography } from "@mui/material";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>sub directory nav-bar</h1> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "1rem 2rem",
        }}
      >
        <Typography variant="h5">SheetWA</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography>Tutorials</Typography>
          <Typography>Features</Typography>
          <Typography>Login</Typography>
        </Box>
      </Box>
      {children}
      <h1 style={{ textAlign: "center" }}>sub direcotry footer</h1>
    </div>
  );
}
