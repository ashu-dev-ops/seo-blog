"use client";
import React from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
// import { Box, Typography, Button , IconButton,Menu} from "@mui/material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
const NavLinkButtons = () => {
  return (
    <>
      {" "}
      <Button
        component="a"
        sx={{
          margin: "5px 15px",
          fontWeight: "700",
          textDecoration: "none",
          color: "#23A566",
        }}
        href="https://sheetwa.com/"
      >
        Home
      </Button>
      <Button
        component="a"
        sx={{
          margin: "5px 15px",
          fontWeight: "700",
          textDecoration: "none",
          color: "#23A566",
        }}
        href="https://sheetwa.com/tutorials"
      >
        Tutorials
      </Button>
      <Button
        component="a"
        sx={{
          margin: "5px 15px",
          fontWeight: "700",
          textDecoration: "none",
          color: "#23A566",
        }}
        href="https://sheetwa.com/features"
      >
        Features
      </Button>
      <Button
        component="a"
        sx={{
          margin: "5px 15px",
          fontWeight: "700",
          textDecoration: "none",
          color: "#23A566",
        }}
        href="https://sheetwa.com/pricing"
      >
        Pricing
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          // color="#23A566"
          variant="contained"
          size="medium"
          sx={{
            fontWeight: "600",
            // padding: 0,
            backgroundColor: "#23A566",
            height: "fitContent",
          }}
          component="a"
          href="https://sheetwa.com/auth"
          // to="/auth"
          // onClick={toggleDrawer}
        >
          Login
        </Button>
      </Box>
    </>
  );
};
export default function PublicNavbar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  function toggleDrawer() {
    setOpenDrawer(!openDrawer);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          position: "fixed",
          zIndex: 9999,
          backgroundColor: "white",
          // padding: "1.3rem 1rem",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="https://ik.imagekit.io/ww4pq6w6n/videos/sheetwa_logo_rounded_dp_x6R5RbTUE.png?updatedAt=1696096625826"
            width={80}
            height={80}
            alt="Picture of the author"
          />
          <Typography variant="h5" fontWeight={700} color="#23A566">
            SheetWA
          </Typography>
        </Box>

        <Box
          sx={{
            display: { sm: "none", md: "flex", xs: "none" },
            gap: 3,
            padding: "1rem 3rem",
          }}
        >
          <NavLinkButtons />
        </Box>
        <IconButton
          color="inherit"
          onClick={toggleDrawer}
          sx={{ display: { xs: "block", sm: "block", lg: "none" } }}
          disableRipple
          aria-label="menu"
        >
          {openDrawer ? <CloseIcon /> : <Menu />}
        </IconButton>
      </Box>
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="left"
          open={openDrawer}
          onClose={toggleDrawer}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 250,
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            display={"flex"}
            justifyItems={"center"}
            alignItems={"center"}
            alignSelf={"center"}
            minHeight={"60px"}
          >
            <Image
              src="https://ik.imagekit.io/ww4pq6w6n/videos/sheetwa_logo_rounded_dp_x6R5RbTUE.png?updatedAt=1696096625826"
              width={40}
              height={40}
              alt="sheetwa logo"
            />
            <Typography
              variant="h6"
              color={"primary"}
              align="center"
              justifyContent={"center"}
            >
              SheetWa
              {/* {WEBSITE_NAME} */}
            </Typography>
          </Stack>
          <Divider />
          <List sx={{ alignSelf: "center", mt: 4 }}>
            <ListItem disablePadding>
              <ListItemButton
                href="https://sheetwa.com/tutorials"
                onClick={toggleDrawer}
              >
                <ListItemText
                  primary="Tutorials"
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                href="https://sheetwa.com/features"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Features" sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                href="https://sheetwa.com/pricing"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Pricing" sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href="/#faq" onClick={toggleDrawer}>
                <ListItemText primary="FAQs" sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <Button
                // color="#23A566"
                variant="contained"
                size="medium"
                sx={{
                  fontWeight: "600",
                  // padding: 0,
                  backgroundColor: "#23A566",
                  height: "fitContent",
                }}
                component="a"
                href="https://sheetwa.com/auth"
                // to="/auth"
                // onClick={toggleDrawer}
              >
                Login
              </Button>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
