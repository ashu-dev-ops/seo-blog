"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, alpha, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Divider from "@mui/material/Divider";

import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Navbar() {
  const router = useRouter();
  const { data: session }: any = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(session);
  return (
    <div
      className={`flex  flex-row  justify-between px-10 py-2 fixed  bg-white z-50`}
      style={{ width: "95%" }}
    >
      <h1 className="text-3xl ">Powerblog </h1>
      <div className={`flex  flex-row  gap-3 items-center`}>
        {/* <Link href="/example">example</Link>
        <Link href="/example/9111505782">checking param</Link> */}
        {/* <Link href="auth/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Getting started
          </button>
        </Link> */}
        <Button variant="contained" sx={{ background: "primary" }} size="small">
          Deploy
        </Button>
        {/*  */}
        {!session ? (
          <>
            <Link href="auth/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Getting started
              </button>
            </Link>
          </>
        ) : (
          <>
            {/* {session.user?.email} */}

            {/* <button
              onClick={() => {
                signOut();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button> */}
            <div>
              {/* <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button> */}

              <Avatar
                component="div" // Provide the appropriate HTML element or component type
                onClick={handleClick}
                alt="Remy Sharp"
                src={session.user?.image}
                sizes="small"
                sx={{ cursor: "pointer" }}
              />
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <Link href="/user/all-blogs">
                  <MenuItem
                    onClick={handleClose}
                    disableRipple
                    sx={{ textDecoration: "none", color: "gray" }}
                  >
                    <HomeIcon />
                    Home
                  </MenuItem>
                </Link>
                <Link href="/user/editor">
                  <MenuItem
                    onClick={handleClose}
                    disableRipple
                    sx={{ textDecoration: "none", color: "gray" }}
                  >
                    <BorderColorIcon />
                    Editor
                  </MenuItem>
                </Link>

                <MenuItem onClick={handleClose} disableRipple>
                  <AccountCircleIcon />
                  Account
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem
                  onClick={() => {
                    handleClose();

                    router.push("/");
                    signOut();
                  }}
                  disableRipple
                >
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </StyledMenu>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
