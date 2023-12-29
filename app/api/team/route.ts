import User from "../../models/User";
import connect from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import Team from "@/app/models/Team";
export const POST = async (req: any, res: any) => {
  // const { email, password, role, name } = await req.json();
  const body = await req.json();
  console.log(">>>>>>>>>>>>>>>>>>>>>>>.", body);

  await connect();
  const session = await getServerSession();
  if (!session.user) {
    return new NextResponse("Not authorize", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 5);
  console.log("working>>>>>>>", session?.user?.email);
  const admin = await User.findOne({ email: session?.user?.email });
  console.log(admin);
  const newUser = new User({
    email: body.email,
    password: hashedPassword,
    role: body.role ? body.role : "user",
    name: body.name,
    teamId: admin.teamId,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  await newUser.save();
  console.log("new user id >>>>>>>>>>>", newUser._id);
  const team = await Team.findOneAndUpdate(
    { _id: admin.teamId },
    { $push: { members: { memberId: newUser._id } } },
    { new: true }
  );
  console.log("team>>>>>>>>>>>>>", team);

  try {
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
};
export const GET = async (request: any) => {
  try {
    const session = await getServerSession();
    await connect();
    const admin = await User.findOne({ email: session.user?.email });
    console.log("admin>>>>>>>>>>>", admin);
    const team = await Team.findOne({ _id: admin?.teamId });
    console.log("team>>>>>>>>>>>>>...", team);

    let data = [];
    for (const member of team.members) {
      const user = await User.findOne({ _id: member.memberId }).select(
        "name email createdAt firstName lastName role"
      );
      data.push(user);
    }
    console.log(data);

    // await newUser.save();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
};
