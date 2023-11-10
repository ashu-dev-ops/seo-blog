import React from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
export default function FloatingBar({ tableOfContentsId }: any) {
  return (
    <Box
      sx={{
        position: { sm: "relative", md: "fixed", xs: "relative" },
        maxWidth: { sm: "100%", md: "300px", xs: "100%" },
        width: { sm: "100%", md: "19%", xs: "100%" },
        top: { sm: "0", md: "120px", xs: "0" },
        left: "5px",
        // color: "white",
        borderRadius: "16px",
        padding: "1rem",

        flexDirection: "column",
        backgroundColor: "rgb(46 218 62 / 10%)",
        gap: 1,
        display: "flex",
        margin: "1rem",
      }}
    >
      <Typography fontSize="1.6rem">Contents</Typography>
      {tableOfContentsId.length > 1 &&
        tableOfContentsId.map((headerId: any, idx:any) => {
          return (
            <Box
              component={Link}
              key={idx}
              href={`#${headerId.headingId}`}
              className="anchor"
              sx={{ textDecoration: "none", color: "GrayText" }}
            >
              {headerId.headingTitle}
            </Box>
          );
        })}
    </Box>
  );
}
