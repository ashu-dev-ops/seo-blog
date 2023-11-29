import React from "react";

import { Box, Stack, Typography, Container, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/app/componets/BlogCard";

const getData = async (params: any) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/all-blogs/${params}`, {
      cache: "no-store",
    });
    const posts = await res.json();

    return posts;
  } catch (error) {
    console.log(error);
  }
};
export default async function page({ searchParams }: any) {
  console.log("search params >>>>>>>>>>", searchParams);
  let data = await getData(searchParams.userId);
  // const setBlogOwnerId = useBlogsVisitorStore((state:any) => state.setBlogOwnerId);
  // setBlogOwnerId(data)
  console.log(data);
  const featured = data.data.slice(-1);
  console.log("featured>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", featured);
  data.data.pop();
  if (data.data.length === 0 && featured.length === 0) {
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
        <Typography mt="5rem" variant="h3">
          No published blogs found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        // justifyContent: "center",
        minHeight: "100vh",
        // backgroundColor: "#E2E8F0",
        paddingTop: "5vh",
      }}
    >
      <Container
        sx={{
          margin: "auto",
          marginTop: 10,
          maxWidth: { md: "90%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="h1"
          fontSize={{ sm: "2.4rem", md: "2.4rem", xs: "32px" }}
          textAlign="center"
        >
          Sheetwa Elevate Your WhatsApp Marketing Game
        </Box>
        <Typography
          variant="h6"
          textAlign="center"
          color="#848484"
          fontWeight={400}
          marginX={10}
          fontSize={{ sm: "1.4rem", md: "1.4rem", xs: "30px" }}
        >
          Guides and tutorials to transform your business with WhatsApp
          messaging, marketing, automations, and more.
        </Typography>
        <Box>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              justifyContent: "space-between",
              padding: "2rem",
            }}
            gap={2}
          >
            {featured[0]?.writtenBy?.category.map((category, idx) => {
              return (
                <Box
                  key={idx}
                  // on prod
                  href={`/blogs/category/${category.slug}`}
                  // on dev
                  // href={`/blogs/category/${category.slug}?userId=${featured[0].writtenBy._id}`}
                  sx={{
                    background: "#daffd2",
                    color: "green",
                    width: "fit-content",
                    borderRadius: "5px",
                    padding: "2px 8px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  component={Link}
                >
                  {category?.name}
                </Box>
              );
            })}
          </Stack>
        </Box>
        <Stack
          className="blog-card-image-container"
          sx={{
            width: "87%",
            borderRadius: "0.25rem",
            marginTop: "40px",
            marginX: "auto",
            cursor: "pointer",
            textDecoration: "none",
          }}
          direction={{ xs: "column", sm: "row", md: "row" }}
          component={Link}
          href={`/blogs/${featured[0].seo.slug}-${featured[0]._id}`}
        >
          <Box
            sx={{
              maxWidth: "500px",
              height: "300px",
              width: "100%",
              borderRadius: "10px",
              overflow: "hidden",
              marginRight: "3rem",
            }}
          >
            <Image
              src={featured[0].stats?.thumbnail}
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
            />
          </Box>
          <Box sx={{ diplay: "flex", flexDirection: "column" }}>
            <Box
              sx={{ fontWeight: 600, fontSize: "1.8rem", lineHeight: "3rem" }}
            >
              {featured[0].title}
            </Box>
            <Box
              sx={{
                marginTop: "30px",
                fontSize: "1rem",
                color: "#424242",
                paddingRight: "40px",
              }}
            >
              ​All about gifting with Mandaala’s Celebration module! ​All about
              gifting with Mandaala’s Celebration module! gifting with
              Mandaala’s Celebration module!...
            </Box>
            <Box
              component="p"
              sx={{
                background: "#daffd2",
                color: "green",
                width: "fit-content",
                borderRadius: "5px",
                padding: "2px 8px",
                marginTop: "10px",
              }}
            >
              {featured[0].seo?.category?.name}
            </Box>
            <Typography variant="body2" sx={{ mt: "10px", color: "#212121" }}>
              by samarth , {featured[0].stats?.readTime} min read
            </Typography>
          </Box>
        </Stack>
        <Grid
          justifyContent="space-evenly"
          container
          rowGap={5}
          columnGap="1px"
          marginY="100px"
        >
          {data.data.map((blog: any, idx: number) => {
            return (
              <Grid key={idx.toString()} item xs={12} sm={6} md={3}>
                <BlogCard
                  title={blog.title}
                  blogId={blog._id}
                  readTime={blog.stats?.readTime}
                  thumbnail={blog.stats?.thumbnail}
                  slug={blog?.seo?.slug}
                  category={blog?.seo?.category}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
