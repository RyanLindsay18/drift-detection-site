"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setState("error");
      setMessage("Please enter your email.");
      return;
    }

    try {
      setState("loading");
      setMessage("");

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setState("success");
      setMessage("You're on the list. I'll reach out when beta access opens.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="waitlist-card">
      <div className="waitlist-header">
        <h3 className="waitlist-title">Get beta access</h3>
        <p className="waitlist-subtitle">
          Join the early list for the VS Code extension and future SaaS tools.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="waitlist-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="waitlist-input"
          disabled={state === "loading"}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="waitlist-button"
        >
          {state === "loading" ? "Joining..." : "Join the beta"}
        </button>
      </form>

      {message && (
        <p className={`waitlist-message ${state === "success" ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}