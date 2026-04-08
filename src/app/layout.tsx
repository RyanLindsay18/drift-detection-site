import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drift Detection",
  description:
    "Catch code drift, architecture drift, config drift, and docs drift before fast-moving AI-heavy repos turn messy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}