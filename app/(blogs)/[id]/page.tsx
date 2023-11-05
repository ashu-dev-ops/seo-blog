import { Box } from "@mui/material";
import React from "react";

export default async function ReadSingleBlog({ params }: any) {
  const data = await fetch(`http://localhost:3000/api/blogs/${params.id}`);
  const data2 = await data.json();
  console.log(data2);
  return (
    <div className="" style={{ display: "flex" }}>
      <Box
        component="div"
        className="content-editor"
        dangerouslySetInnerHTML={{ __html: data2.data.html }}
        sx={{ marginY: 10 }}
      ></Box>
    </div>
  );
}
