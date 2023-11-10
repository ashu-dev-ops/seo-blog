import { Box, Typography } from "@mui/material";
import React from "react";
import FooterLinkBtn from "./footerLinkBtn";

export default function FooterColumn({ title, links }) {
  const data = ["Home", "Integration", "Pricing", "Reviews"];
  return (
    <Box sx={{ width: { sm: "100%", md: "30%" }, alignSelf: "auto" }}>
      <Box
        component="h6"
        sx={{
          fontSize: "20px",
          margin: 0,
          fontWeight: 400,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {title}
      </Box>
      <Box component="ul" sx={{ paddingLeft: 0 }}>
        {links.map((i,idx) => {
          return <FooterLinkBtn text={i.linkName} path={i.path} key={idx}/>;
        })}
      </Box>
    </Box>
  );
}
