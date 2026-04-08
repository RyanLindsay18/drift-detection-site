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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setState("success");
      setMessage("You’re on the list. I’ll reach out when beta access opens.");
      setEmail("");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      setState("error");
      setMessage(errorMessage);
    }
  }

  return (
    <div className="card p-6 md:p-8">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-white">Get beta access</h3>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Join the early list for the VS Code extension and future SaaS tools.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:bg-white/7"
          disabled={state === "loading"}
        />

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full rounded-2xl bg-white px-4 py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "loading" ? "Joining..." : "Join the beta"}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            state === "success" ? "text-emerald-300" : "text-red-300"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}