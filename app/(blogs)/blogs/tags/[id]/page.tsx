import React from "react";

import { Box, Stack, Typography, Container, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/app/componets/BlogCard";

const getData = async (params: any, searchParams: any) => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/all-blogs?tags=${params.id}&&userId=${searchParams.userId}`,
      {
        cache: "no-store",
      }
    );
    const posts = await res.json();

    return posts;
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
          Tag : {params.id}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {data.data.map((blog: any, idx: number) => {
            return (
              <Box key={idx.toString()}>
                <BlogCard
                  title={blog.title}
                  blogId={blog._id}
                  readTime={blog.stats?.readTime}
                  thumbnail={blog.stats?.thumbnail}
                  slug={blog?.seo?.slug}
                  category={blog?.seo?.category}
                />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
