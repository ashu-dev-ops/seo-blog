import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
interface BlogsStatusProps {
  noOfWordsInTitle: number;
  noOfWords: number;
  noOfImage: number;
  noOfHeading: number;
  noOfLinks: number;
  noOfSubHeading:number
}
export default function BlogsStatus({
  noOfWordsInTitle,
  noOfWords,
  noOfImage,
  noOfHeading,
  noOfLinks,
  noOfSubHeading
}:BlogsStatusProps) {
  return (
    <Box
      sx={{
        // postion: "fixed !important",
        position: "fixed",
        maxWidth: "250px",
        width: "20%",
        top: "120px",
        left: "15px",
        // color: "white",
        borderRadius: "16px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        gap: 1,
      }}
    >
      <Typography fontWeight="bolder">SEO Best Practises</Typography>
      <Stack direction="row" gap={1}>
        <Box>
          {" "}
          {noOfWordsInTitle <= 12 && noOfWordsInTitle >= 8 ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : (
            <CloseIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box>
          <Typography variant="body2" color="GrayText">
            Title words should be 7 - 12. <br></br> Current:{" "}
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
          {noOfImage >= 2 ? (
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
    </Box>
  );
}
