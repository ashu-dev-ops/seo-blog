import React from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
interface EditorTitleInputFieldProps {
  title: string;
  handleSlug: (slug: string) => void;
  setNoWordsInTitle: (noWords: number) => void;
  setTitle: (title: string) => void;
}

export default function EditorTitleInputField({
  title,
  handleSlug,
  setNoWordsInTitle,
  setTitle,
}: EditorTitleInputFieldProps) {
  return (
   
      <TextField
        variant="standard" // <== changed this
        fullWidth
        multiline
        focused={false}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          const stringWithoutSpaces = e.target.value;

          const wordsArray = stringWithoutSpaces.trim().split(/\s+/);
          handleSlug(e.target.value);
          console.log("array ", wordsArray.length);
          setNoWordsInTitle(wordsArray.length);
        }}
        placeholder="Enter your title"
        InputProps={{
          style: {
            backgroundColor: "transparent",
            fontSize: "2rem",
          },
          disableUnderline: true,
        }}
        InputLabelProps={{
          style: {
            color: "#919EAB",
            fontSize: "2rem",
            fontWeight: "bolder",
          },
        }}
      ></TextField>
  
  );
}
