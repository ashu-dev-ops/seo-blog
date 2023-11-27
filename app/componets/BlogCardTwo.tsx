import { Box, Typography, Stack, Card } from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "../_types/blogCard";

const BlogCardTwo: React.FC<BlogCardProps> = ({
  title,
  blogId,
  readTime,
  thumbnail,
  slug,
  category,
  description,
}) => {
  return (
    <Box
      component={Link}
      href={`/blogs/${slug}-${blogId}`}
      sx={{ textDecoration: "none", minWidth: "700px" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          flexDirection: "row",
          width: "100%",
          maxWidth: "700px",

          borderRadius: "17px",
          gap: 3,
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
            maxWidth: "300px",
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

        <Box sx={{ height: "100%", width: "100%", paddingY: "5px" }}>
          <Box
            component="p"
            sx={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#212121",
            }}
          >
            {title}
          </Box>
          <Box
            component="p"
            sx={{
              color: "#212121",
              mt: "10px",
            }}
          >
            {description}...
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
            by samarth , {readTime} min read
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default BlogCardTwo;
