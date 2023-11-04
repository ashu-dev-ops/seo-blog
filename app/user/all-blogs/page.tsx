import React from "react";
import { getServerSession } from "next-auth";
import { Box, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/blogs", {
      // fetch new every time
      cache: "no-store",
      // next: {
      //   revalidate: 10,
      //
    });
    const posts = await res.json();
    console.log(
      "we got the data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      posts
    );
    return posts;
  } catch (error) {
    console.log(error);
  }
};
export default async function page() {
  const data = await getData();
  console.log(data.dat);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#E2E8F0",
        paddingTop: "20vh",
      }}
    >
      <Typography variant="h2" textAlign="center">
        All Blogs
      </Typography>
      <Stack direction="column" gap={3}>
        {data.data.map((blog: any, idx: Number) => {
          return (
            <Box
              key={idx}
              component={Link}
              sx={{
                minWidth: "600px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "1rem",
                cursor: "pointer",
                textDecoration:'none'
              }}
              href={`/user/editor/${blog._id}`}
            >
              <Box>{blog.title}</Box>
              <Box
                sx={{
                  backgroundColor: "#BEE3F8",
                  borderRadius: "10px",
                  color: "GrayText",
                  padding: "0.3rem",
                }}
              >
                {blog.blogStatus}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
