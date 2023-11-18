import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import TagsDatagrid from "@/app/componets/TagsDatagrid";
// import { useSelector, useDispatch } from "react-redux";

export default function Tags() {
  // const posts = useSelector((state: any) => state.post);
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
              Tags
            </Typography>
            <Stack direction="row" gap={1}></Stack>
          </Stack>
        </Box>
        <TagsDatagrid />
      </Stack>
    </Box>
  );
}
