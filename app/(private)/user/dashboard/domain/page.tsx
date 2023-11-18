import React from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
export default function Domain() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        minHeight: "100vh",

        paddingTop: "0vh",
      }}
    >
      <Stack direction="column" gap={3}>
        <Box
          sx={{
            minWidth: "700px",
            maxWidth: "700px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h4" fontWeight={900} color="GrayTexts">
              Domain
            </Typography>
            <Stack direction="row" gap={1}></Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            minWidth: "700px",
            maxWidth: "700px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <Stack gap={1} width="100%">
            <TextField
              id="outlined-basic"
              label="Enter your domain"
              placeholder="https://power-blog.com"
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              focused
            />
            <Stack direction="row" gap={1}></Stack>
            <Button sx={{ width: "fit-content" }} variant="contained">
              Add Domain
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
