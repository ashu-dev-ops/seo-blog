"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { toNamespacedPath } from "path";
import TeamDataGrid from "@/app/componets/TeamDataGrid";
// import CategoryDatagrid from "@/app/componets/CategoryDatagrid";
export default function AccountPage() {
  const [name, setName] = useState("");
  // const [rows, setRows] = useState([]);
  const getUserName = async () => {
    const data = await axios.get("/api/user");
    if (data.data.data.domain) {
      setName(data.data.data.name);

      // setIsDomainExist(true);
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
                Account
              </Typography>
              <Stack direction="row" gap={1}>
                <Button variant="contained" onClick={upgradeToTeam}>
                  Upgrade to team
                </Button>
              </Stack>
            </Stack>
          </Box>
          {/* <Box
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
              <Box width={"20%"}>
                <Typography>Written by</Typography>
              </Box>

              <TextField
                id="outlined-basic"
                label="Enter your domain"
                variant="outlined"
                size="small"
                fullWidth={true}
                type="text"
                focused
                value={name}
              />
              <Box width={"20%"}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: "5px" }}
                >
                  Update
                </Button>
              </Box>
            </Stack>
          </Box> */}
      
          <TeamDataGrid />
        </Stack>
      </Box>
    </>
  );
}
