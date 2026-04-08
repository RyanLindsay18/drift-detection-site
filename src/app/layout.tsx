import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Driftpulse — Repo drift detection for fast-moving teams",
  description:
    "A VS Code extension that detects code drift, architecture drift, config drift, and docs drift before AI-assisted shipping quietly breaks your repo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}