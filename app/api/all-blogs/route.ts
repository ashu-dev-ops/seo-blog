import Blog from "../../models/Blogs";
import connect from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import mongoose from "mongoose";
export const GET = async (request: any) => {
  await connect();
  const writtenBy = request.nextUrl.searchParams.get("userId");
  const category = request.nextUrl.searchParams.get("category");
  const tags = request.nextUrl.searchParams.get("tags");

  console.log("value>>>>>>>>>>>>>>>>>>>.", writtenBy, category, tags);
  let allBlogs: any[] = [];
  if (writtenBy && (category || tags)) {
    if (category) {
      console.log("finding category");
      const blogs = await await Blog.find({
        writtenBy: writtenBy,
      });
      console.log("all blogs of user", blogs);
      allBlogs = await Blog.find({
        writtenBy: writtenBy,
        "seo.category.slug": category,
      });
      console.log("from category", allBlogs);
    }
    if (tags) {
      console.log("finding tags");
      allBlogs = await Blog.find({
        "writtenBy": writtenBy,
        "seo.tags.slug": tags,
      });
      console.log("from tags", allBlogs);
    }
  }

  //   console.log("we got the data");
  try {
    // await newUser.save();
    return NextResponse.json(
      { message: "ok", data: allBlogs },
      // { message: "ok", data:'test'},
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
    // return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
