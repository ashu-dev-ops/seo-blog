
import React from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
  capitalize,
  Avatar,
  Grid,
} from "@mui/material";
import FooterColumn from "./footerColumn";


export default function SubDirectoryFooter() {
  const footerData = [
    {
      title: "Product",
      links: [
        {
          linkName: "Home",
          path: "/",
        },

        {
          linkName: "Pricing",
          path: "/pricing",
        },

        {
          linkName: "Features",
          path: "/features",
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          linkName: "Getting started",
          path: `getting-started-with-SheetWA`,
        },
        {
          linkName: "FAQs",
          path: "/faq",
        },
        {
          linkName: "Blogs",
          path: "/blogs",
        },
        {
          linkName: "Tutorials",
          path: "/tutorials",
        },
      
      ],
    },
    {
      title: "Support",
      links: [
        {
          linkName: "Contact",
          path: "/support",
        },

        {
          linkName: "Guidelines",
          path: "/guidelines",
        },

        {
          linkName: "Cancellation",
          path: "/cancellation-policy",
        },
      ],
    },
    {
      title: "Policies",
      links: [
        {
          linkName: "Cookie policy",
          path: "/cookie",
        },
        {
          linkName: "Privacy policy",
          path: "/privacy-policy",
        },

        {
          linkName: "Terms of Serivce",
          path: "/terms-of-service",
        },
        {
          linkName: "Acceptable policy",
          path: "/acceptablePolicy",
        },
      ],
    },
  ];

  return (
    <Container>
      <Stack direction={{ sm: "column", md: "row" }} sx={{ marginTop: "5vh" }}>
        <Box
          sx={{
            width: { sm: "100%", md: "32%" },
            padding: { sm: "60px 40px 10px 10px", md: "60px 40px 60px 10px" },
          }}
        >
          {/* <Typography></Typography> */}
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent={{ xs: "center", sm: "initial" }}
          >
            <Box
              component="img"
              src="https://sheetstowhatsapp.com/static/media/logo_web.2474e85cfdfebcda9723.png"
              height="50px"
              width="50px"
              alt='SheetWA logo'
            ></Box>
            <Box
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                padding: 0,
                marginTop: 0,
                textAlign: { xs: "center", sm: "initial" },
              }}
              component="h2"
            >
              SheetWA
            </Box>
          </Stack>

          <Box
            sx={{
              fontSize: "16px",
              // fontWeight: 500,
              listStyle: "none",
              cursor: "pointer",
              padding: "10px 0px",
              borderRadius: "10px",
              color: "#171e30",
              textAlign: { xs: "center", sm: "initial" },
            }}
          >
            Supercharge your WhatsApp web for work
          </Box>
        </Box>
        <Box
          sx={{
            width: { sm: "100%", md: "68%" },
            display: "flex",
            flexDirection: { sm: "column", md: "row", xs: "column" },
            paddingLeft: { sm: "10px", md: "40px" },
            paddingTop: "60px",
            paddingBottom: "60px",
          }}
        >
          {footerData.map((i) => {
            console.log(i);
            return <FooterColumn title={i.title} links={i.links} />;
          })}
        </Box>
      </Stack>
    </Container>
  );
}
