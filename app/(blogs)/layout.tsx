import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>sub directory nav-bar</h1>
      {children}
      <h1 style={{ textAlign: "center" }}>sub direcotry footer</h1>
    </div>
  );
}
