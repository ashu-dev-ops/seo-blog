import User from "../../models/User";
import Blog from "../../models/Blogs";
import connect from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const POST = async (request: any) => {
  console.log("route working");
  const { id } = await request.json();

  await connect();
  const allBlogs = await Blog.find({ writtenBy: id });
  console.log("we got the data");
  // const existingUser = await User.findOne({ email });

  // if (existingUser) {
  //   return new NextResponse("Email is already in use", { status: 400 });
  // }

  // const hashedPassword = await bcrypt.hash(password, 5);
  // const newUser = new User({
  //   email,
  //   password: hashedPassword,
  // });

  try {
    // await newUser.save();
    return NextResponse.json(
      { message: "ok", data: allBlogs },
      { status: 200 }
    );
    // return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
