"use client";
import React from "react";
import { Box, Typography, Stack, Card, Button } from "@mui/material";
import Link from "next/link";
import { DashboardNavButtonProps } from "../_types/blogCard";
import { usePathname } from "next/navigation";
export default function DashboardNavButton({
  path,
  text,
  icon,
}: DashboardNavButtonProps) {
  const pathname = usePathname();
  return (
    <Link
      href={`/user/dashboard${path}`}
      className={`link ${
        pathname === `/user/dashboard${path}` ? "active-link-dashboard" : "link-dashboard"
      }`}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box width="20px"> {icon}</Box>
        <Box textAlign="left" width="100%">
          {text}
        </Box>
      </Box>
    </Link>
  );
}
