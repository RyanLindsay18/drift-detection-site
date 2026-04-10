"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SiteHeader() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSignedIn(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="site-header">
      <div className="container nav-container">
        <div className="nav-shell">
          <a href="/" className="brand">
            <div className="brand-mark">DP</div>
            <div className="brand-copy">
              <div className="brand-title">Driftpulse</div>
              <div className="brand-subtitle">VS Code extension</div>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#how-it-works">How it works</a>
            <a href="/pricing">Pricing</a>
          </nav>
          {signedIn ? (
            <a href="/dashboard" className="nav-cta">
              Dashboard
            </a>
          ) : (
            <a href="/auth" className="nav-cta">
              Sign in
            </a>
          )}
        </div>
      </div>
    </header>
  );
}