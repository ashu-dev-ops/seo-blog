import React from "react";

import { Box, Stack, Typography, Container, Grid } from "@mui/material";

import BlogCardTwo from "@/app/componets/BlogCardTwo";

const getData = async (params: any, searchParams: any) => {
  try {
    if (searchParams.userId) {
      const res = await fetch(
        `${process.env.BASE_URL}/api/all-blogs?category=${params.id}&&userId=${searchParams.userId}`,
        {
          cache: "no-store",
        }
      );
      const posts = await res.json();
      return posts;
    }
    if (searchParams.teamId) {
      const res = await fetch(
        `${process.env.BASE_URL}/api/all-blogs?category=${params.id}&&teamId=${searchParams.teamId}`,
        {
          cache: "no-store",
        }
      );
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
};
export default async function Category({ params, searchParams }: any) {
  // const BlogOwnerId = useBlogsVisitorStore((state: any) => state.blogOwnerId);
  let data = await getData(params, searchParams);
  console.log(data);
  console.log(params, searchParams);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        minHeight: "100vh",
        // backgroundColor: "#E2E8F0",
        paddingTop: "5vh",
      }}
    >
      <Container
        sx={{ margin: "auto", marginTop: 10, maxWidth: { md: "90%" } }}
      >
        <Box
          component="h1"
          fontSize="2.4rem"
          textAlign="center"
          textTransform="capitalize"
        >
          {params.id.replace(/-/g, " ")}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop="2rem"
        >
          {data?.data?.map((blog: any, idx: number) => {
            return (
              <BlogCardTwo
                key={idx.toString()}
                title={blog.title}
                blogId={blog._id}
                readTime={blog.stats?.readTime}
                thumbnail={blog.stats?.thumbnail}
                slug={blog?.seo?.slug}
                category={blog?.seo?.category}
                description={blog?.seo?.metaDescription}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
