import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.driftpulse.dev"),
  title: "Driftpulse — Repo Drift Detection for AI-Heavy Workflows",
  description:
    "Driftpulse is a VS Code extension that detects code drift, architecture drift, config drift, and docs drift in your repo — built for solo devs and small teams using AI-assisted workflows.",
  keywords: [
    "repo drift",
    "code drift",
    "architecture drift",
    "VS Code extension",
    "AI coding",
    "technical debt",
    "code quality",
    "drift detection",
  ],
  alternates: {
    canonical: "https://www.driftpulse.dev",
  },
  openGraph: {
    title: "Driftpulse — Catch Repo Drift Before It Compounds",
    description:
      "A VS Code extension that detects code drift, architecture drift, config drift, and docs drift. Free to install.",
    url: "https://www.driftpulse.dev",
    siteName: "Driftpulse",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Driftpulse — Repo Drift Detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Driftpulse — Catch Repo Drift Before It Compounds",
    description:
      "A VS Code extension that detects code drift, architecture drift, config drift, and docs drift. Free to install.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
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