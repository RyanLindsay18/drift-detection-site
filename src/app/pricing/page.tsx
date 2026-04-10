"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { supabase } from "@/lib/supabase";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For solo devs getting started.",
    features: ["10 analyses/month","BYO OpenAI API key","Code, config and docs drift detection","VS Code extension"],
    coming: [] as string[],
    cta: "Install Extension",
    href: "https://marketplace.visualstudio.com/items?itemName=driftpulse.driftpulse",
    plan: null as string | null,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For indie hackers shipping fast.",
    features: ["100 analyses/month","Hosted API — no OpenAI key needed","Full analysis history","Priority support"],
    coming: ["Email drift alerts"],
    cta: "Upgrade to Pro",
    href: null as string | null,
    plan: "pro" as string | null,
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "For small teams moving fast.",
    features: ["500 analyses/month","Hosted API — no OpenAI key needed","Full analysis history","Priority support"],
    coming: ["Slack drift alerts","Team dashboard","Multi-repo tracking"],
    cta: "Upgrade to Team",
    href: null as string | null,
    plan: "team" as string | null,
    highlight: false,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleCheckout(plan: string) {
    setLoadingPlan(plan);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth");
      return;
    }
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
        body: JSON.stringify({ plan }),
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
      setLoadingPlan(null);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      <div className="hero-bg" />
      <SiteHeader />
      <main style={{ flex: 1, padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(125,211,252,0.08)", border: "1px solid rgba(125,211,252,0.15)", borderRadius: "100px", padding: "6px 16px", marginBottom: "24px" }}>Pricing</div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", letterSpacing: "-0.03em", color: "var(--foreground)", marginBottom: "16px" }}>Simple, honest pricing</h1>
            <p style={{ fontSize: "18px", color: "var(--muted)", maxWidth: "480px", margin: "0 auto" }}>No seats. No surprises. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", maxWidth: "1000px", margin: "0 auto" }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{ borderRadius: "20px", border: plan.highlight ? "1px solid rgba(125,211,252,0.25)" : "1px solid var(--border)", background: plan.highlight ? "rgba(125,211,252,0.04)" : "var(--panel)", padding: "32px", display: "flex", flexDirection: "column", gap: "24px", position: "relative", boxShadow: plan.highlight ? "0 0 40px rgba(56,189,248,0.08)" : "none" }}>
                {plan.highlight && (
                  <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#02050a", background: "var(--cyan)", borderRadius: "100px", padding: "4px 14px", whiteSpace: "nowrap" }}>Most Popular</div>
                )}
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: plan.highlight ? "var(--cyan)" : "var(--muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "48px", fontWeight: "800", letterSpacing: "-0.04em", color: "var(--foreground)", lineHeight: "1" }}>{plan.price}</span>
                    <span style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "6px" }}>/{plan.period}</span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--muted)" }}>{plan.description}</p>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, listStyle: "none", padding: "0", margin: "0" }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--foreground)" }}>
                      <span style={{ color: "#6ee7b7", marginTop: "1px", flexShrink: 0 }}>✓</span>{feature}
                    </li>
                  ))}
                  {plan.coming.map((feature) => (
                    <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "var(--muted)" }}>
                      <span style={{ marginTop: "1px", flexShrink: 0, opacity: 0.4 }}>○</span>
                      <span>{feature} <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid var(--border-bright)", borderRadius: "6px", padding: "2px 7px", color: "var(--muted)" }}>soon</span></span>
                    </li>
                  ))}
                </ul>
                {plan.plan ? (
                  <button onClick={() => handleCheckout(plan.plan!)} disabled={loadingPlan === plan.plan} style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", cursor: loadingPlan === plan.plan ? "not-allowed" : "pointer", fontSize: "15px", fontWeight: "600", opacity: loadingPlan === plan.plan ? 0.6 : 1, background: plan.highlight ? "var(--cyan)" : "var(--panel-2)", color: plan.highlight ? "#02050a" : "var(--foreground)", transition: "opacity 0.15s" }}>
                    {loadingPlan === plan.plan ? "Redirecting..." : plan.cta}
                  </button>
                ) : (
                  <a href={plan.href!} target="_blank" rel="noopener noreferrer" style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid var(--border-bright)", fontSize: "15px", fontWeight: "600", textAlign: "center", color: "var(--foreground)", background: "transparent", display: "block" }}>
                    {plan.cta}
                  </a>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px", fontSize: "14px", color: "var(--muted)" }}>
            <p>All plans include the VS Code extension. Payments secured by Stripe.</p>
            <p style={{ marginTop: "8px" }}>Questions? <a href="mailto:ryan@driftpulse.dev" style={{ color: "var(--cyan)", textDecoration: "underline" }}>ryan@driftpulse.dev</a></p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
