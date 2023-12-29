import User from "../../models/User";
import Team from "../../models/Team";
import connect from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { type } from "os";

export const PATCH = async (request: any) => {
  try {
    let body = await request.json();
    console.log(">>>>>>>>>>>>><<<<<<<<<<<<", body);
    const session = await getServerSession();
    await connect();

    const existingUser = await User.findOne({ email: session?.user?.email });

    if (!existingUser) {
      return new NextResponse("Not authorized", { status: 500 });
    }
    if (body.role === "admin") {
      if (!existingUser.teamId) {
        const team = await Team.create({
          createdBy: existingUser._id,
        });
        body.teamId = team._id;
      }
    }
    // if(req.body.role)
    const data = await User.findOneAndUpdate(
      { email: session?.user?.email },
      body,
      { new: true }
    );
    console.log("data updated successfully", data);
    return NextResponse.json({ message: "ok", data });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
export const DELETE = async (request: any) => {
  try {
    // let body = await request.json();
    const userId = request.nextUrl.searchParams.get("userId");
    // const deleteAdmin = request.nextUrl.searchParams.get("deleteAdmin");
    // console.log(">>>>>>>>>>>>><<<<<<<<<<<<", body);
    console.log("user id>>>>>>>running >>>>>>delete", userId);
    const session = await getServerSession();
    await connect();

    const existingUser = await User.findOne({ email: session?.user?.email });

    if (!existingUser) {
      return new NextResponse("Not authorized", { status: 500 });
    }
    if (existingUser.role === "team_member" || existingUser.role === "admin") {
      console.log("is a team member >>>>>>>.", userId);
      const a = await Team.findOneAndUpdate(
        {
          _id: existingUser.teamId,
        },
        {
          $pull: {
            members: { memberId: userId },
          },
        },
        { new: true } // To return the updated document
      );
      console.log(a);
    }
    // await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: "ok" });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    // const { searchParams } = new URL(request.url);
    console.log(
      "query params>>>>>>>>>>.",
      typeof request.nextUrl.searchParams.get("generateFile")
    );
    const query = request.nextUrl.searchParams.get("generateFile");
    const session = await getServerSession();
    await connect();
    const existingUser = await User.findOne({ email: session?.user?.email });
    let phpCode;
    if (query === "true") {
      // Create your PHP file here
      if (existingUser.role === "admin") {
        phpCode = `
        <?php
        $blogType = $_GET['blog'] ?? null;
        $ch = curl_init();
        $targetUrl = $blogType ? "https://powerblog-39d6a2c7be5e.herokuapp.com/blogs/" . $blogType :  "https://powerblog-39d6a2c7be5e.herokuapp.com/blogs";
        $targetUrl .= "?memberId=${existingUser.teamId}";
        curl_setopt($ch, CURLOPT_URL, $targetUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        echo $output;
        ?>
              `;
      } else {
        phpCode = `
<?php
$blogType = $_GET['blog'] ?? null;
$ch = curl_init();
$targetUrl = $blogType ? "https://powerblog-39d6a2c7be5e.herokuapp.com/blogs/" . $blogType :  "https://powerblog-39d6a2c7be5e.herokuapp.com/blogs";
$targetUrl .= "?userId=${existingUser._id}";
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
echo $output;
?>
      `;
      }

      // Set the appropriate headers for a file download
      const headers = {
        "Content-Disposition": 'attachment; filename="index.php"',
        "Content-Type": "application/php", // Set the correct MIME type
      };

      // Return the PHP file as a response
      return new NextResponse(phpCode, { status: 200, headers });
    }
    if (!existingUser) {
      return new NextResponse("Not authorized", { status: 500 });
    }
    console.log("sending user");
    return NextResponse.json({ message: "ok", data: existingUser });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err, {
      status: 500,
    });
  }
};
