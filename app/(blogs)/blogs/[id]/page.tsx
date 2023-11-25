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
import type { Metadata, ResolvingMetadata } from "next";
import UtilityLinkButton from "@/app/componets/UtilityLinkButton";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lastPart = params.id.substring(params.id.lastIndexOf("-") + 1);

  console.log("id we are sending>>>>>>>>>>>>>>>>>>>>..", lastPart);
  const data = await fetch(`${process.env.BASE_URL}/api/blogs/${lastPart}`, {
    cache: "no-store",
  });
  // console.log("my value>>>>>>>", data.data);
  const data2 = await data.json();
  console.log("my value>>>>>>>>", data2.data);
  const keywords = data2?.data?.seo?.tags.map((i) => i.name) || [];
  return {
    title: data2?.data?.seo?.metaTitle || "",
    description: data2?.data?.seo?.metaDescription || "",
    openGraph: {
      images: [
        `${
          data2?.data?.stats?.thumbnail ||
          "https://ik.imagekit.io/ww4pq6w6n/videos/sheetwa_logo_rounded_dp_x6R5RbTUE.png?updatedAt=1696096625826&tr=w-1200%2Ch-675%2Cfo-auto"
        }`,
      ],
    },
    keywords: keywords.join(", "),
  };
}
export default async function ReadSingleBlog({ params }: any) {
  const lastPart = params.id.substring(params.id.lastIndexOf("-") + 1);

  console.log("id we are sending>>>>>>>>>>>>>>>>>>>>..", lastPart);
  const data = await fetch(`${process.env.BASE_URL}/api/blogs/${lastPart}`, {
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
              <Box
                component="sapn"
                sx={{
                  background: "#daffd2",
                  color: "green",
                  width: "fit-content",
                  borderRadius: "5px",
                  padding: "2px 8px",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}
              >
                {data2.data.seo?.category?.name}
              </Box>
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
        <Stack direction="row" sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <UtilityLinkButton
            text={data2.data?.seo?.category?.name}
            // path={`category/${data2.data?.seo?.category?.name}?userId=6555dbdba655280a9328e1dd`}
            path={`category/${data2.data?.seo?.category?.name}`}
          />
          {data2.data?.seo?.tags.map((tag: any, idx) => (
            <UtilityLinkButton
              text={tag.name}
              path={`tags/${tag.name}`}
              key={idx}
              // path={`tags/${tag.name}?userId=6555dbdba655280a9328e1dd`}
            />
          ))}
        </Stack>

        <LeadGenCard />
        <BlogCta />
      </Container>
    </Box>
  );
}
