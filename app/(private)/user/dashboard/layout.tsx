import DashboardSidebar from "@/app/componets/DashboardSidebar";
import React from "react";
import { Box } from "@mui/material";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: "24vh",
        width: "100%",
        backgroundColor: "#E2E8F0",
      }}
    >
      <DashboardSidebar />
      <Box sx={{ width: "80%" }}>{children};</Box>
    </Box>
  );
}
