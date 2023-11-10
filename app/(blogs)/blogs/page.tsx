// import React from "react";

// export default function page({ searchParams }: any) {
//   console.log(searchParams);
//   return <div>params page {searchParams.userId}</div>;
// }
import React from "react";
// import { getServerSession } from "next-auth";
import { Box, Stack, Typography, Container, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/app/componets/BlogCard";
// import { Container } from "postcss";
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
        // backgroundColor: "#E2E8F0",
        paddingTop: "5vh",
      }}
    >
      <Container
        sx={{ margin: "auto", marginTop: 10, maxWidth: { md: "90%" } }}
      >
        <Box component="h1" fontSize="2.4rem" textAlign="center">
          Sheetwa Elevate Your WhatsApp Marketing Game
        </Box>
        <Typography
          variant="h6"
          textAlign="center"
          color="#848484"
          fontWeight={400}
          marginX={10}
          fontSize="1.4rem"
        >
          Guides and tutorials to transform your business with WhatsApp
          messaging, marketing, automations, and more.
        </Typography>
        <Stack
          className="blog-card-image-container"
          sx={{
            width: "87%",
            borderRadius: "0.25rem",
            marginTop: "40px",
            marginX: "auto",
            cursor: "pointer",
          }}
          direction="row"
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
            />
          </Box>
          <Box sx={{ diplay: "flex", flexDirection: "column" }}>
            <Box
              sx={{ fontWeight: 600, fontSize: "1.8rem", lineHeight: "3rem" }}
            >
              ​All about gifting with Mandaala’s Celebration module!
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
          </Box>
        </Stack>
        <Grid
          justifyContent="space-evenly"
          container
          rowGap={5}
          columnGap="1px"
          marginY="100px"
        >
          {data.data.map((blog: any, idx: Number) => {
            return (
              <Grid key={idx} item xs={12} sm={6} md={3}>
                <BlogCard title={blog.title} blogId={blog._id} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
