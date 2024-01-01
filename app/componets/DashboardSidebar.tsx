import React from "react";
import { Box, Typography, Stack, Card, Button } from "@mui/material";
import DashboardNavButton from "./DashboardNavButton";
import PostAddIcon from "@mui/icons-material/PostAdd";
import StyleIcon from "@mui/icons-material/Style";
import CategoryIcon from "@mui/icons-material/Category";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

type NavigationItem = {
  name: string;
  path: string;
  icon: SVGRectElement;
};
export default async function DashboardSidebar() {
  const session = await getServerSession(authOptions);
  console.log("session on dashboard sidebar", session);
  const data = [
    {
      name: "Blogs",
      path: "",
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
    //   {
    //     name: "Domain",
    //     path: "/domain",
    //     icon: <LanguageIcon />,
    //   },
    //  {
    //     name: "Account",
    //     path: "/account",
    //     icon: <AccountCircleIcon />,
    //   },
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
        {session.user.role === "admin" && (
          <>
            <DashboardNavButton
              path={"/domain"}
              text={"Domain"}
              icon={<LanguageIcon />}
            />
            <DashboardNavButton
              path={"/account"}
              text={"Team"}
              icon={<AccountCircleIcon />}
            />
          </>
        )}
      </Stack>
    </div>
  );
}
