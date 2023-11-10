import { Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Typography
        fontSize="4.5rem"
        variant="h1"
        textAlign="center"
        fontWeight={800}
        color="rgb(45,55,72)"
        fontFamily="IBM Plex Sans"
      >
        An excellent substitute for WordPress and Medium for creating and
        managing blogs.
      </Typography>
      <Typography
        fontSize="2.5rem"
        variant="h2"
        textAlign="center"
        fontWeight={400}
        color="rgb(45,55,72)"
        fontFamily="IBM Plex Sans"
      >
        An excellent substitute for WordPress and Medium for creating and
        managing blogs.
      </Typography>
      {/* <h3 className={`mb-3 text-4xl  text-center px-10 text-gray-400`}>
        Powerblog takes care of the SEO and speed optimization, so you can stay
        in the creative zone, leaving the setup and maintenance worries behind!
      </h3> */}
    </main>
  );
}
