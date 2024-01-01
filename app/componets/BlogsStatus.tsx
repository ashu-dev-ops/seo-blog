
import React, { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TagsCurdModel from "./TagsCurdModel";
import AdvanceSettingsSection from "./AdvanceSettingsSection";
interface BlogsStatusProps {
  noOfWordsInTitle: number;
  noOfWords: number;
  noOfImage: number;
  noOfHeading: number;
  noOfLinks: number;
  noOfSubHeading: number;
}
export default function BlogsStatus({
  noOfWordsInTitle,
  noOfWords,
  noOfImage,
  noOfHeading,
  noOfLinks,
  noOfSubHeading,
}: BlogsStatusProps) {
  const [isAddMetaDescriptionOpen, setIsAddMetaDescriptionOpen] =
    useState(false);
  return (
    <Box
      sx={{
        // postion: "fixed !important",
        position: "fixed",
        maxWidth: "310px",
        width: "21%",
        top: "100px",
        left: "15px",
        // color: "white",
        borderRadius: "16px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        // gap: 1,
        gap: "5px",
      }}
    >
      <Typography fontWeight="bolder">SEO Best Practises</Typography>
      <Stack direction="row" gap={1}>
        <Box>
          {" "}
          {noOfWordsInTitle <= 60 && noOfWordsInTitle >= 50 ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : (
            <CloseIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="GrayText">
            Title should contain 50 - 60 Characters. <br></br> Current:{" "}
            {`${noOfWordsInTitle ? noOfWordsInTitle : 0}`}
          </Typography>
        </Box>
      </Stack>
      {/*  */}
      <Stack direction="row" gap={1}>
        <Box>
          {" "}
          {noOfWords >= 500 ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : (
            <CloseIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="GrayText" lineHeight="19px">
            Content words should be &gt; 500. <br></br> Current:
            {`${noOfWords ? noOfWords : 0}`}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" gap={1}>
        <Box>
          {" "}
          {noOfImage >= 1 ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : (
            <CloseIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="GrayText">
            Images should be at least 1 <br></br> Current:{" "}
            {`${noOfImage ? noOfImage : 0}`}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" gap={1}>
        <Box>
          {" "}
          {noOfHeading >= 2 ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : (
            <CloseIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="GrayText">
            Headings(h2) should be at least 2.
            <br></br> Current: {`${noOfHeading ? noOfHeading : 0}`}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" gap={1}>
        <Box>
          {" "}
          {noOfSubHeading >= 1 ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : (
            <CloseIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="GrayText">
            Subheadings(h3) should be at least 1. <br></br> Current:{" "}
            {`${noOfSubHeading ? noOfSubHeading : 0}`}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" gap={1}>
        <Box>
          {" "}
          {noOfLinks >= 2 ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : (
            <CloseIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="GrayText">
            Internal links should be atleast 1.<br></br> Current:{" "}
            {`${noOfLinks ? noOfLinks : 0}`}
          </Typography>
        </Box>
      </Stack>
     
      <AdvanceSettingsSection />
      <TagsCurdModel
        title="Advanced SEO Parameters"
        open={isAddMetaDescriptionOpen}
        setOpen={setIsAddMetaDescriptionOpen}
        btnTile="Save"
        // action={handleMetaTagsT}
      >
        <Stack gap={2}>
          <Box>
            <Typography mb={1}>Meta Title</Typography>
            <TextField
              id="outlined-required"
              // label="Enter Meta Title"
              size="small"
              fullWidth
              // value={metaTitleT}
              // onChange={(e) => setMetaTitle(e.target.value)}
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
              // value={metaDescriptionT}
              // onChange={(e) => setMetaDesc(e.target.value)}
            />
          </Box>
        </Stack>
      </TagsCurdModel>
    </Box>
  );
}
