"use client";
import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
export default function ErrorComponent({
  setIsError,
  message,
  typeOfError,
  severity,
}) {
  return (
    <div>
      <Alert
        severity={severity}
        onClose={() => {
          setIsError(false);
        }}
      >
      
        <AlertTitle>{typeOfError}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}
