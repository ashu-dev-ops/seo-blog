"use client";
import { Box, Card, Container, Typography, Stack, Avatar } from "@mui/material";
import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function ShareButton() {
  return (
    <Stack
      sx={{ backgroundColor: "rgb(82,200,91)", padding: "0.2rem 0.4rem" }}
      direction="row"
      alignItems="center"
      justifyContent="center"
      borderRadius="5px"
      gap={1}
    >
      <Box component="a" sx={{ cursor: "pointer" }} >
        <EmailIcon sx={{ color: "white" }} />
      </Box>
      <Box component="a" sx={{ cursor: "pointer" }}>
        <FacebookIcon sx={{ color: "white" }} />
      </Box>
      <Box component="a" sx={{ cursor: "pointer" }}>
        <LinkedInIcon sx={{ color: "white" }} />
      </Box>
      <Box component="a" sx={{ cursor: "pointer" }}>
        <TwitterIcon sx={{ color: "white" }} />
      </Box>
    </Stack>
  );
}
