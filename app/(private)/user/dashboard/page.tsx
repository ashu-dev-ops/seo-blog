import React from "react";
import { headers } from "next/headers";
import { Box, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";

const getData = async () => {
  // console.log("running get data to get all blogs >>>>>>>>>>>.");
  // console.log("headers i want to see insdie getData", headers());
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/blogs`, {
      method: "GET",
      headers: headers(),
    });
    if (res) {
      // console.log("res we get from fetch on deploy ", res);
      const posts = await res.json();
      // console.log("data that we are getting back", posts.data.length);
      return posts;
    }
    console.log("error occur>>>>> ", res);
  } catch (error) {
    console.log(error);
  }
};
export const dynamic = "force-dynamic";
export default async function page() {
  const data = await getData();
  // console.log("check here data", data);
  if (!data) {
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
        Error occur
      </Box>
    );
  }
  console.log("All blogs lenght", data.data.length);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        minHeight: "100vh",

        paddingTop: "0vh",
      }}
    >
      <Stack direction="column" gap={3}>
        <Box
          sx={{
            minWidth: "700px",
            maxWidth: "700px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h4" fontWeight={900} color="GrayTexts">
              Posts
            </Typography>
            <Stack direction="row" gap={1}>
              <Link href="/user/editor">
                <Button variant="contained">Write New Post</Button>
              </Link>
              {/* <Link href={`/blogs?userId=${data.data[0].writtenBy._id}`}>
                <Button variant="outlined">View Blog</Button>
              </Link> */}
            </Stack>
          </Stack>
        </Box>
        {data.data.length > 0 ? (
          <>
            {data.data.map((blog: any, idx: Number) => {
              return (
                <Box
                  key={idx.toString()}
                  component={Link}
                  sx={{
                    minWidth: "600px",
                    maxWidth: "700px",
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
                      {blog.title}
                    </Typography>

                    <Typography variant="body2" color="GrayTexts">
                      {/* By {blog.writtenBy.name || blog.writtenBy.email} */}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      backgroundColor:
                        blog.blogStatus === "Draft" ? "#BEE3F8" : "#C6F6D5",
                      borderRadius: "4px",
                      color: "GrayText",
                      padding: "0.3rem 1rem",
                      height: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {blog.blogStatus}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack>
    </Box>
  );
}
