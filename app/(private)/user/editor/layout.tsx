import { UserContextProvider } from "@/app/store/editorContext";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserContextProvider>{children}</UserContextProvider>
    </div>
  );
}
