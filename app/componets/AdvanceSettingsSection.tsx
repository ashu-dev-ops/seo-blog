import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import TagsCurdModel from "./TagsCurdModel";
import axios from "axios";
import { useUserContext } from "../store/editorContext";
export default function AdvanceSettingsSection() {
  const {
    handleCononical,
    handleSlug,
    handleMetaTags,
    slug,
    canonical,
    metaDescription,
    metaTitle,
  } = useUserContext();
  const [showAdvance, setShowAdvance] = useState(false);
  const [isAddMetaDescriptionOpen, setIsAddMetaDescriptionOpen] =
    useState(false);
  const [isAddCustomSlug, setIsAddCustomSlug] = useState(false);
  const [isAddCononical, setIsAddCoconical] = useState(false);
  const [metaTitleT, setMetaTitle] = useState(metaTitle);
  const [metaDescriptionT, setMetaDesc] = useState(metaDescription);
  const [cononical, setCononical] = useState(canonical);
  const [slugT, setSlug] = useState(slug);
  const [finalSlug, setFinalSlug] = useState(slugT);
  function processSlug(inputText: any) {
    // Remove special characters and spaces
    const processedText = inputText
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, " ");

    // Convert to lowercase and replace spaces with hyphens
    const finalText = processedText.toLowerCase().replace(/\s+/g, "-");
    setFinalSlug(finalText);
  }
  const handleMetaTagsT = async () => {
    handleMetaTags({
      metaTitleT,
      metaDescriptionT,
    });
  };
  const handleCononicalT = async () => {
    handleCononical(cononical);
  };
  const handleSlugT = async () => {
    handleSlug(slugT);
  };
  return (
    <>
      <Button
        variant="outlined"
        sx={{ margin: "0.5rem" }}
        onClick={() => setShowAdvance(!showAdvance)}
      >
        {showAdvance ? "Hide Settings" : "Advance Settings"}
      </Button>
      {showAdvance ? (
        <Box
          sx={{
            borderRadius: "10px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setIsAddMetaDescriptionOpen(true)}
          >
            Custom Meta Tag
          </Button>
          <Button variant="contained" onClick={() => setIsAddCustomSlug(true)}>
            Custom Slug
          </Button>
          <Button variant="contained" onClick={() => setIsAddCoconical(true)}>
            Set Cononical Url
          </Button>
        </Box>
      ) : (
        ""
      )}
      <TagsCurdModel
        title="Advanced SEO Parameters"
        open={isAddMetaDescriptionOpen}
        setOpen={setIsAddMetaDescriptionOpen}
        btnTile="Save"
        action={handleMetaTagsT}
      >
        <Stack gap={2}>
          <Box>
            <Typography mb={1}>Meta Title</Typography>
            <TextField
              id="outlined-required"
              label="Enter Meta Title"
              size="small"
              fullWidth
              value={metaTitleT}
              onChange={(e) => setMetaTitle(e.target.value)}
              //   defaultValue="Enter Meta Title"
            ></TextField>
          </Box>
          <Box>
            <Typography mb={1}>Meta Description</Typography>
            <TextField
              id="outlined-multiline-flexible"
              label="Enter Meta Description"
              multiline
              fullWidth
              size="small"
              minRows={3}
              maxRows={4}
              value={metaDescriptionT}
              onChange={(e) => setMetaDesc(e.target.value)}
            />
          </Box>
        </Stack>
      </TagsCurdModel>
      <TagsCurdModel
        title="Set Custom Slug"
        open={isAddCustomSlug}
        setOpen={setIsAddCustomSlug}
        btnTile="Set Custom Slug"
        minimumWidth={600}
        action={handleSlugT}
      >
        <TextField
          label="Enter your slug"
          id="outlined-start-adornment"
          fullWidth
          value={slugT}
          onChange={(e) => {
            setSlug(e.target.value);
            processSlug(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                wwww.sheetwa.com/blogs/
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" gap={2} mt={1} mr={1}>
          <Typography fontWeight="bold"> url</Typography>
          <Typography> wwww.sheetwa.com/blogs/{finalSlug}</Typography>
        </Stack>
      </TagsCurdModel>
      <TagsCurdModel
        title="Set Cononical Url"
        open={isAddCononical}
        setOpen={setIsAddCoconical}
        btnTile="set cononical"
        minimumWidth={500}
        action={handleCononicalT}
      >
        <TextField
          label="Enter your cononical url"
          id="outlined-start-adornment"
          fullWidth
          value={cononical}
          onChange={(e) => setCononical(e.target.value)}
        />
      </TagsCurdModel>
    </>
  );
}
