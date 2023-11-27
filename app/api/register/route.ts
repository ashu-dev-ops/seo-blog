import User from "../../models/User";
import connect from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const POST = async (request: any) => {
  const { email, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  console.log("working>>>>>>>");
  const sanitizedTags = [];
  const newUser = new User({
    email,
    password: hashedPassword,
    tags: sanitizedTags, // Initialize as an empty array
    category: [], // Initialize as an empty array
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
};
