import React from "react";
import { headers } from "next/headers";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

const getData = async () => {
  console.log("running get data to get all blogs >>>>>>>>>>>.");
  console.log("headers i want to see insdie getData", headers());
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/blogs`, {
      method: "GET",
      headers: headers(),
    });
    const posts = await res.json();
    console.log("data that we are getting back", posts.data.length);
    return posts;
  } catch (error) {
    console.log(error);
  }
};
export const dynamic = "force-dynamic";
export default async function page() {
  const data = await getData();
  console.log(" property on which i am looping", data.data.length);
  if (data.data.length === 0) {
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
        <Typography variant="h2" textAlign="center" mb={3}>
          No Blogs Found
        </Typography>
      </Box>
    );
  }

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
      <Typography variant="h2" textAlign="center" mb={3}>
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
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "rgb(238,250,241)",
                },
              }}
              href={`/user/editor/${blog._id}`}
            >
              <Stack>
                <Typography variant="h5" color="GrayTexts">
                  {" "}
                  {blog.title}
                </Typography>

                <Typography variant="body" color="gray">
                  {" "}
                  By {blog.writtenBy.email}
                </Typography>
              </Stack>

              <Box
                sx={{
                  backgroundColor:
                    blog.blogStatus === "Draft" ? "#BEE3F8" : "#C6F6D5",
                  borderRadius: "10px",
                  color: "GrayText",
                  padding: "0.3rem",
                  height: "25px",
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
