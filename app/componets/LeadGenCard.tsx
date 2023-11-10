"use client";
import React from "react";
import {
  Box,
  Card,
  Container,
  Typography,
  Stack,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
export default function LeadGenCard() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        padding: "50px 30px",
        background: "rgb(46 218 62 / 10%)",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" fontWeight="bold" fontSize="2rem">
        Super charge your WhatsApp marketing campaign with SheetWA
      </Typography>
      <Typography mt="5px" color='GrayText'>its free why wait </Typography>
      <Stack direction="row" justifyContent="center" gap={2} mt="30px">
        <Box
          component="input"
          type="email"
          placeholder="Email"
          sx={{
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            padding: "10px",
            resize: "none",
            overflow: "auto",
            borderWidth: "2px",
            outline: 0,
            color: "#212121",
            background: "white",
          }}
        ></Box>
        <Button variant="contained" size="small">
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
