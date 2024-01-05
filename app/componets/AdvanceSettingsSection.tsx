import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TagsCurdModel from "./TagsCurdModel";
import { useUserContext } from "../store/editorContext";
import axios from "axios";
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
  const [isAddMetaTitleOpen, setIsMetaTilteOpen] = useState(false);
  const [metaTitleT, setMetaTitle] = useState<string>(metaTitle || "");
  const [domain, setDomain] = useState("");

  const [metaDescriptionT, setMetaDesc] = useState<string>(
    metaDescription || ""
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
  const getUserDomain = async () => {
    const data = await axios.get("/api/user");
    if (data.data.data.domain) {
      setDomain(data.data.data.domain);

      // setIsDomainExist(true);
    }
  };
  useEffect(() => {
    getUserDomain();
  }, []);

  return (
    <>
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
            {metaTitle || metaTitleT ? (
              <DoneIcon sx={{ color: "green" }} />
            ) : (
              <CloseIcon sx={{ color: "red" }} />
            )}
          </Box>
          <Box>
            <Box
              color="GrayText"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setIsMetaTilteOpen(true)}
            >
              <Typography variant="body2" color="GrayText">
                Set Meta Title
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" gap={1} alignItems={"center"}>
          <Box>
            {metaDescription || metaDescriptionT ? (
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
                Set Meta Description
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
                Set Custom URL Slug
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
                Set Canonical URL
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
      {/* ) : (
        ""
      )} */}
      <TagsCurdModel
        title="Set Meta Description"
        open={isAddMetaDescriptionOpen}
        setOpen={setIsAddMetaDescriptionOpen}
        btnTile="Save"
        minimumWidth={500}
        action={handleMetaTagsT}
        disable={!metaDescriptionT ? true : false}
      >
        <Stack gap={2}>
          <Box>
            {/* <Typography mb={1}>Meta Description</Typography> */}
            <TextField
              id="outlined-multiline-flexible"
              // label="Enter Meta Description"
              label="The optimal length for SEO meta description tag is between 155-160 characters."
              multiline
              fullWidth
              focused
              size="small"
              minRows={3}
              maxRows={4}
              value={metaDescriptionT}
              // helperText="the optimal comdescription tag length for SEO is between 155-160 characters."
              helperText={`current ${metaDescriptionT?.length || 0}`}
              // error={metaDescriptionT.length<50&&metaDescriptionT.length}
              onChange={(e) => setMetaDesc(e.target.value)}
            />
          </Box>
        </Stack>
      </TagsCurdModel>
      <TagsCurdModel
        title="Set Meta Title"
        open={isAddMetaTitleOpen}
        setOpen={setIsMetaTilteOpen}
        btnTile="Save"
        action={handleMetaTagsT}
        minimumWidth={500}
        disable={!metaTitleT ? true : false}
      >
        <Stack gap={2}>
          <Box>
            <Typography mb={1}></Typography>
            <TextField
              focused
              id="outlined-required"
              label="The optimal length for an SEO meta title tag is between 50 to 60 characters."
              size="small"
              fullWidth
              value={metaTitleT}
              helperText={`current ${metaTitleT?.length || 0}`}
              onChange={(e) => setMetaTitle(e.target.value)}
              //   defaultValue="Enter Meta Title"
            ></TextField>
          </Box>
        </Stack>
      </TagsCurdModel>
      <TagsCurdModel
        title="Set Custom URL Slug"
        open={isAddCustomSlug}
        setOpen={setIsAddCustomSlug}
        btnTile="Set Custom Slug"
        minimumWidth={600}
        action={handleSlugT}
      >
        <TextField
          label="The ideal URL slug length for SEO should be between 30 - 70 characters"
          id="outlined-start-adornment"
          focused
          fullWidth
          value={slug}
          onChange={(e) => {
            handleSlug(e.target.value);
          }}
          helperText={`current ${slug?.replace(/-/g, "").length || 0}`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {domain ? domain : `wwww.example.com`}blogs/
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" gap={2} mt={1} mr={1}>
          <Typography fontWeight="bold"> url</Typography>
          <Typography>
            {" "}
            {domain ? domain : `wwww.example.com`}blogs/{slug}
          </Typography>
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
