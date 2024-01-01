import Blog from "../../../models/Blogs";
import connect from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import Team from "@/app/models/Team";
export const GET = async (request: any) => {
  console.log("route working now 1");
  console.log("rung>>>>>>>>>>>>>>>>get all sub directory");
  console.log(request.url);
  const pathSegments = request.url.split("/");
  const id = pathSegments[pathSegments.length - 1];
  console.log("running get single blog request");
  console.log(id);
  try {
    await connect();
    // await User.find({ _id: id });
    const team = await Team.findOne({ _id: id }).populate({
      path: "category",
      populate: {
        path: "by",
        model: "User", // Replace with the actual model name for the User
      },
    });
    let allBlogs;
    if (team) {
      allBlogs = await Blog.find({
        teamId: team._id,
        blogStatus: "Publish",
      }).populate({ path: "writtenBy", model: User });
      return NextResponse.json(
        { message: "ok", data: allBlogs, category: team.category },
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
    } else {
      allBlogs = await Blog.find({
        writtenBy: id,
        blogStatus: "Publish",
      }).populate({ path: "writtenBy", model: User });
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
    }
    // console.log("all blogs we are sending>>>>", allBlogs);

    // await newUser.save();

    // return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
