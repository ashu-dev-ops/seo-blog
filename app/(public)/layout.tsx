import React from "react";
import OuterNavbar from "../componets/OuterNavbar";
import AuthProvider from "../lib/SessionProvider";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Footer from "../componets/footer";
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <OuterNavbar />
      {children}
      <Footer />
    </div>
  );
}
