import { Box } from "@mui/material";
import React from "react";

export default function FooterLinkBtn({ text, path }) {
  return (
    <Box
      component="li"
      sx={{
        fontSize: "15px",
        // fontWeight: 500,
        listStyle: "none",
        cursor: "pointer",
        padding: "10px 0px",
        borderRadius: "10px",
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <Box
        component='a'
        href={`https://sheetwa.com${path}`}
        sx={{
          textDecoration: "none",
          padding: "10px 14px",
          borderRadius: "10px",
          color: "#171e30",
          "&:hover": {
            background: "#69f0ae",
            color: "white",
          },
          position: "relative",
          left: { md: "-8px", sm: "0px", xs: "0px" },
        }}
      >
        {text}
       
      </Box>
    </Box>
  );
}
