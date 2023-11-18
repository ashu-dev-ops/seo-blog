import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import CategoryDatagrid from "@/app/componets/CategoryDatagrid";
export default function Category() {
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
              Category
            </Typography>
            <Stack direction="row" gap={1}></Stack>
          </Stack>
        </Box>
        <CategoryDatagrid />
      </Stack>
    </Box>
  );
}
