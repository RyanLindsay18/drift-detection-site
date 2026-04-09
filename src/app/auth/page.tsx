"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: "https://driftpulse.dev/auth/callback",
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#02050a",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "40px",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "white",
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}
        >
          Sign in to Driftpulse
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "32px",
          }}
        >
          We'll send you a magic link to sign in.
        </div>

        {sent ? (
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.2)",
              color: "#6ee7b7",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Check your email — we sent a magic link to{" "}
            <strong>{email}</strong>. Click it to sign in.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
                fontSize: "15px",
                outline: "none",
                marginBottom: "12px",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: "white",
                color: "#02050a",
                fontSize: "15px",
                fontWeight: "600",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Sending..." : "Send magic link"}
            </button>

            {error && (
              <div
                style={{
                  marginTop: "12px",
                  color: "#fca5a5",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}