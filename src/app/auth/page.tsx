"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const VSCODE_CALLBACK_URI = "vscode://driftpulse.driftpulse/auth/callback";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [connectVscode, setConnectVscode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isVscode = params.get("connect_vscode") === "true";
    setConnectVscode(isVscode);
    if (isVscode) setMode("signup");
  }, []);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage(
          connectVscode
            ? "Account created! Check your email to confirm, then return here to sign in and connect VS Code."
            : "Account created! Check your email to confirm, or sign in now."
        );
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else if (connectVscode && data.session) {
        setMessage("Signed in! Returning to VS Code...");
        window.location.href = `${VSCODE_CALLBACK_URI}?token=${data.session.access_token}&refresh_token=${data.session.refresh_token}`;
      } else {
        router.push("/dashboard");
      }
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: connectVscode
          ? `https://driftpulse.dev/auth/callback?next=${encodeURIComponent(VSCODE_CALLBACK_URI)}`
          : "https://driftpulse.dev/auth/callback",
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#02050a", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "40px", background: "rgba(255,255,255,0.03)" }}>
        
        {/* Logo */}
        <div style={{ fontSize: "24px", fontWeight: "700", color: "white", letterSpacing: "-0.03em", marginBottom: "4px" }}>
          Driftpulse
        </div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: connectVscode ? "16px" : "32px" }}>
          {connectVscode
            ? mode === "signup" ? "Create a free account — VS Code connects automatically" : "Sign in to connect VS Code"
            : mode === "signin" ? "Sign in to your account" : "Create your account"}
        </div>

        {/* Value proposition for VS Code flow */}
        {connectVscode && (
          <div style={{ marginBottom: "28px", padding: "14px 16px", borderRadius: "12px", background: "rgba(99,179,237,0.06)", border: "1px solid rgba(99,179,237,0.14)" }}>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: "1.65" }}>
              Driftpulse gives your repo a <strong style={{ color: "white" }}>drift score</strong> — catching stale docs, architecture gaps, and config mismatches before they slow you down. Free to start, auto-monitors as you code.
            </div>
          </div>
        )}

        {/* Google button */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "15px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "24px" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Email/password form */}
        <form onSubmit={handleEmailAuth} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "white", color: "#02050a", fontSize: "15px", fontWeight: "600", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "..." : mode === "signin"
            ? connectVscode ? "Sign in & connect VS Code" : "Sign in"
            : connectVscode ? "Create free account" : "Create account"}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: "12px", color: "#fca5a5", fontSize: "14px" }}>{error}</div>
        )}
        {message && (
          <div style={{ marginTop: "12px", color: "#6ee7b7", fontSize: "14px" }}>{message}</div>
        )}

{/* Forgot password */}
        {mode === "signin" && (
          <div style={{ marginTop: "12px", textAlign: "right" }}>
            <button
              onClick={async () => {
                if (!email) {
                  setError("Enter your email above first.");
                  return;
                }
                setLoading(true);
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                  redirectTo: "https://driftpulse.dev/auth/reset",
                });
                setLoading(false);
                if (error) {
                  setError(error.message);
                } else {
                  setMessage("Password reset email sent. Check your inbox.");
                }
              }}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "13px", textDecoration: "underline" }}
            >
              Forgot password?
            </button>
          </div>
        )}
        
        {/* Toggle */}
        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
          {mode === "signin" ? (
            <>
              {connectVscode ? "New to Driftpulse?" : "No account?"}{" "}
              <button onClick={() => { setMode("signup"); setError(""); setMessage(""); }} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}>
                {connectVscode ? "Create a free account" : "Create one"}
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => { setMode("signin"); setError(""); setMessage(""); }} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}>
                Sign in
              </button>
            </>
          )}
        </div>

      </div>
    </main>
  );
}