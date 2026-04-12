"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Supabase puts the token in the URL hash — this handles it
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        // User is now in password recovery mode
      }
    });
  }, []);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#02050a", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "40px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ fontSize: "24px", fontWeight: "700", color: "white", letterSpacing: "-0.03em", marginBottom: "8px" }}>
          Set new password
        </div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginBottom: "32px" }}>
          Choose a new password for your account.
        </div>
        <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (min 8 characters)"
            required
            style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "white", color: "#02050a", fontSize: "15px", fontWeight: "600", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Updating..." : "Set password"}
          </button>
        </form>
        {error && <div style={{ marginTop: "12px", color: "#fca5a5", fontSize: "14px" }}>{error}</div>}
        {message && <div style={{ marginTop: "12px", color: "#6ee7b7", fontSize: "14px" }}>{message}</div>}
      </div>
    </main>
  );
}