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
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TagsCurdModel from "./TagsCurdModel";
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
  const [metaTitleT, setMetaTitle] = useState<string>(metaTitle || " ");

  const [metaDescriptionT, setMetaDesc] = useState<string>(
    metaDescription || " "
  );
  const [cononical, setCononical] = useState(canonical);

  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", slug);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>T", slugT);
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
    handleSlug(slug);
  };
  return (
    <>
      {/* <Button
        variant="outlined"
        sx={{ margin: "0.5rem" }}
        onClick={() => setShowAdvance(!showAdvance)}
      >
        {showAdvance ? "Hide Settings" : "Advance Settings"}
      </Button>
      {showAdvance ? ( */}
      <Box
        sx={{
          borderRadius: "10px",
          // padding: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          gap: "10px",
        }}
      >
        {/* <Button
          variant="contained"
          onClick={() => setIsAddMetaDescriptionOpen(true)}
          size="small"
        >
          Custom Meta Tag
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsAddCustomSlug(true)}
          size="small"
        >
          Custom Slug
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsAddCoconical(true)}
          size="small"
        >
          Set Cononical Url
        </Button> */}
        <Stack direction="row" gap={1} alignItems={"center"}>
          <Box>
            {metaDescription&&metaTitle ? (
              <DoneIcon sx={{ color: "green" }} />
            ) : (
              <CloseIcon sx={{ color: "red" }} />
            )}
          </Box>
          <Box>
            <Box
              color="GrayText"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setIsAddMetaDescriptionOpen(true)}
            >
              <Typography variant="body2" color="GrayText">
                Custom meta tag
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" gap={1} alignItems={"center"}>
          <Box>
            {slug ? (
              <DoneIcon sx={{ color: "green" }} />
            ) : (
              <CloseIcon sx={{ color: "red" }} />
            )}
          </Box>
          <Box>
            <Box
              color="GrayText"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setIsAddCustomSlug(true)}
            >
              <Typography variant="body2" color="GrayText">
                Custom Slug
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" gap={1} alignItems={"center"}>
          <Box>
            {cononical ? (
              <DoneIcon sx={{ color: "green" }} />
            ) : (
              <CloseIcon sx={{ color: "red" }} />
            )}
          </Box>
          <Box>
            <Box
              color="GrayText"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setIsAddCoconical(true)}
            >
              <Typography variant="body2" color="GrayText">
                Custom Canonical
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
      {/* ) : (
        ""
      )} */}
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
              // label="Enter Meta Title"
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
              // label="Enter Meta Description"
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
          // label="Enter your slug"
          id="outlined-start-adornment"
          fullWidth
          value={slug}
          onChange={(e) => {
            handleSlug(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                wwww.example.com/blogs/
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" gap={2} mt={1} mr={1}>
          <Typography fontWeight="bold"> url</Typography>
          <Typography> wwww.example.com/blogs/{slug}</Typography>
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
          // label="Enter your cononical url"
          id="outlined-start-adornment"
          fullWidth
          value={cononical}
          onChange={(e) => setCononical(e.target.value)}
        />
      </TagsCurdModel>
    </>
  );
}
