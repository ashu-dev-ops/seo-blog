import React from "react";
import { Box, Typography, Stack, Card, Button } from "@mui/material";
import DashboardNavButton from "./DashboardNavButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import StyleIcon from "@mui/icons-material/Style";
import CategoryIcon from "@mui/icons-material/Category";
import LanguageIcon from "@mui/icons-material/Language";

type NavigationItem = {
  name: string;
  path: string;
  icon: SVGRectElement;
};
export default function DashboardSidebar() {
  const data = [
    {
      name: "Post",
      path: " ",
      icon: <PostAddIcon />,
    },
    {
      name: "Tags",
      path: "/tags",
      icon: <StyleIcon />,
    },
    {
      name: "Category",
      path: "/category",
      icon: <CategoryIcon />,
    },
    {
      name: "Domain",
      path: "/domain",
      icon: <LanguageIcon />,
    },
  ];
  return (
    <div>
      <Stack
        width="150px"
        sx={{
          backgroundColor: "white",
          margin: "1rem",
          borderRadius: "16px",
          overflow: "hidden",
        }}
        gap={1}
      >
        {data.map((linkbtn: NavigationItem) => {
          return (
            <DashboardNavButton
              key={linkbtn.path}
              path={linkbtn.path}
              text={linkbtn.name}
              icon={linkbtn.icon}
            />
          );
        })}
      </Stack>
    </div>
  );
}
