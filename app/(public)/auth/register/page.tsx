"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, TextField, Button } from "@mui/material";
const Register = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmpassword, setConfirmPassWord] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    console.log("running register>>>>>>");
    if (sessionStatus === "authenticated") {
      router.replace("/user/editor");
    }
  }, [sessionStatus, router]);

  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   return emailRegex.test(email);
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = username;

    // if (!isValidEmail(email)) {
    //   setError("Email is invalid");
    //   return;
    // }
    if (confirmpassword !== password) {
      setError("Passwords doesn't match");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }
    console.log(email, password);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/auth/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    // sessionStatus !== "authenticated" && (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8 ">Register</h1>
        <form onSubmit={handleSubmit}>
          {/* <input
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
          /> */}
          <Box>
            <Box
              sx={{
                width: "100%",
                my: 1,
                backgroundColor: "#f6f7f8",
                borderRadius: "10px",
              }}
            >
              <TextField
                label="Email"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                variant="filled"
                InputProps={{
                  style: {
                    backgroundColor: "transparent",
                  },
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  style: {
                    color: "#919EAB",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                my: 1,
                backgroundColor: "#f6f7f8",
                borderRadius: "10px",
              }}
            >
              <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                fullWidth
                type="password"
                variant="filled"
                InputProps={{
                  style: {
                    backgroundColor: "transparent",
                  },
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  style: {
                    color: "#919EAB",
                    marginBottom: "15px",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                my: 1,
                backgroundColor: "#f6f7f8",
                borderRadius: "10px",
              }}
            >
              <TextField
                label="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassWord(e.target.value)}
                fullWidth
                type="password"
                variant="filled"
                InputProps={{
                  style: {
                    backgroundColor: "transparent",
                  },
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  style: {
                    color: "#919EAB",
                    marginBottom: "15px",
                  },
                }}
              />
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            // className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {" "}
            Register
          </Button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/auth/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
    // )
  );
};

export default Register;
