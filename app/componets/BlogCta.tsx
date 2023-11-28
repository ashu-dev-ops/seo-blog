import React from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Card,
} from "@mui/material";
export default function BlogCta() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        padding: "40px 30px",
        // background: "rgb(46 218 62 / 10%)",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        marginTop: 8,
      }}
      component={Card}
      elevation={4}
    >
      <Box>
        <Typography
          fontSize={{ sm: "2rem", md: "2rem", xs: "28px" }}
          fontWeight={700}
        >
          SheetWA
        </Typography>
        <Typography fontSize={{ sm: "20px", md: "20px", xs: "17px" }}>
          Sheetwa Elevate Your WhatsApp Marketing Game Guides and tutorials to
          transform your business with WhatsApp messaging, marketing,
          automations, and more.
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{
          borderRadius: "16px",
          fontWeight: "bold",
          width: "fit-content",
          margin: "auto",
          marginTop: 2,
          backgroundColor: "rgb(35,165,102)",
        }}
      >
        visit site
      </Button>
    </Box>
  );
}
