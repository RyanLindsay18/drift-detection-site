"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type AnalysisRun = {
  id: string;
  drift_score: number;
  drift_summary: string;
  issue_count: number;
  file_count: number;
  created_at: string;
};

type UserProfile = {
  email: string;
  tier: string;
  analyses_this_month: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [runs, setRuns] = useState<AnalysisRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth");
        return;
      }

      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      const { data: runsData } = await supabase
        .from("analysis_runs")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      setProfile(profileData);
      setRuns(runsData || []);
      setLoading(false);
    }

    load();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#02050a",
          color: "white",
        }}
      >
        Loading...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#02050a",
        color: "white",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                letterSpacing: "-0.03em",
              }}
            >
              Driftpulse
            </div>
            <div
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}
            >
              {profile?.email} —{" "}
              <span
                style={{
                  color: profile?.tier === "pro" ? "#34d399" : "rgba(255,255,255,0.45)",
                  textTransform: "capitalize",
                }}
              >
                {profile?.tier} plan
              </span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Analyses this month
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700" }}>
              {profile?.analyses_this_month ?? 0}
              {profile?.tier === "free" && (
                <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", fontWeight: "400" }}>
                  /10
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Total runs
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700" }}>
              {runs.length}
            </div>
          </div>

          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Avg drift score
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700" }}>
              {runs.length > 0
                ? (runs.reduce((sum, r) => sum + (r.drift_score || 0), 0) / runs.length).toFixed(1)
                : "—"}
            </div>
          </div>
        </div>

        <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>
          Recent analyses
        </div>

        {runs.length === 0 ? (
          <div
            style={{
              padding: "40px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
              fontSize: "14px",
            }}
          >
            No analyses yet. Open VS Code and run Driftpulse on a repo.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {runs.map((run) => (
              <div
                key={run.id}
                style={{
                  padding: "20px 24px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: "1.5" }}>
                    {run.drift_summary || "Analysis complete"}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>
                    {new Date(run.created_at).toLocaleDateString()} — {run.file_count || 0} files — {run.issue_count || 0} issues
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: run.drift_score >= 7 ? "#fca5a5" : run.drift_score >= 4 ? "#fde68a" : "#6ee7b7",
                    minWidth: "60px",
                    textAlign: "right",
                  }}
                >
                  {run.drift_score}/10
                </div>
              </div>
            ))}
          </div>
        )}

        {profile?.tier === "free" && (
          <div
            style={{
              marginTop: "32px",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid rgba(125,211,252,0.2)",
              background: "rgba(125,211,252,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: "white", marginBottom: "4px" }}>
                Upgrade to Pro
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                Unlimited analyses, full history, email alerts — $12/month
              </div>
            </div>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: "white",
                color: "#02050a",
                fontSize: "13px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Upgrade
            </button>
          </div>
        )}
      </div>
    </main>
  );
}