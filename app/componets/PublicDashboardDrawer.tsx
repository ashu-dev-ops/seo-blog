"use client";
import React from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";

import { Menu } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
export default function PublicDashboardDrawer() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  function toggleDrawer() {
    setOpenDrawer(!openDrawer);
  }
  return (
    <>
      <IconButton
        color="inherit"
        onClick={toggleDrawer}
        sx={{
          display: { xs: "block", sm: "block", lg: "none" },
          position: "fixed",
          right: "10px",
          top: "15px",
        }}
        disableRipple
        aria-label="menu"
      >
        {openDrawer ? <CloseIcon /> : <Menu />}
      </IconButton>
      <Box
        component="nav"
        sx={{
          display: { xs: "initial", sm: "initial", lg: "none" },
          // position: "absolute",
          // right: "5px",
        }}
      >
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
