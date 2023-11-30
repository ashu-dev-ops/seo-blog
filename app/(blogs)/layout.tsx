import React from "react";
import dynamic from "next/dynamic";
import SubDirectoryFooter from "../componets/SubDirectoryFooter";
import PublicNavbar from "../componets/PublicNavbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
     
      <PublicNavbar />
      {children}
      <SubDirectoryFooter />
    </div>
  );
}
