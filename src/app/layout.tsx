import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Driftpulse — Repo drift detection for fast-moving teams",
  description:
    "A VS Code extension that detects code drift, architecture drift, config drift, and docs drift before AI-assisted shipping quietly breaks your repo.",
  openGraph: {
    title: "Driftpulse — Catch repo drift before it compounds",
    description:
      "A VS Code extension that detects code drift, architecture drift, config drift, and docs drift. Free to install.",
    url: "https://driftpulse.dev",
    siteName: "Driftpulse",
  },
  twitter: {
    card: "summary",
    title: "Driftpulse — Catch repo drift before it compounds",
    description:
      "A VS Code extension that detects code drift, architecture drift, config drift, and docs drift. Free to install.",
  },
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