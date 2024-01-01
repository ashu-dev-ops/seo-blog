"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

import TeamDataGrid from "@/app/componets/TeamDataGrid";

export default function AccountPage() {
  const [name, setName] = useState("");

  const getUserName = async () => {
    const data = await axios.get("/api/user");
    if (data.data.data.domain) {
      setName(data.data.data.name);
    }
  };

  const upgradeToTeam = async () => {
    axios
      .patch("/api/user", {
        role: "admin",
      })
      .then(() => {
        // setEditDomain(false);
      });
  };

  useEffect(() => {
    getUserName();
    // getRows();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
               Team Account
              </Typography>
              <Stack direction="row" gap={1}>
                <Button variant="contained" onClick={upgradeToTeam}>
                  Upgrade to team
                </Button>
              </Stack>
            </Stack>
          </Box>

          <TeamDataGrid />
        </Stack>
      </Box>
    </>
  );
}
