import React from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
interface BlogsRightStatsBarProps {
  handleDraft: () => void;
  handlePublish: () => void;
  noOfWords: number;
  blogStatus?: string;
}

import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CategoryAddEditor from "./CategoryAddEditorComponent";
import TagsAddEditor from "./TagsAddEditor";
import AdvanceSettingsSection from "./AdvanceSettingsSection";
export default function BlogsRightStatsBar({
  handleDraft,
  handlePublish,
  noOfWords,
  blogStatus,
}: BlogsRightStatsBarProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: "3px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        top: "110px",
        gap: 1,
        // minWidth:""
        width: "20%",
      }}
    >
      <Stack direction="row" gap={1}>
        <Button
          variant="outlined"
          fullWidth={true}
          startIcon={<SaveIcon />}
          onClick={() => {
            handleDraft();
          }}
        >
          {" "}
          Save
        </Button>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={handlePublish}
          startIcon={<PublishedWithChangesIcon />}
        >
          Publish
        </Button>
      </Stack>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          gap: 1,
        }}
      >
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography variant="body2">Status:</Typography>
          {blogStatus === "Publish" ? (
            <Box
              padding="0.5rem"
              sx={{
                backgroundColor: "rgb(198,246,213)",
                borderRadius: "10px",
                color: "GrayText",
              }}
            >
              Publish
            </Box>
          ) : (
            <Box
              padding="0.5rem"
              sx={{
                backgroundColor: "#BEE3F8",
                borderRadius: "10px",
                color: "GrayText",
              }}
            >
              Draft
            </Box>
          )}
        </Stack>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="body2">Read time:</Typography>
          <Typography variant="body2" color="GrayText">
            {Math.ceil(noOfWords / 225)}min
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          gap: 1,
        }}
      >
        <Typography>Category</Typography>
        <CategoryAddEditor />
        <Typography>Tags</Typography>
        <TagsAddEditor />
      </Box>
      {/* <AdvanceSettingsSection /> */}
    </Box>
  );
}
