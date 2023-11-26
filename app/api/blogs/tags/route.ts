import User from "../../../models/User";
import Blog from "../../../models/Blogs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connect from "@/app/lib/mongodb";

export const GET = async (request: any) => {
  try {
    await connect();
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("not authorized", { status: 401 });
    } else {
      const user = await User.findOne({ email: session?.user?.email });
      return NextResponse.json({ message: "ok", data: user?.tags });
    }
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
export const POST = async (request: any) => {
  console.log("running>>>>>>>>>>>>..");
  try {
    const { newTag, slug } = await request.json();
    console.log("NEW TAG", newTag);

    await connect();
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("not authorized", { status: 401 });
    } else {
      //   const user = await User.findOne({ email: session?.user?.email });
      const data = await User.findOneAndUpdate(
        { email: session?.user?.email },
        { $push: { tags: { name: newTag, slug: slug } } },
        { new: true }
      );
      console.log("is this null", data);
      const newData = data.tags[data.tags.length - 1];
      return NextResponse.json({ message: "ok", data: newData });
    }
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
export const PATCH = async (request: any) => {
  console.log("running>>>>>>>>>>>>..");
  try {
    const { newTag } = await request.json();
    console.log("NEW TAG", newTag);

    await connect();
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("not authorized", { status: 401 });
    } else {
      //   const user = await User.findOne({ email: session?.user?.email });
      const data = await User.findOneAndUpdate(
        { email: session?.user?.email, "tags._id": newTag._id },
        {
          $set: {
            "tags.$.name": newTag.name,
            "tags.$.slug": newTag.slug,
            // Update other properties if needed
          },
        },
        { new: true }
      );
      console.log("is this data", data);
      const userId = await User.findOne({ email: session?.user?.email });
      const blogs = await Blog.find({
        writtenBy: userId._id,
        "seo.tags._id": newTag._id,
      });
      console.log("working >>>>>> bogs that have this tag", blogs);
      if (blogs.length > 0) {
        await Blog.updateMany(
          { writtenBy: userId._id, "seo.tags._id": newTag._id },
          {
            $set: {
              "seo.tags.$.name": newTag.name,
              "seo.tags.$.slug": newTag.slug,
              // Update other properties if needed
            },
          }
        );
      }
      const newData = data.tags[data.tags.length - 1];
      return NextResponse.json({ message: "ok", data: newData });
    }
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
export const DELETE = async (request: any) => {
  console.log("running>>>>>>>>>>>>.. Delete ", request.url);
  // console.log("running>>>>>>>>>>>>.. Delete ", request.query);
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  console.log("test>>>>>>>>...", searchParams);
  const tagId = searchParams.get("tagID");

  try {
    console.log("NEW TAG>>>>>>>>>>>>>", tagId);

    await connect();
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("not authorized", { status: 401 });
    } else {
      //   const user = await User.findOne({ email: session?.user?.email });
      const data = await User.findOneAndUpdate(
        {
          email: session?.user?.email,
        },
        {
          $pull: {
            tags: { _id: tagId },
          },
        },
        { new: true } // To return the updated document
      );
      const userId = await User.findOne({ email: session?.user?.email });
      const blogs = await Blog.find({
        writtenBy: userId._id,
        "seo.tags._id": tagId,
      });
      console.log("working >>>>>> bogs that have this tag", blogs);
      if (blogs.length > 0) {
        await Blog.updateMany(
          { writtenBy: userId._id, "seo.tags._id": tagId },
          { $pull: { "seo.tags": { _id: tagId } } }
        );
      }
      console.log("is this data", data);
      return NextResponse.json({ message: "ok", data });
    }
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
