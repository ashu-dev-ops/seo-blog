import BlogCard from "@/app/componets/BlogCard";
import { useBlogsVisitorStore } from "@/app/store/zustand/store";
import { Grid } from "@mui/material";
import React from "react";
const getData = async (params: any, searchParams: any) => {
  // try {
  //   const res = await fetch(
  //     `${process.env.BASE_URL}/api/all-blogs?category=${params.id}&&userId=${searchParams.userId}`,
  //     {
  //       cache: "no-store",
  //     }
  //   );
  //   const posts = await res.json();

  //   return posts;
  // } catch (error) {
  //   console.log(error);
  // }
};
export default async function Category({ params, searchParams }: any) {
  // const BlogOwnerId = useBlogsVisitorStore((state: any) => state.blogOwnerId);
  // let data = await getData(params, searchParams);
  console.log(params, searchParams);
  return (
    <div>
      {/* {data.data.map((blog: any, idx: number) => {
        return (
          <Grid key={idx.toString()} item xs={12} sm={6} md={3}>
            <BlogCard
              title={blog.title}
              blogId={blog._id}
              readTime={blog.stats?.readTime}
              thumbnail={blog.stats?.thumbnail}
              slug={blog?.seo?.slug}
            />
          </Grid>
        );
      })} */}
    </div>
  );
}
