import { Box, Card, Container, Typography, Stack, Avatar } from "@mui/material";
import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LeadGenCard from "@/app/componets/LeadGenCard";
import FloatingBar from "@/app/componets/FloatingBar";
import BlogCta from "@/app/componets/BlogCta";
export default async function ReadSingleBlog({ params }: any) {
  const data = await fetch(`${process.env.BASE_URL}/api/blogs/${params.id}`, {
    cache: "no-store",
  });
  const data2 = await data.json();
  console.log(data2);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // backgroundColor: "rgb(251,252,254)",
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      <Container
        component="section"
        sx={{ margin: "auto", marginTop: 12, maxWidth: { sm: "800px" } }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{ position: "relative", top: "-20px" }}
            fontSize="42px"
            fontWeight={700}
            paddingX="20px"
          >
            {data2.data.title}
          </Typography>
          <FloatingBar tableOfContentsId={data2.data.tableOfContentsId} />
          <Stack direction="row" justifyContent="space-between" paddingX="20px">
            <Typography color="GrayText" variant="body2">
              <Box
                component="span"
                color="rgb(82,200,91)"
                fontSize="17px !important"
              >
                by Samarth
              </Box>{" "}
              - 3 min read
            </Typography>{" "}
            <Stack
              sx={{
                backgroundColor: "rgb(82,200,91)",
                padding: "0.2rem 0.4rem",
              }}
              direction="row"
              alignItems="center"
              justifyContent="center"
              borderRadius="5px"
              gap={1}
            >
              <Box
                component="a"
                sx={{
                  cursor: "pointer",
                  "&hover": {
                    backgroundColor: "#23A566",
                  },
                }}
              >
                <EmailIcon sx={{ color: "white" }} />
              </Box>
              <Box
                component="a"
                sx={{ cursor: "pointer" }}
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsheetwa.com%2Fblogs%265493202a868499292add7b4"
              >
                <FacebookIcon sx={{ color: "white" }} />
              </Box>
              <Box
                component="a"
                sx={{ cursor: "pointer" }}
                target="_blank"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fsheetwa.com%2Fblogs%2${data2.data._id}`}
              >
                <LinkedInIcon sx={{ color: "white" }} />
              </Box>
              <Box
                component="a"
                sx={{ cursor: "pointer" }}
                target="_blank"
                href={`https://twitter.com/intent/tweet?url=https://sheetwa.com/blogs/${data2.data._id}`}
              >
                <TwitterIcon sx={{ color: "white" }} />
              </Box>
            </Stack>
          </Stack>
          <Box
            component="div"
            className="sun-editor-editable"
            dangerouslySetInnerHTML={{ __html: data2.data.html }}
            //   sx={{ marginY: 0 }}
          ></Box>
        </Box>
        <LeadGenCard />
        <BlogCta />
      </Container>
    </Box>
  );
}
