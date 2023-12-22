import User from "../../../models/User";
import Blog from "../../../models/Blogs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connect from "@/app/lib/mongodb";
import Team from "@/app/models/Team";

export const GET = async (request: any) => {
  try {
    await connect();
    const session = await getServerSession();
    const user = await User.findOne({ email: session?.user?.email });
    if (!session) {
      return new NextResponse("not authorized", { status: 401 });
    } else if (user.role === "team_member" || user.role === "admin") {
      console.log("runnning get all tags");
      const team = await Team.findOne({ _id: user.teamId }).populate({
        path: "category",
        populate: {
          path: "by",
          model: "User", // Replace with the actual model name for the User
        },
      });
      console.log(team);
      return NextResponse.json({ message: "ok", data: team?.category || [] });
    } else {
      console.log("sending from backend", user?.category);
      return NextResponse.json({ message: "ok", data: user?.category });
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
    }
    const user = await User.findOne({ email: session?.user?.email });
    if (user.role === "team_member" || user.role === "admin") {
      const data = await Team.findOneAndUpdate(
        { _id: user.teamId },
        // { $push: { tags: { name: newTag, slug: slug, by: user._id } } },
        {
          $push: {
            category: {
              name: newTag,
              slug:
                slug ||
                newTag.toLowerCase().replace(/\s+/g, " ").replace(/\s+/g, "-"),
              by: user._id,
            },
          },
        },
        { new: true }
      ).populate("category.by");
      console.log("is this null", data);
      const newData = data.category[data.category.length - 1];
      console.log("category i am sending back", newData);
      return NextResponse.json({ message: "ok", data: newData });
    } else {
      //   const user = await User.findOne({ email: session?.user?.email });
      const data = await User.findOneAndUpdate(
        { email: session?.user?.email },
        {
          $push: {
            category: {
              name: newTag,
              slug:
                slug ||
                newTag.toLowerCase().replace(/\s+/g, " ").replace(/\s+/g, "-"),
              by: user._id,
            },
          },
        },
        { new: true }
      );
      console.log("is this null", data);
      const newData = data.category[data.category.length - 1];
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
    let data;
    if (!session) {
      return new NextResponse("not authorized", { status: 401 });
    } else {
      console.log("RUNNNING>>>>>>>>", session);
      const user = await User.findOne({ email: session?.user?.email });
      console.log("user>>>>>>>>>>>>>>>>>>>>.", user);
      if (user.role === "team_member" || user.role === "admin") {
        const team = await Team.findOneAndUpdate(
          { _id: user.teamId, "category._id": newTag._id },
          {
            $set: {
              "category.$.name": newTag.name,
              "category.$.slug": newTag.slug,
              // Update other properties if needed
            },
          },
          { new: true }
        );
        console.log("team cat update?>>>>>>>>", team);
        // const userId = await User.findOne({ email: session?.user?.email });
        const blogs = await Blog.find({
          teamId: team._id,
          "seo.category._id": newTag._id,
        });

        console.log("working >>>>>> bogs that have this category", blogs);
        if (blogs.length > 0) {
          await Blog.updateMany(
            { teamId: team._id, "seo.category._id": newTag._id },
            {
              $set: {
                "seo.category.name": newTag.name,
                "seo.category.slug": newTag.slug,
                // Update other properties if needed
              },
            }
          );
        }
        const newData = team.category[team.category.length - 1];
        return NextResponse.json({ message: "ok", data: newData });
      } else {
        console.log("else is running.?>>>>>>>>>>>.");
        data = await User.findOneAndUpdate(
          { email: session?.user?.email, "category._id": newTag._id },
          {
            $set: {
              "category.name": newTag.name,
              "category.slug": newTag.slug,
              // Update other properties if needed
            },
          },
          { new: true }
        );
        console.log("is this data", data);
        const userId = await User.findOne({ email: session?.user?.email });
        const blogs = await Blog.find({
          writtenBy: userId._id,
          "seo.category._id": newTag._id,
        });
        console.log("working >>>>>> bogs that have this tag", blogs);
        if (blogs.length > 0) {
          await Blog.updateMany(
            { writtenBy: userId._id, "seo.category._id": newTag._id },
            {
              $set: {
                "seo.category.name": newTag.name,
                "seo.category.slug": newTag.slug,
                // Update other properties if needed
              },
            }
          );
        }
        const newData = data.category[data.category.length - 1];
        return NextResponse.json({ message: "ok", data: newData });
      }
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
      const user = await User.findOne({ email: session?.user?.email });
      if (user.role === "team_member" || user.role === "admin") {
        const data = await Team.findOneAndUpdate(
          {
            _id: user.teamId,
          },
          {
            $pull: {
              category: { _id: tagId },
            },
          },
          { new: true } // To return the updated document
        );
        // const userId = await User.findOne({ email: session?.user?.email });
        const blogs = await Blog.find({
          teamId: user.teamId,
          "seo.category._id": tagId,
        });
        if (blogs.length > 0) {
          await Blog.updateMany(
            { teamId: user.teamId, "seo.category._id": tagId },
            { $unset: { "seo.category": "" } }
          );
        }

        console.log("is this data", data);
        return NextResponse.json({ message: "ok", data });
      } else {
        const data = await User.findOneAndUpdate(
          {
            email: session?.user?.email,
          },
          {
            $pull: {
              category: { _id: tagId },
            },
          },
          { new: true } // To return the updated document
        );
        const userId = await User.findOne({ email: session?.user?.email });
        const blogs = await Blog.find({
          writtenBy: userId._id,
          "seo.category._id": tagId,
        });
        if (blogs.length > 0) {
          await Blog.updateMany(
            { writtenBy: userId._id, "seo.category._id": tagId },
            { $unset: { "seo.category": "" } }
          );
        }

        console.log("is this data", data);
        return NextResponse.json({ message: "ok", data });
      }
    }
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
