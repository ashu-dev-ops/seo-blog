import { Box, Typography, Stack, Card } from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function BlogCard({ title, blogId }) {
  return (
    // <Box
    //   sx={{
    //     cursor: "pointer",

    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     flexDirection: "column",
    //     overflow: "hidden",
    //     padding: "1rem",
    //   }}
    // >
    <Box
      component={Link}
      href={`/blogs/${blogId}`}
      sx={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          // padding: "0.2rem",
          borderRadius: "17px",
        }}
      >
        <Box
          className="blog-card-image-container"
          sx={{
            width: "100%",
            height: "200px",
            borderRadius: "7px",
            overflow: "hidden",
            marginTop: "5px",
          }}
        >
          <Image
            src="https://superblog.supercdn.cloud/site_cuid_ckox4iu6j002sl8lh729c49bu/images/blog-banner-01-2-1663060639684-compressed.jpg"
            alt="Picture of the author"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",

              height: "100%",
              objectFit: "cover",
              transition: "all ease-in-out .4s",
              borderRadius: "7px",
              overflow: "hidden",
            }}
            // style={{
            //   // width: "100%",
            //   // height: "100%",
            //   // borderRadius: "7px",
            //   // overflow: "hidden",
            //   objectFit: "cover",
            //   // transition: "all ease-in-out .4s",
            // }} // optional// optional
          ></Image>
        </Box>

        <Box mt="10px">
          <Box
            component="p"
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#212121",
            }}
          >
            {title}
          </Box>
          <Box
            component="p"
            sx={{
              background: "#daffd2",
              color: "green",
              width: "fit-content",
              borderRadius: "5px",
              padding: "2px 8px",
              marginTop:'10px'
            }}
          >
            Productivity
          </Box>
          <Typography variant="body2" sx={{ mt: "10px", color: "#212121" }}>
            by samarth , 4 min read
          </Typography>
        </Box>
      </Box>
    </Box>
    // </Box>
  );
}
