// import React from "react";

// export default function page({ searchParams }: any) {
//   console.log(searchParams);
//   return <div>params page {searchParams.userId}</div>;
// }
import React from "react";
// import { getServerSession } from "next-auth";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
const getData = async (params: any) => {
  try {
    //i changed here
    const res = await fetch(`${process.env.BASE_URL}/api/all-blogs/${params}`, {
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
export default async function page({ searchParams }: any) {
  console.log("search params >>>>>>>>>>", searchParams);
  const data = await getData(searchParams.userId);
  // console.log(""data.data);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#E2E8F0",
        paddingTop: "5vh",
      }}
    >
      <Typography variant="h2" textAlign="center" mb={3}>
        SheetWA Blogs
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
              href={`/blogs/${blog._id}`}
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

            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
