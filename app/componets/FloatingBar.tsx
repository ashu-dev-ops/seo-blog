"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
export default function FloatingBar({ tableOfContentsId }: any) {
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("h2");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id");
        }
      });

      const navLi = document.querySelectorAll(".floating-link");
      navLi.forEach((li, idx) => {
        li.classList.remove("active");
        console.log("loop running>>>>>>>>", li.className, idx);
        if (li.classList.contains(current)) {
          console.log("my li element or link", li);
          li.classList.add("active");
        }
      });

      setCurrentSection(current);
    };
    console.log(currentSection);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <Box
      sx={{
        position: {
          sm: "relative",
          md: "relative",
          xs: "relative",
          lg: "fixed",
        },
        maxWidth: { sm: "100%", md: "100%", xs: "98%", lg: "250px" },
        width: { sm: "100%", md: "100%", xs: "98%", lg: "19%" },
        top: { sm: "0", md: "0", xs: "0", lg: "120px" },
        left: { lg: "5px", md: "5px", sm: "5px", xs: "-9px" },
        // color: "white",
        borderRadius: "16px",
        padding: "1rem",

        flexDirection: "column",
        backgroundColor: "rgb(46 218 62 / 10%)",
        gap: 1,
        display: "flex",
        margin: "1rem",
      }}
    >
      <Typography fontSize="18px" fontWeight={700} mb={"8px"}>
        Contents
      </Typography>
      {tableOfContentsId.length > 1 &&
        tableOfContentsId.map((headerId: any, idx: any) => {
          return (
            <Box
              component={Link}
              key={idx}
              href={`#${headerId.headingId}`}
              className={`${headerId.headingId} floating-link`}
              sx={{
                textDecoration: "none",
                fontSize: "14px",
                color:
                  currentSection === headerId.headingId ? "green" : "GrayText",
              }}
            >
              {headerId.headingTitle}
            </Box>
          );
        })}
    </Box>
  );
}
