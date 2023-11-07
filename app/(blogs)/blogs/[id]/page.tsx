import { Box, Card, Typography } from "@mui/material";
import React from "react";

export default async function ReadSingleBlog({ params }: any) {
  const data = await fetch(`${process.env.BASE_URL}/api/blogs/${params.id}`);
  const data2 = await data.json();
  console.log(data2);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "rgb(251,252,254)",
        padding: "1rem",
      }}
    >
      <Card
        sx={{
          maxWidth: "800px",
          margin: "auto",
          minHeight: "70vh",
          padding: "1rem",
        }}
      >
        <Typography variant="h2" textAlign='center'>{data2.data.title}</Typography>
        <Box
          component="div"
          className="content-editor"
          dangerouslySetInnerHTML={{ __html: data2.data.html }}
          //   sx={{ marginY: 0 }}
        ></Box>
      </Card>
    </Box>
  );
}
