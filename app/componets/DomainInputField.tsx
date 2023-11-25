"use client";
import React, { useEffect, useState } from "react";

import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
export default function DomainInputField() {
  const [domain, setDomain] = useState("");
  const [isDomainExist, setIsDomainExist] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editDomain, setEditDomain] = useState(false);
  const handleAddDomain = async () => {
    console.log("runing>>>>>>>>>>>>>>>>>>>>>>>>>...");
    axios
      .patch("/api/user", {
        domain,
      })
      .then((data) => {
        console.log(data.data.data.domain);
        setIsDomainExist(true);
        // setEditDomain();
      });
  };
  const handleUpdateDomain = async () => {
    axios
      .patch("/api/user", {
        domain,
      })
      .then(() => {
        setEditDomain(false);
      });
  };
  const GengerateFile = async () => {
    setIsGenerating(true);
    const response = await axios.get("/api/user?generateFile=true");
    // Create a blob from the response data
    const blob = new Blob([response.data], { type: "application/php" });

    // Create a link element
    const downloadLink = document.createElement("a");

    // Set the href attribute to a URL created from the blob
    downloadLink.href = window.URL.createObjectURL(blob);

    // Set the download attribute with the desired file name
    downloadLink.download = "generatedFile.php";

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);
    setIsGenerating(false);
  };
  const getUserDomain = async () => {
    const data = await axios.get("/api/user");
    if (data.data.data.domain) {
      setDomain(data.data.data.domain);

      setIsDomainExist(true);
    }
  };
  const [isDomainValid, setIsDomainValid] = useState(true);

  const handleDomainChange = (value: any) => {
    // Define a regex for a simple domain validation
    const domainRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

    // Check if the entered domain matches the regex
    const isValid = domainRegex.test(value);

    setDomain(value);
    setIsDomainValid(isValid);
  };
  useEffect(() => {
    getUserDomain();
  }, []);
  return (
    <Stack gap={1} width="100%">
      <TextField
        id="outlined-basic"
        label="Enter your domain"
        placeholder="https://power-blog.com"
        variant="outlined"
        size="small"
        fullWidth={true}
        type="text"
        focused
        value={domain}
        onChange={(e) => handleDomainChange(e.target.value)}
        disabled={isDomainExist && !editDomain}
        error={!isDomainValid && editDomain}
        helperText={isDomainValid || editDomain ? "" : "Invalid domain format"}
      />
      <Stack direction="row" gap={1}>
        {isDomainExist && (
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            onClick={() => GengerateFile()}
            disabled={isGenerating}
            startIcon={isGenerating && <CircularProgress size={20} />}
          >
            Generate File
          </Button>
        )}
        {isDomainExist ? (
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            onClick={
              editDomain ? handleUpdateDomain : () => setEditDomain(true)
            }
          >
            {editDomain ? "Update Domain" : "Edit Domain"}
          </Button>
        ) : (
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            onClick={handleAddDomain}
          >
            Add Domain
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
