import User from "../../models/User";
import connect from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { type } from "os";

export const PATCH = async (request: any) => {
  try {
    const { domain } = await request.json();
    const session = await getServerSession();
    await connect();

    const existingUser = await User.findOne({ email: session?.user?.email });

    if (!existingUser) {
      return new NextResponse("Not authorized", { status: 500 });
    }

    const data = await User.findOneAndUpdate(
      { email: session?.user?.email },
      { domain: domain },
      { new: true }
    );
    return NextResponse.json({ message: "ok", data });
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
    if (query === "true") {
      // Create your PHP file here
      const phpCode = `
<?php\n// 
$blogType = $_GET['blog'] ?? null;
$ch = curl_init();
$targetUrl = $blogType ? "${existingUser.domain}/blogs/" . $blogType :  "${existingUser.domain}/blogs";
$targetUrl .= "?userId=${existingUser._id}";
curl_setopt($ch, CURLOPT_URL, $targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
echo $output;
      \n?>`;

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
