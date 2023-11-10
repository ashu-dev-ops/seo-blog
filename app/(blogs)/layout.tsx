import { Box, Typography, Button } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Container } from "postcss";
import SubDirectoryFooter from "../componets/SubDirectoryFooter";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>sub directory nav-bar</h1> */}
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

        <Box sx={{ display: "flex", gap: 3, padding: "1rem 3rem" }}>
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
        </Box>
      </Box>
      {children}
      <SubDirectoryFooter />
    </div>
  );
}
