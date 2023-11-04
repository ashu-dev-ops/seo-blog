import User from "../../models/User";
import Blog from "../../models/Blogs";
import connect from "../../lib/mongodb";
// import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const POST = async (request: any) => {
  try {
    const { title, html, stats, email, password, seo, writtenBy, blogStatus } =
      await request.json();
    console.log("running");
    console.log(title, html, stats, writtenBy, blogStatus);
    await connect();

    const user = await User.findOne({ email: writtenBy });

    const newBlog = await new Blog({
      title,
      html,
      stats,
      writtenBy: user._id,
      blogStatus,
    });
    const a = await newBlog.save();
    console.log(a);
    // console.log(request.json());
  } catch (error) {
    console.log(error);
  }

  try {
    // await newUser.save();
    return new NextResponse("working", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
export const GET = async (request: any) => {
  await connect();
  const data = await Blog.find({});
  console.log("data below api >>>>>>>>>....");
  // console.log(data);
  const jsonData = JSON.stringify(data);
  return NextResponse.json({ message: "ok", data }, { status: 200 });
};
export const PATCH = async (request: any) => {
  const {
    title,
    html,
    stats,
    email,
    password,
    seo,
    writtenBy,
    blogStatus,
    blogId,
  } = await request.json();
  await connect();
  const data = await Blog.findOneAndUpdate(
    { _id: blogId },
    { html, stats, title, blogStatus }
  );
  console.log("data below api >>>>>>>>>....");
  console.log(data);
  return NextResponse.json({ message: "ok", data }, { status: 200 });
};
