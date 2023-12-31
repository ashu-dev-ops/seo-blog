import { Box, Typography, Stack, Card } from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "../_types/blogCard";
const BlogCard: React.FC<BlogCardProps> = ({
  title,
  blogId,
  readTime,
  thumbnail,
  slug,
  category,
  by,
}) => {
  return (
    <Box
      component={Link}
      href={`/blogs/${slug}-${blogId}`}
      sx={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          // padding: "0.2rem",
          borderRadius: "17px",
        }}
      >
        <Box
          className="blog-card-image-container"
          sx={{
            width: "100%",
            height: "200px",
            borderRadius: "7px",
            overflow: "hidden",
            marginTop: "5px",
          }}
        >
          <Image
            src={
              thumbnail
                ? thumbnail
                : "https://ik.imagekit.io/88u0e3wp7/tr:n-ik_ml_thumbnail/test_Lan836V48.jpg"
            }
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
          ></Image>
        </Box>

        <Box mt="10px">
          <Box
            component="p"
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#212121",
            }}
          >
            {title}
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
            {category?.name}
          </Box>
          <Typography variant="body2" sx={{ mt: "10px", color: "#212121" }}>
            {by?.firstName} {by?.lastName} , {readTime} min read
          </Typography>
        </Box>
      </Box>
    </Box>
    // </Box>
  );
};
export default BlogCard;
