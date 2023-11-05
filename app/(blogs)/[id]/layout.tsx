import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>sub directory route nav bar</h1>
      {children}
      <h1>sub directory footer</h1>
    </div>
  );
}
