"use client";
import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";
export default function OuterNavbar() {
  return (
    <div
      className={`flex  flex-row  justify-between px-10 py-2 fixed  bg-white z-50`}
      style={{ width: "100%" }}
    >
      <h1 className="text-3xl ">Powerblog </h1>
      <div className={`flex  flex-row  gap-3 items-center`}>
        <Link href="all-blogs">
          <Button variant="outlined">Blogs</Button>
        </Link>
        <Link href="auth/login">
          <Button variant="contained">Getting started</Button>
        </Link>
      </div>
    </div>
  );
}
