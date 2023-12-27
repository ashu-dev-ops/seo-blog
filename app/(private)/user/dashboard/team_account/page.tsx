// import React from "react";
"use client";
import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

export default function TeamAccount() {
  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
  };
  const [values, setValues] = useState(initialState);
  console.log(">>>>>>>>>>>>", values);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleTeamMemberUpdate = async () => {
    await axios.patch("/api/user", { ...values }).then((data) => {
      console.log("data we get after update", data);
      // setEditDomain(false);
    });
  };
  const getUser = async () => {
    const data = await axios.get("/api/user");
    console.log(data);
    if (data.data.data) {
      setValues(data.data.data);

      //   setIsDomainExist(true);
    }
  };
  useEffect(() => {
    getUser();
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
                SheetWA Team Account
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              minWidth: "700px",
              maxWidth: "700px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "1rem",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box width={"20%"}>
                <Typography>first Name</Typography>
              </Box>

              <TextField
                id="outlined-basic"
                label="Enter your domain"
                variant="outlined"
                size="small"
                fullWidth={true}
                type="text"
                name="firstName"
                focused
                onChange={handleChange}
                value={values.firstName}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box width={"20%"}>
                <Typography>Last Name</Typography>
              </Box>

              <TextField
                id="outlined-basic"
                variant="outlined"
                name="lastName"
                size="small"
                fullWidth={true}
                type="text"
                focused
                onChange={handleChange}
                value={values.lastName}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box width={"20%"}>
                <Typography>Email</Typography>
              </Box>

              <TextField
                id="outlined-basic"
                variant="outlined"
                disabled
                size="small"
                fullWidth={true}
                type="text"
                focused
                value={values.email}
              />
            </Stack>
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={handleTeamMemberUpdate}
            >
              Update
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
