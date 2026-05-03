import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.driftpulse.dev"),
  title: "Driftpulse — Catch Code Drift Before It Catches You",
  description:
    "Driftpulse detects architecture, config, and docs drift in your repo. Built for vibe coders and AI-heavy workflows. Free scan on install.",
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
    title: "Driftpulse — Catch Code Drift Before It Catches You",
    description:
      "Driftpulse detects architecture, config, and docs drift in your repo. Built for vibe coders and AI-heavy workflows. Free scan on install.",
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
    title: "Driftpulse — Catch Code Drift Before It Catches You",
    description:
      "Driftpulse detects architecture, config, and docs drift in your repo. Built for vibe coders and AI-heavy workflows. Free scan on install.",
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