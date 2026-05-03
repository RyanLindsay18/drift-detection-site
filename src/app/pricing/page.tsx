"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { supabase } from "@/lib/supabase";


const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=driftpulse.driftpulse";

const FREE_FEATURES = [
  "Drift score for your full repo",
  "Top 3 issues with explanations",
  "Zero setup",
];

const PRO_FEATURES = [
  "Unlimited scans",
  "Background monitoring",
  "Email alerts when drift spikes",
  "Full issue history",
  "One-click upgrade from VS Code",
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleProCheckout() {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth");
      return;
    }
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.access_token,
        },
        body: JSON.stringify({ plan: "pro" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--background)",
      }}
    >
      <div className="hero-bg" />
      <SiteHeader />

      <main
        style={{
          flex: 1,
          padding: "80px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--amber)",
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "24px",
              }}
            >
              Pricing
            </div>
            <h1
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "clamp(30px, 4.5vw, 52px)",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
                marginBottom: "16px",
                lineHeight: "1.1",
              }}
            >
              Simple pricing. No analysis limits.
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                maxWidth: "440px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Free scan on install. Upgrade when you need background monitoring
              and history.
            </p>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              maxWidth: "740px",
              margin: "0 auto",
            }}
          >
            {/* Free */}
            <div
              style={{
                borderRadius: "20px",
                border: "1px solid var(--border)",
                background: "var(--panel)",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "12px",
                  }}
                >
                  Free
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "52px",
                    fontWeight: "800",
                    letterSpacing: "-0.04em",
                    color: "var(--foreground)",
                    lineHeight: "1",
                    marginBottom: "12px",
                  }}
                >
                  $0
                </div>
                <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>
                  One full scan free. No account needed.
                </p>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                }}
              >
                {FREE_FEATURES.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "14px",
                      color: "var(--foreground)",
                    }}
                  >
                    <span
                      style={{
                        color: "#6ee7b7",
                        marginTop: "1px",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={MARKETPLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-bright)",
                  fontSize: "15px",
                  fontWeight: "600",
                  textAlign: "center",
                  color: "var(--foreground)",
                  background: "transparent",
                  textDecoration: "none",
                  transition: "background 0.15s",
                  boxSizing: "border-box",
                }}
              >
                Install Extension
              </a>
            </div>

            {/* Pro */}
            <div
              id="pro"
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(245,158,11,0.3)",
                background: "rgba(245,158,11,0.025)",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                position: "relative",
                boxShadow: "0 0 52px rgba(245,158,11,0.055)",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "32px",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#09090b",
                  background: "var(--amber)",
                  borderRadius: "100px",
                  padding: "3px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                Most Popular
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    marginBottom: "12px",
                  }}
                >
                  Pro
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "52px",
                    fontWeight: "800",
                    letterSpacing: "-0.04em",
                    color: "var(--foreground)",
                    lineHeight: "1",
                    marginBottom: "12px",
                  }}
                >
                  $25
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: "500",
                      color: "var(--muted)",
                      letterSpacing: "0",
                    }}
                  >
                    /mo
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>
                  Everything you need to stay ahead of drift.
                </p>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                }}
              >
                {PRO_FEATURES.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "14px",
                      color: "var(--foreground)",
                    }}
                  >
                    <span
                      style={{
                        color: "#6ee7b7",
                        marginTop: "1px",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleProCheckout}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "15px",
                  fontWeight: "700",
                  opacity: loading ? 0.6 : 1,
                  background: "var(--amber)",
                  color: "#09090b",
                  transition: "opacity 0.15s",
                }}
              >
                {loading ? "Redirecting..." : "Start Free Trial"}
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div
            style={{
              textAlign: "center",
              marginTop: "48px",
              fontSize: "13.5px",
              color: "var(--muted)",
            }}
          >
            <p>All plans include the VS Code extension. Payments secured by Stripe.</p>
            <p style={{ marginTop: "8px" }}>
              Questions?{" "}
              <a
                href="mailto:ryan@driftpulse.dev"
                style={{
                  color: "var(--amber)",
                  textDecoration: "underline",
                }}
              >
                ryan@driftpulse.dev
              </a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
