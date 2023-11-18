import User from "../../models/User";
import Blog from "../../models/Blogs";
import connect from "../../lib/mongodb";
import { getServerSession } from "next-auth";

// import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/authOptions";
export const POST = async (request: any) => {
  try {
    const {
      title,
      html,
      stats,
      email,
      password,
      seo,
      writtenBy,
      blogStatus,
      tableOfContentsId,
    } = await request.json();
    console.log("running");
    console.log(title, html, stats, writtenBy, blogStatus,seo);
    await connect();

    const user = await User.findOne({ email: writtenBy });

    const newBlog = await new Blog({
      title,
      html,
      stats,
      writtenBy: user._id,
      blogStatus,
      tableOfContentsId,
      seo
    });
    const a = await newBlog.save();
    console.log(a);
    // console.log(request.json());
  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }

  try {
    // await newUser.save();
    return new NextResponse("blogs saved", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
export const GET = async (req: any) => {
  try {
    console.log("running get all blogs>>>>>>>>>>>>>API route");
    await connect();
    // const session = await getServerSession();
    const session = await getServerSession();

    const user = await User.findOne({ email: session?.user?.email });

    const data = await Blog.find({ writtenBy: user._id }).populate("writtenBy");

    return NextResponse.json({ message: "ok", data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "ok", error }, { status: 500 });
  }
};
export const PATCH = async (request: any) => {
  const { title, html, stats, blogStatus, blogId, tableOfContentsId, seo } =
    await request.json();
  await connect();

  console.log("ids", tableOfContentsId);
  console.log("modified html", html);
  const data = await Blog.findOneAndUpdate(
    { _id: blogId },
    { html, stats, title, blogStatus, tableOfContentsId,seo },
    { new: true }
  );
  console.log("data below api >>>>>>>>>....");
  console.log(data);
  return NextResponse.json({ message: "ok", data }, { status: 200 });
};
