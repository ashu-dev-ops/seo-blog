import React from "react";
import OuterNavbar from "../componets/OuterNavbar";
import AuthProvider from "../lib/SessionProvider";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "../componets/Navbar";
import { redirect } from "next/navigation";
import Footer from "../componets/footer";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
