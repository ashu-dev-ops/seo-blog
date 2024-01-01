"use client";
import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
interface TagsCurdModelProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  handleSaveImage?: () => void; // Adjust the type based on the actual function signature
  title?: string;
  titleImageUpload?: React.ReactNode; // Adjust the type based on the actual content
  action?: () => void;
  btnTile?: string;
  btnColor?: string;
  minimumWidth?: number;
  disable?: boolean;
}
export default function TagsCurdModel({
  open,
  setOpen,
  children,

  title,
  action,
  btnTile,
  btnColor,
  minimumWidth,
  disable,
}: TagsCurdModelProps) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {" "}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="custom-modal"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{ minWidth: minimumWidth ? minimumWidth : 450 }}
        >
          {children}
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="space-between">
            <Button
              autoFocus
              variant="contained"
              disabled={disable||false}
              color={btnColor ? btnColor : "primary"}
              onClick={() => {
                setOpen(false);
                action();
                // handleSaveImage();
              }}
            >
              {btnTile}
            </Button>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
