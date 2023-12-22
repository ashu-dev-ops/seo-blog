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
  const session = await getServerSession();
  console.log("session>>>>>>>>>>>>>>>>>.", session);
  return (
    <div>
      <AuthProvider session={session}>
        <OuterNavbar />
        {children}
        <Footer />
      </AuthProvider>
    </div>
  );
}
