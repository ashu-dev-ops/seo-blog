import React from "react";

import { Container } from "postcss";
import SubDirectoryFooter from "../componets/SubDirectoryFooter";
import PublicNavbar from "../componets/PublicNavbar";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>sub directory nav-bar</h1> */}
      <PublicNavbar />
      {children}
      <SubDirectoryFooter />
    </div>
  );
}
