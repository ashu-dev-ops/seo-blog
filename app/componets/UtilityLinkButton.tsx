import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";
export default function UtilityLinkButton({ path, text }: any) {
  return (
    <Box
      component={Link}
      sx={{
        background: "#daffd2",
        color: "green",
        width: "fit-content",
        borderRadius: "5px",
        padding: "2px 8px",
        marginTop: "10px",
        marginLeft: "5px",
      }}
      href={`/blogs/${path}`}
    >
      {text}
    </Box>
  );
}
