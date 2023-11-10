import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import ImageKit from "imagekit";
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log(formData);

  const f = formData.get("file");
  console.log(f);

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }
  var imagekit = new ImageKit({
    publicKey: "public_EYu4ejA7jiqaFL4nnEIfG3JVI3o=",
    privateKey: "private_ej0KyKQJJDjBHMeKM4WfOfWY6GE=",
    urlEndpoint: "https://ik.imagekit.io/88u0e3wp7",
  });
  const file = f as File;
  console.log(`File name: ${file.name}`);
  console.log(`Content-Length: ${file.size}`);

  const destinationDirPath = path.join(process.cwd(), "public/upload");
  console.log(destinationDirPath);

  const fileArrayBuffer = await file.arrayBuffer();

  if (!existsSync(destinationDirPath)) {
    fs.mkdir(destinationDirPath, { recursive: true });
  }
  await fs.writeFile(
    path.join(destinationDirPath, file.name),
    Buffer.from(fileArrayBuffer)
  );

  const fileUrl = `${process.env.BASE_URL}/upload/${file.name}`;
  const result = await imagekit.upload({
    file: Buffer.from(fileArrayBuffer),
    fileName: "test.jpg",
  });
  console.log(result);
  if (result) {
    const url = imagekit.url({
      src: result.url,
      transformation: [
        {
          height: "512",
          width: "512",
        },
      ],
    });
    // res.status(200).json({
    console.log(url);
    // });
    return NextResponse.json({
      fileName: file.name,
      size: file.size,
      lastModified: new Date(file.lastModified),
      url: fileUrl,
    });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { existsSync } from "fs";
// import fs from "fs/promises";
// import path from "path";
// // import fetch from "node-fetch";
// import FormData from "form-data";
// import { IncomingForm } from "formidable";
// import ImageKit from "imagekit";
// // import { promises as fs } from 'fs';
// var imagekit = new ImageKit({
//   publicKey: "public_EYu4ejA7jiqaFL4nnEIfG3JVI3o=",
//   privateKey: "private_ej0KyKQJJDjBHMeKM4WfOfWY6GE=",
//   urlEndpoint: "https://ik.imagekit.io/88u0e3wp7",
// });
// export async function POST(req: NextRequest, res: NextResponse) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");
//     console.log("form data", formData, file);

//     const result = await imagekit.upload({
//       file: JSON.stringify(file),
//       fileName: "test.jpg",
//     });
//     console.log(result);
//     if (result) {
//       const url = imagekit.url({
//         src: result.url,
//         transformation: [
//           {
//             height: "512",
//             width: "512",
//           },
//         ],
//       });
//       // res.status(200).json({
//       console.log(url);
//       // });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
