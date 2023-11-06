"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Box, Card } from "@mui/material";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  //   const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    // console.log(sessionStatus)
    console.log("on login>>>>>>>>>>");
    if (sessionStatus === "authenticated") {
      router.replace("/user/editor");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Card
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            minWidth: "350px",
            gap: 2,
            borderRadius: "16px",
            elevation:3
          }}
        >
          <h1 className="text-4xl  text-center font-semibold mb-8 ">Login</h1>
          {isEmail ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {" "}
                Sign In
              </button>
              <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
            </form>
          ) : (
            <Button variant="contained" onClick={() => setIsEmail(true)}>
              continue with email
            </Button>
          )}
          {!isEmail ? (
            <Button
              // className="w-full  bg-blue-500 text-white py-2 rounded hover:bg-blue-800"
              onClick={() => {
                signIn("google");
              }}
              variant="contained"
            >
              continue with Google
            </Button>
          ) : (
            ""
          )}
          <div className="">
            <div className="text-center text-gray-500 mt-4">- OR -</div>
            <Link
              className="block text-center text-blue-500 hover:underline mt-2"
              href="/auth/register"
            >
              Register Here
            </Link>
          </div>
        </Card>
      </Box>
    )
  );
};

export default Login;
