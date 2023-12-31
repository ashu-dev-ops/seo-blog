import User from "../../../models/User";
import Blog from "../../../models/Blogs";
import connect from "../../../lib/mongodb";
import { NextResponse } from "next/server";
export const GET = async (request: Request) => {
  console.log("rung>>>>>>>>>>>>>>>>get single");
  const pathSegments = request.url.split("/");
  const id = pathSegments[pathSegments.length - 1];
  console.log("running get single blog request");
  console.log(id);
  //   console.log(request.url)
  await connect();
  const data = await Blog.find({ _id: id }).populate("writtenBy");
  //   console.log("data below api >>>>>>>>>....");
  //   // console.log(data);
  //   const jsonData = JSON.stringify(data);
  console.log("what i am getting from db>>>>>>>>>", data);
  return NextResponse.json(
    { message: "ok", data: data[0] },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
  //   return NextResponse.json({ message: "ok" }, { status: 200 });
};
