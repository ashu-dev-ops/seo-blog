import Blog from "../../../models/Blogs";
import connect from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
export const GET = async (request: any) => {
  console.log("route working now 1");
  console.log("rung>>>>>>>>>>>>>>>>get all sub directory");
  console.log(request.url);
  const pathSegments = request.url.split("/");
  const id = pathSegments[pathSegments.length - 1];
  console.log("running get single blog request");
  console.log(id);

  await connect();
  // await User.find({ _id: id });
  const allBlogs = await Blog.find({
    writtenBy: id,
    blogStatus: "Publish",
  // }).populate("writtenBy");
  }).populate({ path: 'writtenBy', model: User });
  console.log(allBlogs);
  //   console.log("we got the data");
  try {
    // await newUser.save();
    return NextResponse.json(
      { message: "ok", data: allBlogs },
      // { message: "ok", data:'test'},
      { status: 200 }
    );
    // return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
