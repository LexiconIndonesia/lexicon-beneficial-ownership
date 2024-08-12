import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Data",
};

export default function DataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <section>{children}</section>;
}
